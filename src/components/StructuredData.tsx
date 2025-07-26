import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  image = '/images/og-image.jpg',
  url = 'https://lucas-crypto-museum-proposal.vercel.app/',
  type = 'website'
}: SEOProps) {
  const fullTitle = title ? `${title} | CryptoMuseum` : 'CryptoMuseum - Making Cryptocurrency Accessible & Educational'
  const fullDescription = description || 'Experience the future of cryptocurrency education at CryptoMuseum. Interactive exhibits, blockchain demonstrations, and hands-on learning make crypto understandable, trustworthy, and accessible for everyone.'

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="CryptoMuseum" />
      <link rel="canonical" href={url} />
    </Head>
  )
}

export function MuseumStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Museum",
    "name": "CryptoMuseum",
    "description": "A revolutionary space where cryptocurrency becomes understandable, trustworthy, and accessible for everyone through interactive exhibits and educational experiences.",
    "url": "https://lucas-crypto-museum-proposal.vercel.app",
    "logo": "https://lucas-crypto-museum-proposal.vercel.app/logos/blockriselogo1.png",
    "image": "https://lucas-crypto-museum-proposal.vercel.app/images/Section1Pic.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL",
      "addressLocality": "Amsterdam",
      "addressRegion": "North Holland"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.3676,
      "longitude": 4.9041
    },
    "openingHours": "Mo-Su 10:00-18:00",
    "email": "info@cryptomuseum.com",
    "sameAs": [
      "https://twitter.com/cryptomuseum",
      "https://linkedin.com/company/cryptomuseum",
      "https://facebook.com/cryptomuseum"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Museum Experiences",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interactive Crypto Exhibits",
            "description": "Hands-on cryptocurrency and blockchain demonstrations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Educational Tours",
            "description": "Guided tours explaining cryptocurrency concepts"
          }
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 