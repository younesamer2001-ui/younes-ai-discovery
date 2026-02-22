import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vilkår for bruk — Arxon',
  description: 'Les vilkårene for bruk av Arxons nettsider og tjenester.',
  openGraph: {
    title: 'Vilkår for bruk — Arxon',
    description: 'Les vilkårene for bruk av Arxons nettsider og tjenester.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
