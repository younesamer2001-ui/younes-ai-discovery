import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personvernerklæring — Arxon',
  description: 'Les om hvordan Arxon behandler personopplysninger i henhold til GDPR og norsk personvernlovgivning.',
  openGraph: {
    title: 'Personvernerklæring — Arxon',
    description: 'Les om hvordan Arxon behandler personopplysninger i henhold til GDPR og norsk personvernlovgivning.',
    images: ['/arxon-og.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
