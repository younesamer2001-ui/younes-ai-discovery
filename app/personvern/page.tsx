'use client'

import { useRouter } from 'next/navigation'

const gold = '#c9a96e'
const bg = '#0a0a0f'

export default function PersonvernPage() {
  const router = useRouter()

  const sectionStyle: React.CSSProperties = { marginBottom: 32 }
  const h2Style: React.CSSProperties = { fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }
  const pStyle: React.CSSProperties = { fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', fontFamily: "'DM Sans', sans-serif" }

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fff' }}>
      {/* Nav */}
      <nav style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <img src="/arxon-icon.png" alt="Arxon" style={{ width: 30, height: 30 }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Arxon</span>
        </div>
      </nav>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
          Personvernerklæring
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 48 }}>Sist oppdatert: {new Date().toLocaleDateString('nb-NO')}</p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Hvem er vi?</h2>
          <p style={pStyle}>
            Arxon er en norsk teknologibedrift som leverer AI-baserte løsninger for bedrifter, inkludert AI-telefonsvarer, automatisert booking og kundekommunikasjon. Vi er behandlingsansvarlig for personopplysninger som samles inn gjennom våre tjenester og nettside.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Hvilke opplysninger samler vi inn?</h2>
          <p style={pStyle}>
            Vi samler inn følgende kategorier av personopplysninger: kontaktinformasjon (navn, e-postadresse, telefonnummer) som du oppgir via kartleggingsskjemaet eller kontaktskjemaer, bedriftsinformasjon (firmanavn, bransje, antall ansatte) for å kunne tilpasse våre tjenester, teknisk data (IP-adresse, nettlesertype, enhetsinformasjon) som samles automatisk for å forbedre brukeropplevelsen, og bruksdata (sidevisninger, klikk, tid brukt) via analyseverktøy.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Hvorfor samler vi inn opplysninger?</h2>
          <p style={pStyle}>
            Vi bruker personopplysningene dine for å levere og forbedre våre tjenester, kontakte deg angående forespørsler og kartlegginger du har gjennomført, sende relevant informasjon om våre løsninger (kun med ditt samtykke), analysere og forbedre nettsiden og brukeropplevelsen, og overholde juridiske forpliktelser.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Rettslig grunnlag</h2>
          <p style={pStyle}>
            Vi behandler personopplysninger basert på samtykke (f.eks. når du fyller ut kartleggingsskjemaet), berettiget interesse (f.eks. for å forbedre tjenestene våre), og oppfyllelse av avtale (f.eks. når vi leverer en tjeneste du har bestilt).
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Deling av opplysninger</h2>
          <p style={pStyle}>
            Vi selger aldri dine personopplysninger til tredjeparter. Vi kan dele opplysninger med tjenesteleverandører som hjelper oss med drift (f.eks. hosting, e-post, analyseverktøy), men kun i den grad det er nødvendig og under strenge databehandleravtaler. Alle data lagres i EU/EØS-området.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Lagring og sikkerhet</h2>
          <p style={pStyle}>
            Personopplysninger lagres så lenge det er nødvendig for formålet de ble samlet inn for, eller så lenge loven krever det. Vi bruker industristandarder for sikkerhet, inkludert kryptering, sikre servere og tilgangskontroll.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Dine rettigheter</h2>
          <p style={pStyle}>
            I henhold til GDPR og norsk personvernlovgivning har du rett til innsyn i hvilke opplysninger vi har om deg, retting av uriktige opplysninger, sletting av dine opplysninger, begrensning av behandlingen, dataportabilitet, og å trekke tilbake samtykke når som helst. For å utøve dine rettigheter, kontakt oss på kontakt@arxon.no.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Informasjonskapsler (cookies)</h2>
          <p style={pStyle}>
            Vi bruker nødvendige informasjonskapsler for at nettsiden skal fungere korrekt, og analytiske informasjonskapsler for å forstå hvordan besøkende bruker nettsiden. Du kan administrere dine cookie-preferanser i nettleserinnstillingene.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Kontakt oss</h2>
          <p style={pStyle}>
            Har du spørsmål om vår behandling av personopplysninger? Kontakt oss på kontakt@arxon.no.
          </p>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => router.push('/')} style={{
            background: 'none', border: `1px solid rgba(255,255,255,0.1)`, color: 'rgba(255,255,255,0.5)',
            borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}>
            ← Tilbake til forsiden
          </button>
        </div>
      </main>
    </div>
  )
}