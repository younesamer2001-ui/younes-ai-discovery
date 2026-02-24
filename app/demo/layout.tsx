import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Demo — Arxon | Hør AI-telefonsvaren i aksjon',
  description: 'Prøv Arxons AI-telefonsvarer live. Snakk med Finn, vår AI-assistent, og opplev hvordan automatisering kan hjelpe din bedrift.',
  openGraph: {
    title: 'Live Demo — Arxon | Hør AI-telefonsvaren i aksjon',
    description: 'Prøv Arxons AI-telefonsvarer live. Snakk med Finn, vår AI-assistent, og opplev hvordan automatisering kan hjelpe din bedrift.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
