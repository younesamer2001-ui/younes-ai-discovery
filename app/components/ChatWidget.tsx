'use client'

import dynamic from 'next/dynamic'
import '@vapi-ai/client-sdk-react/styles'

const VapiWidget = dynamic(
  () => import('@vapi-ai/client-sdk-react').then((mod) => mod.VapiWidget),
  { ssr: false }
)

export default function ChatWidget() {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID

  if (!publicKey || !assistantId) return null

  return (
    <VapiWidget
      publicKey={publicKey}
      assistantId={assistantId}
      mode="hybrid"
      theme="dark"
      position="bottom-right"
      size="compact"
      borderRadius="medium"
      baseBgColor="#111118"
      accentColor="#c9a96e"
      ctaButtonColor="#c9a96e"
      ctaButtonTextColor="#0a0a0f"
      title="Arxon AI"
      ctaTitle="Hei! 👋"
      ctaSubtitle="Spør meg om AI-løsninger"
      startButtonText="Start samtale"
      endButtonText="Avslutt"
      chatPlaceholder="Skriv en melding..."
      chatFirstMessage="Hei! Jeg er Arxon sin AI-assistent. Hvordan kan jeg hjelpe deg i dag? Du kan skrive her eller trykke på mikrofonen for å snakke med meg."
      chatEmptyMessage="Start en samtale med Arxon AI"
      hybridEmptyMessage="Skriv en melding eller bruk stemmen din"
      voiceEmptyMessage="Trykk for å snakke med Arxon AI"
      voiceActiveEmptyMessage="Lytter..."
      voiceShowTranscript={true}
    />
  )
}
