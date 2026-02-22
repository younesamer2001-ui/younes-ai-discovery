import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kundehistorier — Arxon | Se hvordan bedrifter sparer med AI',
  description: 'Les hvordan norske bedrifter sparer tid og penger med Arxons AI-automatisering. Ekte resultater fra ekte bedrifter.',
  openGraph: {
    title: 'Kundehistorier — Arxon | Se hvordan bedrifter sparer med AI',
    description: 'Les hvordan norske bedrifter sparer tid og penger med Arxons AI-automatisering. Ekte resultater fra ekte bedrifter.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
