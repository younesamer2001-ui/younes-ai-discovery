import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    // ── ACTION: SUBMIT LEAD ──
    if (action === 'submit') {
      const { contact, answers, aiSummary, roiData, recommendedTier, language } = body
      const refNumber = 'YAI-' + Math.random().toString(36).substr(2, 8).toUpperCase()

      // Save to Supabase
      const { error: dbError } = await supabaseAdmin.from('leads').insert({
        company_name: contact.company,
        contact_name: contact.name,
        email: contact.email,
        phone: contact.phone || null,
        language: language || 'no',
        industry: answers.industry,
        industry_other: answers.industry === 'annet' ? answers.industryOther : null,
        company_size: answers.size,
        pain_points: answers.pain || [],
        tech_stack: answers.tech || [],
        manual_tasks: answers.manual_tasks || null,
        contact_methods: answers.contact_methods || [],
        missed_inquiries: answers.missed,
        budget: answers.budget,
        timeline: answers.timeline,
        goals: answers.goals || null,
        additional_info: answers.additional || null,
        all_answers: answers,
        ai_summary: aiSummary || null,
        roi_data: roiData || {},
        recommended_tier: recommendedTier || null,
        ref_number: refNumber,
        status: 'new',
      })

      if (dbError) {
        console.error('Supabase insert error:', dbError)
      }

      // Send email notification
      const adminEmail = process.env.ADMIN_EMAIL || 'amer.younes.2001@gmail.com'
      const resendKey = process.env.RESEND_API_KEY

      if (resendKey) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
            body: JSON.stringify({
              from: 'AI Kartlegging <noreply@younesai.com>',
              to: [adminEmail],
              subject: `Ny AI-kartlegging: ${contact.company} (${refNumber})`,
              html: `
                <h2>Ny lead fra AI Kartlegging</h2>
                <p><strong>Referanse:</strong> ${refNumber}</p>
                <p><strong>Bedrift:</strong> ${contact.company}</p>
                <p><strong>Kontakt:</strong> ${contact.name}</p>
                <p><strong>E-post:</strong> ${contact.email}</p>
                <p><strong>Telefon:</strong> ${contact.phone || 'Ikke oppgitt'}</p>
                <p><strong>Bransje:</strong> ${answers.industry}</p>
                <p><strong>Størrelse:</strong> ${answers.size}</p>
                <p><strong>Budsjett:</strong> ${answers.budget}</p>
                <p><strong>Tidslinje:</strong> ${answers.timeline}</p>
                <p><strong>Anbefalt pakke:</strong> ${recommendedTier}</p>
                <hr/>
                <p><strong>ROI-data:</strong></p>
                <p>Tapt omsetning/år: ${roiData?.lostYear?.toLocaleString('nb-NO') || 'N/A'} kr</p>
                <p>Anbefalt investering: ${roiData?.investment?.toLocaleString('nb-NO') || 'N/A'} kr/mnd</p>
                <p>ROI: ${roiData?.roi || 'N/A'}%</p>
                <hr/>
                <h3>AI-analyse:</h3>
                <pre style="white-space:pre-wrap;font-family:sans-serif;">${aiSummary || 'Ikke generert'}</pre>
              `,
            }),
          })
        } catch (emailErr) {
          console.error('Email send error:', emailErr)
        }
      } else {
        console.log('No RESEND_API_KEY set, skipping email. Lead saved with ref:', refNumber)
      }

      return NextResponse.json({ success: true, refNumber })
    }

    // ── ACTION: GENERATE AI ANALYSIS ──
    if (action === 'analyze') {
      const { prompt } = body
      const anthropicKey = process.env.ANTHROPIC_API_KEY

      if (!anthropicKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
      }

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1200,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error('Anthropic API error:', errText)
        return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
      }

      const data = await res.json()
      const text = data.content?.[0]?.text || ''
      return NextResponse.json({ summary: text })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Kartlegging API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
