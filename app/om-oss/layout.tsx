import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Om oss — Arxon | Vi bygger fremtidens kundeservice',
  description: 'Arxon er et norsk teknologiselskap som gjør avansert AI tilgjengelig for alle bedrifter. Basert i Oslo.',
  openGraph: {
    title: 'Om Arxon — Fremtidens kundeservice for norske bedrifter',
    description: 'Vi bygger AI-løsninger som sparer norske bedrifter for hundretusenvis av kroner årlig.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
