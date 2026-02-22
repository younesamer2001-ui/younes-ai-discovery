import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integrasjoner — Arxon | Kobles til verktøyene du allerede bruker',
  description: 'Arxon integrerer med CRM, kalender, regnskap og mer. Sømløs tilkobling til dine eksisterende systemer.',
  openGraph: {
    title: 'Integrasjoner — Arxon | Kobles til verktøyene du allerede bruker',
    description: 'Arxon integrerer med CRM, kalender, regnskap og mer. Sømløs tilkobling til dine eksisterende systemer.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
