'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { gold, bg, globalStyles } from '@/lib/constants'

export default function PersonvernPage() {
  const router = useRouter()
  const { lang } = useLanguage()
  const no = lang === 'no'

  const sectionStyle: React.CSSProperties = { marginBottom: 32 }
  const h2Style: React.CSSProperties = { fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }
  const pStyle: React.CSSProperties = { fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', fontFamily: "'DM Sans', sans-serif" }

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fff' }}>
      <style>{globalStyles()}</style>
      <Nav />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
          {no ? 'Personvernerklæring' : 'Privacy Policy'}
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 48 }}>
          {no ? 'Sist oppdatert:' : 'Last updated:'} {new Date().toLocaleDateString(no ? 'nb-NO' : 'en-US')}
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '1. Hvem er vi?' : '1. Who are we?'}</h2>
          <p style={pStyle}>
            {no ? 'Arxon er en norsk teknologibedrift som leverer AI-baserte løsninger for bedrifter, inkludert AI-telefonsvarer, automatisert booking og kundekommunikasjon. Vi er behandlingsansvarlig for personopplysninger som samles inn gjennom våre tjenester og nettside.' : 'Arxon is a Norwegian technology company that provides AI-powered solutions for businesses, including AI phone services, automated booking, and customer communication. We are responsible for personal data collected through our services and website.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '2. Hvilke opplysninger samler vi inn?' : '2. What information do we collect?'}</h2>
          <p style={pStyle}>
            {no ? 'Vi samler inn følgende kategorier av personopplysninger: kontaktinformasjon (navn, e-postadresse, telefonnummer) som du oppgir via kartleggingsskjemaet eller kontaktskjemaer, bedriftsinformasjon (firmanavn, bransje, antall ansatte) for å kunne tilpasse våre tjenester, teknisk data (IP-adresse, nettlesertype, enhetsinformasjon) som samles automatisk for å forbedre brukeropplevelsen, og bruksdata (sidevisninger, klikk, tid brukt) via analyseverktøy.' : 'We collect the following categories of personal data: contact information (name, email address, phone number) that you provide via assessment forms or contact forms, business information (company name, industry, number of employees) to tailor our services, technical data (IP address, browser type, device information) collected automatically to improve user experience, and usage data (page views, clicks, time spent) via analytics tools.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '3. Hvorfor samler vi inn opplysninger?' : '3. Why do we collect information?'}</h2>
          <p style={pStyle}>
            {no ? 'Vi bruker personopplysningene dine for å levere og forbedre våre tjenester, kontakte deg angående forespørsler og kartlegginger du har gjennomført, sende relevant informasjon om våre løsninger (kun med ditt samtykke), analysere og forbedre nettsiden og brukeropplevelsen, og overholde juridiske forpliktelser.' : 'We use your personal data to deliver and improve our services, contact you regarding requests and assessments you have completed, send relevant information about our solutions (with your consent only), analyze and improve the website and user experience, and comply with legal obligations.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '4. Rettslig grunnlag' : '4. Legal basis'}</h2>
          <p style={pStyle}>
            {no ? 'Vi behandler personopplysninger basert på samtykke (f.eks. når du fyller ut kartleggingsskjemaet), berettiget interesse (f.eks. for å forbedre tjenestene våre), og oppfyllelse av avtale (f.eks. når vi leverer en tjeneste du har bestilt).' : 'We process personal data based on consent (e.g., when you fill out assessment forms), legitimate interest (e.g., to improve our services), and contract fulfillment (e.g., when we deliver a service you have ordered).'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '5. Deling av opplysninger' : '5. Sharing of information'}</h2>
          <p style={pStyle}>
            {no ? 'Vi selger aldri dine personopplysninger til tredjeparter. Vi kan dele opplysninger med tjenesteleverandører som hjelper oss med drift (f.eks. hosting, e-post, analyseverktøy), men kun i den grad det er nødvendig og under strenge databehandleravtaler. Alle data lagres i EU/EØS-området.' : 'We never sell your personal data to third parties. We may share information with service providers who assist us with operations (e.g., hosting, email, analytics tools), but only to the extent necessary and under strict data processing agreements. All data is stored in the EU/EEA region.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '6. Lagring og sikkerhet' : '6. Storage and security'}</h2>
          <p style={pStyle}>
            {no ? 'Personopplysninger lagres så lenge det er nødvendig for formålet de ble samlet inn for, eller så lenge loven krever det. Vi bruker industristandarder for sikkerhet, inkludert kryptering, sikre servere og tilgangskontroll.' : 'Personal data is stored for as long as necessary for the purposes it was collected for, or as long as the law requires. We use industry-standard security measures, including encryption, secure servers, and access controls.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '7. Dine rettigheter' : '7. Your rights'}</h2>
          <p style={pStyle}>
            {no ? 'I henhold til GDPR og norsk personvernlovgivning har du rett til innsyn i hvilke opplysninger vi har om deg, retting av uriktige opplysninger, sletting av dine opplysninger, begrensning av behandlingen, dataportabilitet, og å trekke tilbake samtykke når som helst. For å utøve dine rettigheter, kontakt oss på kontakt@arxon.no.' : 'Under GDPR and Norwegian privacy legislation, you have the right to access information we hold about you, correct inaccurate information, delete your information, restrict processing, data portability, and withdraw consent at any time. To exercise your rights, contact us at kontakt@arxon.no.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '8. Informasjonskapsler (cookies)' : '8. Cookies'}</h2>
          <p style={pStyle}>
            {no ? 'Vi bruker nødvendige informasjonskapsler for at nettsiden skal fungere korrekt, og analytiske informasjonskapsler for å forstå hvordan besøkende bruker nettsiden. Du kan administrere dine cookie-preferanser i nettleserinnstillingene.' : 'We use necessary cookies to ensure the website functions properly, and analytical cookies to understand how visitors use the website. You can manage your cookie preferences in your browser settings.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '9. AI-behandling' : '9. AI Processing'}</h2>
          <p style={pStyle}>
            {no
              ? 'Arxon bruker Anthropic Claude for AI-analyse av kartleggingsdata. Personopplysninger sendes til Anthropic sin API for analyse, deretter slettes umiddelbart. AI-prosesseringen er GDPR-kompatibel og data lagres ikke for retrening.'
              : 'Arxon uses Anthropic Claude for AI analysis of assessment data. Personal data is sent to Anthropic\'s API for analysis, then deleted immediately. AI processing is GDPR-compliant and data is not stored for retraining.'
            }
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '10. Databehandlere' : '10. Data Processors'}</h2>
          <p style={pStyle}>
            {no
              ? 'Vi bruker følgende databehandlere: Anthropic (AI-analyse), Resend (e-post), Supabase (database), og Vapi (telefoniintegrasjon). Alle databehandleravtaler er i samsvar med GDPR.'
              : 'We use the following data processors: Anthropic (AI analysis), Resend (email), Supabase (database), and Vapi (phone integration). All data processing agreements comply with GDPR.'
            }
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '11. Dataoppbevaring' : '11. Data Retention'}</h2>
          <p style={pStyle}>
            {no
              ? 'Personopplysninger oppbevares i 12 måneder fra dato for innsamling, deretter slettes de permanent.'
              : 'Personal data is retained for 12 months from the date of collection, then permanently deleted.'
            }
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '12. Databruddmelding' : '12. Data Breach Notification'}</h2>
          <p style={pStyle}>
            {no
              ? 'I tilfelle et databrudd vil vi varsle berørte personer innen 72 timer og rapportere til relevante myndigheter i henhold til GDPR.'
              : 'In case of a data breach, we will notify affected individuals within 72 hours and report to relevant authorities in accordance with GDPR.'
            }
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '13. Endringer i denne personvernerklæringen' : '13. Changes to This Privacy Policy'}</h2>
          <p style={pStyle}>
            {no
              ? 'Vi kan oppdatere denne personvernerklæringen fra tid til annen. Vi vil varsle deg om betydelige endringer gjennom nettsiden.'
              : 'We may update this privacy policy from time to time. We will notify you of significant changes through the website.'
            }
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '14. Kontakt oss' : '14. Contact us'}</h2>
          <p style={pStyle}>
            {no ? 'Har du spørsmål om vår behandling av personopplysninger? Kontakt oss på kontakt@arxon.no.' : 'Do you have questions about how we process your personal data? Contact us at kontakt@arxon.no.'}
          </p>
        </div>

      </main>
      <Footer minimal />
    </div>
  )
}