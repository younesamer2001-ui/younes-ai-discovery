import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []

  // Remove timestamps older than the window
  const recentTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  )

  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  // Add current timestamp
  recentTimestamps.push(now)
  rateLimitMap.set(ip, recentTimestamps)

  // Clean up old IPs periodically
  if (Math.random() < 0.01) {
    for (const [key, times] of rateLimitMap.entries()) {
      const valid = times.filter((t) => now - t < RATE_LIMIT_WINDOW)
      if (valid.length === 0) {
        rateLimitMap.delete(key)
      } else {
        rateLimitMap.set(key, valid)
      }
    }
  }

  return false
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Only apply rate limiting and CORS to API routes
  if (pathname.startsWith('/api/')) {
    const ip = getClientIp(request)

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    // Add CORS headers for API routes
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://arxon.no').split(',').map(o => o.trim())
    const origin = request.headers.get('origin') || ''
    const response = NextResponse.next()

    if (allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    } else if (allowedOrigins.includes('*')) {
      response.headers.set('Access-Control-Allow-Origin', '*')
    }

    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET,DELETE,PATCH,POST,PUT'
    )
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization'
    )

    return response
  }

  // Allow all non-API routes
  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: ['/api/:path*'],
}
