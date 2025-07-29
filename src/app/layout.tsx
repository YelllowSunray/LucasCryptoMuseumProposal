import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MuseumStructuredData } from '@/components/StructuredData'
import { ClarityAnalytics } from '@/components/ClarityAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CryptoMuseum - Making Cryptocurrency Accessible & Educational',
    template: '%s | CryptoMuseum'
  },
  description: 'Experience the future of cryptocurrency education at CryptoMuseum. Interactive exhibits, blockchain demonstrations, and hands-on learning make crypto understandable, trustworthy, and accessible for everyone.',
  keywords: [
    'cryptocurrency museum',
    'blockchain education',
    'crypto learning',
    'digital currency exhibits',
    'bitcoin museum',
    'crypto safety education',
    'blockchain technology',
    'cryptocurrency for beginners',
    'digital wallet security',
    'crypto scam prevention'
  ],
  authors: [{ name: 'CryptoMuseum Team' }],
  creator: 'CryptoMuseum',
  publisher: 'CryptoMuseum',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lucas-crypto-museum-proposal.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lucas-crypto-museum-proposal.vercel.app',
    title: 'CryptoMuseum - Making Cryptocurrency Accessible & Educational',
    description: 'Experience the future of cryptocurrency education at CryptoMuseum. Interactive exhibits, blockchain demonstrations, and hands-on learning make crypto understandable, trustworthy, and accessible for everyone.',
    siteName: 'CryptoMuseum',
    images: [
      {
        url: '/images/Section1Pic.png',
        width: 1200,
        height: 630,
        alt: 'CryptoMuseum - Interactive Cryptocurrency Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoMuseum - Making Cryptocurrency Accessible & Educational',
    description: 'Experience the future of cryptocurrency education at CryptoMuseum. Interactive exhibits, blockchain demonstrations, and hands-on learning.',
    images: ['/images/Section1Pic.png'],
    creator: '@cryptomuseum',
  },
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

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <MuseumStructuredData />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <ClarityAnalytics />
      </body>
    </html>
  )
}
