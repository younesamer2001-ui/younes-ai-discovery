import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gratis kartlegging — Arxon | Finn dine automatiseringsmuligheter',
  description: 'Svar på noen spørsmål og få en gratis AI-analyse av bedriften din. Se hvor mye du kan spare med automatisering.',
  openGraph: {
    title: 'Gratis kartlegging — Arxon | Finn dine automatiseringsmuligheter',
    description: 'Svar på noen spørsmål og få en gratis AI-analyse av bedriften din. Se hvor mye du kan spare med automatisering.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
