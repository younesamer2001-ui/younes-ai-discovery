export interface Lead {
  id: string
  email: string
  contact_name: string
  company_name: string
  industry?: string
  company_size?: string
  budget?: string
  timeline?: string
  recommended_tier?: string
  roi_data?: Record<string, any>
  ai_summary?: Record<string, any>
  language: 'no' | 'en'
  created_at: string
  ref_number?: string
  all_answers?: Record<string, any>
}

interface EmailTemplate {
  subject: string
  html: string
}

const BRAND_COLORS = {
  dark: '#0f1b27',
  gold: '#efc07b',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  textGray: '#666666',
}

const emailBase = (content: string, subject: string): EmailTemplate => ({
  subject,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: ${BRAND_COLORS.white}; }
          .header { background: ${BRAND_COLORS.dark}; color: ${BRAND_COLORS.white}; padding: 30px 20px; text-align: center; }
          .header h1 { font-size: 28px; font-weight: 700; margin-bottom: 5px; }
          .header p { font-size: 14px; opacity: 0.9; }
          .content { padding: 40px 30px; }
          .section { margin-bottom: 30px; }
          .section h2 { color: ${BRAND_COLORS.dark}; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid ${BRAND_COLORS.gold}; padding-bottom: 10px; }
          .section p, .section li { margin-bottom: 12px; color: ${BRAND_COLORS.textGray}; line-height: 1.7; }
          .cta { display: inline-block; padding: 12px 30px; background: ${BRAND_COLORS.gold}; color: ${BRAND_COLORS.dark}; text-decoration: none; border-radius: 4px; font-weight: 600; margin: 20px 0; }
          .cta:hover { background: #ddb969; }
          .footer { background: ${BRAND_COLORS.lightGray}; padding: 20px 30px; font-size: 12px; color: ${BRAND_COLORS.textGray}; text-align: center; border-top: 1px solid #ddd; }
          .footer p { margin-bottom: 8px; }
          ul { margin-left: 20px; }
          li { margin-bottom: 8px; }
          .highlight { background: #fffbf0; padding: 15px; border-left: 4px solid ${BRAND_COLORS.gold}; margin: 20px 0; }
          .highlight strong { color: ${BRAND_COLORS.dark}; }
          @media (max-width: 600px) {
            .content { padding: 20px 15px; }
            .header { padding: 20px 15px; }
            .header h1 { font-size: 24px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Arxon AI</h1>
            <p>Kunnskapsgrunnlag for AI-implementering</p>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            <p><strong>Arxon AS</strong> | noreply@arxon.no</p>
            <p>Brakkeveien 4A, 3013 Drammen, Norway</p>
            <p style="margin-top: 15px; font-style: italic;">Du mottar denne e-posten fordi du registrerte deg for en AI-evaluering. <a href="https://arxon.no/unsubscribe" style="color: ${BRAND_COLORS.gold}; text-decoration: none;">Avmeld abonnement</a></p>
          </div>
        </div>
      </body>
    </html>
  `,
})

// ============================================================
// 1. LEAD FOLLOW-UP EMAIL (24-48 hours after submission)
// ============================================================
export function leadFollowupEmail(lead: Lead): EmailTemplate {
  if (lead.language === 'no') {
    return emailBase(
      `
        <p>Hei ${lead.contact_name},</p>

        <p>Tusen takk for at du tok deg tid til å gjennomføre AI-evalueringen vår! Vi er begeistret for mulighetene vi ser for ${lead.company_name}.</p>

        <div class="section">
          <h2>Din AI-evaluering er klar</h2>
          <p>Vi har analysert svarene dine og identifisert en anbefalt løsning som passer perfekt for bedriften din.</p>
          <div class="highlight">
            <strong>Anbefalt løsning:</strong> ${lead.recommended_tier || 'Premium AI-pakke'}<br>
            <strong>Referansenummer:</strong> ${lead.ref_number || 'N/A'}
          </div>
        </div>

        <div class="section">
          <h2>Neste steg</h2>
          <p>Vi oppfordrer deg til å:</p>
          <ul>
            <li>Dele resultatene med ditt lederskap</li>
            <li>Vurdere tidslinjen for implementering</li>
            <li>Planlegge et oppfølgingsmøte med vårt team</li>
          </ul>
        </div>

        <div class="section">
          <p>Lurer du på noe eller har spørsmål? Vi er her for å hjelpe!</p>
          <a href="https://arxon.no/kontakt" class="cta">Ta kontakt med oss</a>
        </div>

        <p>Venlig hilsen,<br>
        <strong>Arxon AI Team</strong></p>
      `,
      'Din AI-evaluering er klar - Arxon'
    )
  } else {
    return emailBase(
      `
        <p>Hi ${lead.contact_name},</p>

        <p>Thank you for completing our AI assessment! We're excited about the opportunities we've identified for ${lead.company_name}.</p>

        <div class="section">
          <h2>Your AI Assessment Results</h2>
          <p>We've analyzed your responses and identified a recommended solution perfectly suited for your business.</p>
          <div class="highlight">
            <strong>Recommended Solution:</strong> ${lead.recommended_tier || 'Premium AI Package'}<br>
            <strong>Reference Number:</strong> ${lead.ref_number || 'N/A'}
          </div>
        </div>

        <div class="section">
          <h2>Next Steps</h2>
          <p>We encourage you to:</p>
          <ul>
            <li>Share the results with your leadership team</li>
            <li>Consider your implementation timeline</li>
            <li>Schedule a follow-up meeting with our team</li>
          </ul>
        </div>

        <div class="section">
          <p>Have questions or need clarification? We're here to help!</p>
          <a href="https://arxon.no/contact" class="cta">Contact Us</a>
        </div>

        <p>Best regards,<br>
        <strong>Arxon AI Team</strong></p>
      `,
      'Your AI Assessment Results - Arxon'
    )
  }
}

// ============================================================
// 2. INCOMPLETE REMINDER EMAIL (4-24 hours after starting)
// ============================================================
export function incompleteReminderEmail(lead: Lead): EmailTemplate {
  if (lead.language === 'no') {
    return emailBase(
      `
        <p>Hei ${lead.contact_name},</p>

        <p>Vi har sett at du startet vår AI-kartlegging for ${lead.company_name}, men ennå ikke har fullført den. Vi ville ikke at du skulle gå glipp av muligheten til å få en skreddersydd AI-evaluering!</p>

        <div class="section">
          <h2>Hvorfor fullføre evalueringen?</h2>
          <ul>
            <li>Få en personalisert analyse av dine AI-muligheter</li>
            <li>Identifiseres områder hvor AI kan gi størst resultat</li>
            <li>Få en konkret implementeringsplan</li>
            <li>Estimert ROI basert på dine spesifikke forhold</li>
          </ul>
        </div>

        <div class="section">
          <p>Evalueringen tar kun 10-15 minutter å fullføre. Klikk knappen under for å fortsette:</p>
          <a href="https://arxon.no/kartlegging?ref=${lead.ref_number}" class="cta">Fullfør kartlegging</a>
        </div>

        <p>Lurer du på noe? Vi er bare en e-post unna!</p>

        <p>Venlig hilsen,<br>
        <strong>Arxon AI Team</strong></p>
      `,
      'Fullfør din AI-evaluering - Arxon'
    )
  } else {
    return emailBase(
      `
        <p>Hi ${lead.contact_name},</p>

        <p>We noticed you started our AI assessment for ${lead.company_name}, but haven't completed it yet. Don't miss out on getting a personalized AI evaluation!</p>

        <div class="section">
          <h2>Why Complete the Assessment?</h2>
          <ul>
            <li>Get a personalized analysis of your AI opportunities</li>
            <li>Identify where AI can deliver the biggest impact</li>
            <li>Receive a concrete implementation plan</li>
            <li>Get an estimated ROI based on your specific situation</li>
          </ul>
        </div>

        <div class="section">
          <p>The assessment takes just 10-15 minutes to complete. Click the button below to continue:</p>
          <a href="https://arxon.no/assessment?ref=${lead.ref_number}" class="cta">Complete Assessment</a>
        </div>

        <p>Have any questions? We're just an email away!</p>

        <p>Best regards,<br>
        <strong>Arxon AI Team</strong></p>
      `,
      'Complete Your AI Assessment - Arxon'
    )
  }
}

// ============================================================
// 3. ADMIN DIGEST EMAIL
// ============================================================
export function adminDigestEmail(leads: Lead[], stats: { total: number; completed: number; incomplete: number }): EmailTemplate {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  const leadsHtml = leads
    .map(
      (lead) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.company_name || 'N/A'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.contact_name || 'N/A'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.email}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.industry || 'N/A'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.recommended_tier || 'Pending'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.budget || '-'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.timeline || '-'}</td>
    </tr>
  `
    )
    .join('')

  const content = `
    <p>Hei,</p>

    <p>Her er ditt daglige sammendrag av nye AI-evalueringer fra Arxon.</p>

    <div class="section">
      <h2>Øyeblikksstatistikk</h2>
      <div style="background: ${BRAND_COLORS.lightGray}; padding: 20px; border-radius: 4px;">
        <p style="margin: 10px 0;"><strong>Totale nye evalueringer i går:</strong> ${stats.total}</p>
        <p style="margin: 10px 0;"><strong>Fullførte evalueringer:</strong> ${stats.completed} (${completionRate}%)</p>
        <p style="margin: 10px 0;"><strong>Ufullstendige evalueringer:</strong> ${stats.incomplete}</p>
      </div>
    </div>

    <div class="section">
      <h2>Nye Evalueringer</h2>
      ${
        leads.length > 0
          ? `
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: ${BRAND_COLORS.dark}; color: white;">
              <th style="padding: 10px; text-align: left;">Bedrift</th>
              <th style="padding: 10px; text-align: left;">Kontakt</th>
              <th style="padding: 10px; text-align: left;">E-post</th>
              <th style="padding: 10px; text-align: left;">Industri</th>
              <th style="padding: 10px; text-align: left;">Anbefalt</th>
              <th style="padding: 10px; text-align: left;">Budget</th>
              <th style="padding: 10px; text-align: left;">Tidslinje</th>
            </tr>
          </thead>
          <tbody>
            ${leadsHtml}
          </tbody>
        </table>
      `
          : '<p style="color: #999; font-style: italic;">Ingen nye evalueringer i går.</p>'
      }
    </div>

    <p style="margin-top: 30px; font-size: 13px; color: #999;">Denne e-posten ble generert automatisk kl. ${new Date().toLocaleTimeString('no-NO')}.</p>
  `

  return {
    subject: `[Daglig sammendrag] ${stats.total} nye AI-evalueringer`,
    html: emailBase(content, `Daglig sammendrag - ${stats.total} nye evalueringer`).html,
  }
}

// ============================================================
// 4. GDPR CLEANUP CONFIRMATION EMAIL
// ============================================================
export function gdprCleanupEmail(deletedCount: number): EmailTemplate {
  const content = `
    <p>Hei,</p>

    <p>GDPR-opprydding ble kjørt vellykket denne morgen.</p>

    <div class="section">
      <h2>Resultater</h2>
      <div class="highlight">
        <strong>Slettede oppføringer:</strong> ${deletedCount} leads som er eldre enn 12 måneder
      </div>
      <p>Disse dataene er nå permanent slettet i samsvar med GDPR-kravene.</p>
    </div>

    <div class="section">
      <h2>Neste rydding</h2>
      <p>Den neste GDPR-opprydningen er planlagt for 1. april 2026 kl. 03:00 UTC.</p>
    </div>

    <p style="margin-top: 30px; font-size: 13px; color: #999;">Kjørt: ${new Date().toLocaleString('no-NO')}</p>
  `

  return {
    subject: `GDPR Cleanup Report - ${deletedCount} records deleted`,
    html: emailBase(content, 'GDPR Cleanup Report').html,
  }
}
