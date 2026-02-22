'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { gold, bg, globalStyles } from '@/lib/constants'

export default function VilkarPage() {
  const router = useRouter()
  const [lang, setLang] = useState<'no'|'en'>('no')

  const sectionStyle: React.CSSProperties = { marginBottom: 32 }
  const h2Style: React.CSSProperties = { fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }
  const pStyle: React.CSSProperties = { fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', fontFamily: "'DM Sans', sans-serif" }

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fff' }}>
      <style>{globalStyles()}</style>
      <Nav lang={lang} setLang={setLang} />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
          Vilkår for bruk
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 48 }}>Sist oppdatert: {new Date().toLocaleDateString('nb-NO')}</p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Aksept av vilkår</h2>
          <p style={pStyle}>
            Ved å bruke Arxon sine nettsider og tjenester aksepterer du disse vilkårene for bruk. Dersom du ikke godtar vilkårene, ber vi deg om å ikke benytte våre tjenester.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Beskrivelse av tjenesten</h2>
          <p style={pStyle}>
            Arxon leverer AI-baserte løsninger for bedrifter, herunder AI-telefonsvarer, automatisert booking, kundekommunikasjon og tilhørende analyser. Tjenestene tilpasses den enkelte kundes behov gjennom en innledende kartlegging.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Bruk av tjenesten</h2>
          <p style={pStyle}>
            Du forplikter deg til å bruke tjenestene våre i samsvar med gjeldende lover og forskrifter, ikke misbruke eller forsøke å omgå sikkerhetsfunksjoner, oppgi korrekte opplysninger i kartleggingsskjemaet, og ikke bruke tjenestene til ulovlige eller uetiske formål.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Immaterielle rettigheter</h2>
          <p style={pStyle}>
            Alt innhold på Arxon sine nettsider, inkludert tekst, grafikk, logoer, bilder og programvare, er beskyttet av norsk og internasjonal opphavsrett. Du har ikke rett til å kopiere, distribuere eller modifisere innhold uten skriftlig samtykke fra Arxon.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Priser og betaling</h2>
          <p style={pStyle}>
            Priser for Arxon sine tjenester avtales individuelt basert på kartlegging og kundens behov. Alle priser er eksklusiv merverdiavgift med mindre annet er spesifisert. Betalingsvilkår spesifiseres i den individuelle avtalen.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Ansvarsbegrensning</h2>
          <p style={pStyle}>
            Arxon leverer tjenester «som de er» og gir ingen garantier utover det som følger av ufravikelig lovgivning. Arxon er ikke ansvarlig for indirekte tap, tapt fortjeneste eller konsekvenstap som følge av bruk av tjenestene.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Oppsigelse</h2>
          <p style={pStyle}>
            Begge parter kan si opp avtalen med 30 dagers skriftlig varsel. Ved oppsigelse vil Arxon slette eller returnere kundens data i henhold til gjeldende lovgivning og personvernerklæringen.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Endringer i vilkårene</h2>
          <p style={pStyle}>
            Arxon forbeholder seg retten til å endre disse vilkårene. Vesentlige endringer vil bli kommunisert til eksisterende kunder med rimelig varsel. Fortsatt bruk av tjenestene etter endring utgjør aksept av de oppdaterte vilkårene.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Lovvalg og tvister</h2>
          <p style={pStyle}>
            Disse vilkårene er underlagt norsk lov. Eventuelle tvister skal søkes løst i minnelighet. Dersom dette ikke lykkes, skal tvisten avgjøres av norske domstoler.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Kontakt</h2>
          <p style={pStyle}>
            Har du spørsmål om vilkårene? Kontakt oss på kontakt@arxon.no.
          </p>
        </div>

      </main>
      <Footer lang={lang} minimal />
    </div>
  )
}