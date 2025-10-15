import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MuseumStructuredData } from '@/components/StructuredData'
import { AdditionalStructuredData } from '@/components/AdditionalStructuredData'
import { SEOHead } from '@/components/SEOHead'
import { ClarityAnalytics } from '@/components/ClarityAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CryptoMuseum - World\'s First Cryptocurrency Museum | Interactive Crypto Education',
    template: '%s | CryptoMuseum - Interactive Cryptocurrency Education'
  },
  description: 'Discover the world\'s first cryptocurrency museum! Interactive exhibits, hands-on blockchain learning, and crypto safety education. Perfect for beginners, families, and crypto enthusiasts. Learn about Bitcoin, digital wallets, and blockchain technology in a fun, safe environment.',
  keywords: [
    'cryptocurrency museum',
    'bitcoin museum',
    'blockchain museum',
    'crypto education',
    'cryptocurrency for beginners',
    'blockchain learning',
    'digital currency education',
    'crypto safety training',
    'bitcoin exhibits',
    'cryptocurrency interactive',
    'blockchain demonstrations',
    'crypto scam prevention',
    'digital wallet security',
    'cryptocurrency family friendly',
    'crypto literacy',
    'blockchain technology museum',
    'cryptocurrency Amsterdam',
    'crypto museum Netherlands',
    'digital money education',
    'cryptocurrency hands-on learning'
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
    title: 'CryptoMuseum - World\'s First Cryptocurrency Museum | Interactive Crypto Education',
    description: 'Discover the world\'s first cryptocurrency museum! Interactive exhibits, hands-on blockchain learning, and crypto safety education. Perfect for beginners, families, and crypto enthusiasts.',
    siteName: 'CryptoMuseum - Interactive Cryptocurrency Education',
    images: [
      {
        url: '/images/Section1PicV2.png',
        width: 1200,
        height: 630,
        alt: 'CryptoMuseum - World\'s First Interactive Cryptocurrency Museum with Star Trek-inspired design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoMuseum - World\'s First Cryptocurrency Museum',
    description: 'Interactive crypto education, blockchain exhibits, and hands-on learning. Perfect for beginners and families!',
    images: ['/images/Section1PicV2.png'],
    creator: '@cryptomuseum',
    site: '@cryptomuseum',
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
        <SEOHead />
        <MuseumStructuredData />
        <AdditionalStructuredData />
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
