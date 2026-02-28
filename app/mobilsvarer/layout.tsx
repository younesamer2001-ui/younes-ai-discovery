import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Mobilsvarer — Arxon | Aldri mist et anrop igjen',
  description: 'Arxons AI-mobilsvarer svarer telefonen 24/7, booker møter og kvalifiserer leads automatisk. Spar 15–20 timer i uken.',
  openGraph: {
    title: 'AI Mobilsvarer — Arxon | Aldri mist et anrop igjen',
    description: 'Arxons AI-mobilsvarer svarer telefonen 24/7, booker møter og kvalifiserer leads automatisk. Spar 15–20 timer i uken.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
