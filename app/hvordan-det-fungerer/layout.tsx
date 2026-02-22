import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hvordan det fungerer — Arxon | Fra kartlegging til resultater',
  description: 'Se hvordan Arxon automatiserer bedriften din i 4 enkle steg. Gratis kartlegging, pakkebygger og AI-analyse.',
  openGraph: {
    title: 'Hvordan det fungerer — Arxon | Fra kartlegging til resultater',
    description: 'Se hvordan Arxon automatiserer bedriften din i 4 enkle steg. Gratis kartlegging, pakkebygger og AI-analyse.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
