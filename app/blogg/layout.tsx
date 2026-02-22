import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blogg — Arxon | AI-innsikt for norske bedrifter',
  description: 'Les om AI-automatisering, digitalisering og hvordan norske bedrifter sparer tid og penger med intelligent teknologi.',
  openGraph: {
    title: 'Arxon Blogg — AI-innsikt for norske bedrifter',
    description: 'Praktiske artikler om AI-automatisering for norske bedrifter.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
