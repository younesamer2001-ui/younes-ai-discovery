'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { gold, bg, globalStyles } from '@/lib/constants'

export default function VilkarPage() {
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
          {no ? 'Vilkår for bruk' : 'Terms of Use'}
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 48 }}>
          {no ? 'Sist oppdatert:' : 'Last updated:'} {new Date().toLocaleDateString(no ? 'nb-NO' : 'en-US')}
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '1. Aksept av vilkår' : '1. Acceptance of terms'}</h2>
          <p style={pStyle}>
            {no ? 'Ved å bruke Arxon sine nettsider og tjenester aksepterer du disse vilkårene for bruk. Dersom du ikke godtar vilkårene, ber vi deg om å ikke benytte våre tjenester.' : 'By using Arxon\'s websites and services, you accept these terms of use. If you do not agree to the terms, we ask that you do not use our services.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '2. Beskrivelse av tjenesten' : '2. Service description'}</h2>
          <p style={pStyle}>
            {no ? 'Arxon leverer AI-baserte løsninger for bedrifter, herunder AI-telefonsvarer, automatisert booking, kundekommunikasjon og tilhørende analyser. Tjenestene tilpasses den enkelte kundes behov gjennom en innledende kartlegging.' : 'Arxon provides AI-powered solutions for businesses, including AI phone services, automated booking, customer communication, and related analytics. Services are tailored to each customer\'s needs through an initial assessment.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '3. Bruk av tjenesten' : '3. Service usage'}</h2>
          <p style={pStyle}>
            {no ? 'Du forplikter deg til å bruke tjenestene våre i samsvar med gjeldende lover og forskrifter, ikke misbruke eller forsøke å omgå sikkerhetsfunksjoner, oppgi korrekte opplysninger i kartleggingsskjemaet, og ikke bruke tjenestene til ulovlige eller uetiske formål.' : 'You commit to using our services in accordance with applicable laws and regulations, not to abuse or attempt to bypass security features, provide accurate information in assessment forms, and not use the services for illegal or unethical purposes.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '4. Immaterielle rettigheter' : '4. Intellectual property rights'}</h2>
          <p style={pStyle}>
            {no ? 'Alt innhold på Arxon sine nettsider, inkludert tekst, grafikk, logoer, bilder og programvare, er beskyttet av norsk og internasjonal opphavsrett. Du har ikke rett til å kopiere, distribuere eller modifisere innhold uten skriftlig samtykke fra Arxon.' : 'All content on Arxon\'s websites, including text, graphics, logos, images, and software, is protected by Norwegian and international copyright law. You do not have the right to copy, distribute, or modify content without written consent from Arxon.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '5. Priser og betaling' : '5. Pricing and payment'}</h2>
          <p style={pStyle}>
            {no ? 'Priser for Arxon sine tjenester avtales individuelt basert på kartlegging og kundens behov. Alle priser er eksklusiv merverdiavgift med mindre annet er spesifisert. Betalingsvilkår spesifiseres i den individuelle avtalen.' : 'Prices for Arxon\'s services are negotiated individually based on assessment and customer needs. All prices are exclusive of value-added tax unless otherwise specified. Payment terms are specified in the individual agreement.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '6. Ansvarsbegrensning' : '6. Limitation of liability'}</h2>
          <p style={pStyle}>
            {no ? 'Arxon leverer tjenester «som de er» og gir ingen garantier utover det som følger av ufravikelig lovgivning. Arxon er ikke ansvarlig for indirekte tap, tapt fortjeneste eller konsekvenstap som følge av bruk av tjenestene.' : 'Arxon provides services "as is" and gives no warranties beyond those mandated by law. Arxon is not liable for indirect damages, lost profits, or consequential damages arising from use of the services.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '7. Oppsigelse' : '7. Termination'}</h2>
          <p style={pStyle}>
            {no ? 'Begge parter kan si opp avtalen med 30 dagers skriftlig varsel. Ved oppsigelse vil Arxon slette eller returnere kundens data i henhold til gjeldende lovgivning og personvernerklæringen.' : 'Both parties may terminate the agreement with 30 days\' written notice. Upon termination, Arxon will delete or return customer data in accordance with applicable law and the privacy policy.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '8. Endringer i vilkårene' : '8. Changes to terms'}</h2>
          <p style={pStyle}>
            {no ? 'Arxon forbeholder seg retten til å endre disse vilkårene. Vesentlige endringer vil bli kommunisert til eksisterende kunder med rimelig varsel. Fortsatt bruk av tjenestene etter endring utgjør aksept av de oppdaterte vilkårene.' : 'Arxon reserves the right to modify these terms. Significant changes will be communicated to existing customers with reasonable notice. Continued use of the services after changes constitutes acceptance of the updated terms.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '9. Lovvalg og tvister' : '9. Governing law and disputes'}</h2>
          <p style={pStyle}>
            {no ? 'Disse vilkårene er underlagt norsk lov. Eventuelle tvister skal søkes løst i minnelighet. Dersom dette ikke lykkes, skal tvisten avgjøres av norske domstoler.' : 'These terms are governed by Norwegian law. Any disputes shall be resolved amicably. If this fails, disputes shall be resolved by Norwegian courts.'}
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>{no ? '10. Kontakt' : '10. Contact'}</h2>
          <p style={pStyle}>
            {no ? 'Har du spørsmål om vilkårene? Kontakt oss på kontakt@arxon.no.' : 'Do you have questions about the terms? Contact us at kontakt@arxon.no.'}
          </p>
        </div>

      </main>
      <Footer minimal />
    </div>
  )
}