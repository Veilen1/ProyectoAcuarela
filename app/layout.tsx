import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Galeria Devrient | Arte y Merchandising',
    template: '%s | Galeria Devrient',
  },
  description: 'Galeria de arte y merchandising de Devrient con pinturas destacadas y colecciones en acuarela.',
  keywords: [
    'galeria de arte',
    'acuarelas',
    'pinturas',
    'merchandising artistico',
    'arte Devrient',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Galeria Devrient | Arte y Merchandising',
    description: 'Descubre pinturas destacadas y colecciones en acuarela de Devrient.',
    url: '/',
    siteName: 'Galeria Devrient',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galeria Devrient | Arte y Merchandising',
    description: 'Descubre pinturas destacadas y colecciones en acuarela de Devrient.',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
