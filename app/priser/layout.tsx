import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Priser — Arxon | Bygg din AI-pakke',
  description: 'Velg automasjonene som passer din bedrift. Tre nivåer, ingen bindingstid. Book en gratis samtale for skreddersydd tilbud.',
  openGraph: {
    title: 'Priser — Arxon | Bygg din AI-pakke',
    description: 'Velg automasjonene som passer din bedrift. Tre nivåer, ingen bindingstid. Book en gratis samtale for skreddersydd tilbud.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
