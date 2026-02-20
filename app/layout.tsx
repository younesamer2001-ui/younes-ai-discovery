import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arxon — Intelligent AI for din bedrift',
  description: 'Svar på noen smarte spørsmål og få en personlig AI-integrasjonsplan for din bedrift.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950 antialiased">
        {children}
      </body>
    </html>
  )
}
