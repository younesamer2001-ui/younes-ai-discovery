/**
 * Arxon — Vapi AI Assistant Setup Script
 *
 * Bruk:
 *   node scripts/setup-vapi-assistant.js DIN_VAPI_API_KEY
 *
 * Henter API-nøkkel fra: https://dashboard.vapi.ai → Settings → API Keys
 * Du trenger den PRIVATE key (ikke public key).
 *
 * Scriptet oppretter:
 *   1. En AI-resepsjonist med norsk stemme
 *   2. Deepgram STT (tale-til-tekst) på norsk
 *   3. GPT-4o-mini som språkmodell
 *   4. Azure Neural TTS (nb-NO-FinnNeural) for naturlig norsk tale
 */

const VAPI_API_KEY = process.argv[2]

if (!VAPI_API_KEY) {
  console.error('\n❌ Mangler API-nøkkel!\n')
  console.error('Bruk: node scripts/setup-vapi-assistant.js DIN_VAPI_API_KEY')
  console.error('\nHent nøkkelen fra: https://dashboard.vapi.ai → Settings → API Keys\n')
  process.exit(1)
}

const assistantConfig = {
  name: 'Arxon AI Resepsjonist',

  // ── Språkmodell ──
  model: {
    provider: 'openai',
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 250,
    messages: [
      {
        role: 'system',
        content: `Du er Arxon sin AI-resepsjonist. Du svarer på telefonsamtaler og hjelper potensielle kunder.

## Om Arxon
Arxon er et norsk selskap som tilbyr intelligent AI-automatisering for bedrifter. Vi hjelper bedrifter med å spare tid og penger ved å automatisere repetitive oppgaver som telefonhåndtering, booking, kundeservice og lead-kvalifisering.

## Dine oppgaver
1. Svar vennlig og profesjonelt på spørsmål om Arxon sine tjenester
2. Forklar hvordan AI-mobilsvareren fungerer
3. Forklar prisene dersom kunden spør
4. Tilby å booke en gratis kartlegging (befaring)
5. Samle inn kontaktinformasjon dersom kunden ønsker å bli kontaktet

## Tjenester
- **AI Mobilsvarer**: Svarer på telefonen 24/7, booker timer, sender SMS-bekreftelser
- **Automatisering**: Kobler sammen systemer som Fiken, Tripletex, HubSpot, Google Calendar
- **Lead-kvalifisering**: AI som automatisk kvalifiserer leads og booker møter

## Priser (årlig)
- **Starter** (1-2 automatiseringer): Sparer 10-20 timer/uke. Fra ca. 50.000 kr/år
- **Profesjonell** (3-5 automatiseringer): Sparer 20-35 timer/uke. Fra ca. 85.000 kr/år
- **Vekst** (6+ automatiseringer): Sparer 35-50+ timer/uke. Fra ca. 120.000 kr/år

Til sammenligning koster en resepsjonist ca. 420.000 kr/år og en kundeservice-ansatt ca. 480.000 kr/år.

## Viktige regler
- Snakk alltid norsk med mindre kunden snakker engelsk
- Hold svarene korte — maks 2-3 setninger per svar
- Vær vennlig, men profesjonell
- Hvis kunden vil booke en kartlegging, si at du kan sende dem en lenke, eller be om deres e-post/telefon
- Aldri gi rabatter eller spesialtilbud uten godkjenning
- Hvis du ikke vet svaret, si at du kan sette kunden i kontakt med teamet
- Nevn alltid at kartleggingen er GRATIS og UFORPLIKTENDE

## Setup-tid
Det tar kun 48 timer fra signering til alt er oppe og kjører. Ingen risiko — vi tilbyr pengene tilbake-garanti i de første 30 dagene.

## GDPR
All data er kryptert (AES-256), lagres på europeiske servere, og vi er fullt GDPR-kompatible.`
      }
    ]
  },

  // ── Tale-til-tekst (STT) ──
  transcriber: {
    provider: 'deepgram',
    model: 'nova-2',
    language: 'no',
  },

  // ── Tekst-til-tale (TTS) ──
  voice: {
    provider: 'azure',
    voiceId: 'nb-NO-FinnNeural',
  },

  // ── Samtalekonfigurasjon ──
  firstMessage: 'Hei, og velkommen til Arxon! Mitt navn er Finn, og jeg er Arxon sin AI-assistent. Hvordan kan jeg hjelpe deg i dag?',

  endCallMessage: 'Takk for samtalen! Ha en fin dag, og ikke nøl med å ta kontakt igjen.',

  // Responstid og stille-håndtering
  responseLlmDelaySeconds: 0.4,
  silenceTimeoutSeconds: 30,
  maxDurationSeconds: 600, // maks 10 minutter per samtale

  // Avbrytelses-innstillinger
  backchannelingEnabled: true,
  backgroundDenoisingEnabled: true,

  // Metadata
  metadata: {
    company: 'Arxon',
    language: 'nb-NO',
    purpose: 'customer-reception',
    createdBy: 'setup-script',
  },
}

async function createAssistant() {
  console.log('\n🚀 Oppretter Arxon AI Resepsjonist i Vapi...\n')

  try {
    const response = await fetch('https://api.vapi.ai/assistant', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assistantConfig),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ Feil fra Vapi API (${response.status}):`)
      console.error(errorText)
      process.exit(1)
    }

    const assistant = await response.json()

    console.log('✅ Assistent opprettet!\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`  Navn:          ${assistant.name}`)
    console.log(`  ID:            ${assistant.id}`)
    console.log(`  Stemme:        Azure nb-NO-FinnNeural`)
    console.log(`  Språk:         Norsk (Deepgram Nova-2)`)
    console.log(`  Modell:        GPT-4o-mini`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    console.log('📋 Neste steg:\n')
    console.log('1. Legg til dette i .env.local:')
    console.log(`   NEXT_PUBLIC_VAPI_ASSISTANT_ID=${assistant.id}\n`)
    console.log('2. Legg til din Public Key (finnes på dashboard.vapi.ai):')
    console.log('   NEXT_PUBLIC_VAPI_PUBLIC_KEY=din-public-key\n')
    console.log('3. Start nettsiden:')
    console.log('   npm run dev\n')
    console.log('4. Gå til http://localhost:3000/demo og test!\n')

    // Hent også public key info
    console.log('💡 Tips: Du kan teste assistenten direkte i Vapi Dashboard også:')
    console.log(`   https://dashboard.vapi.ai/assistants/${assistant.id}\n`)

    return assistant

  } catch (err) {
    console.error('❌ Nettverksfeil:', err.message)
    process.exit(1)
  }
}

createAssistant()
