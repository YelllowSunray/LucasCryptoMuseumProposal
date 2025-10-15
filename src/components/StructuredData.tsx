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
    "name": "CryptoMuseum - World's First Cryptocurrency Museum",
    "alternateName": ["Crypto Museum", "Cryptocurrency Museum", "Blockchain Museum"],
    "description": "The world's first cryptocurrency museum featuring interactive exhibits, hands-on blockchain learning, and crypto safety education. Making cryptocurrency understandable, trustworthy, and accessible for everyone through immersive educational experiences.",
    "url": "https://lucas-crypto-museum-proposal.vercel.app",
    "logo": "https://lucas-crypto-museum-proposal.vercel.app/logos/blockriselogo1.png",
    "image": [
      "https://lucas-crypto-museum-proposal.vercel.app/images/Section1PicV2.png",
      "https://lucas-crypto-museum-proposal.vercel.app/images/Section1Pic.png"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL",
      "addressLocality": "Amsterdam",
      "addressRegion": "North Holland",
      "streetAddress": "To be announced"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.3676,
      "longitude": 4.9041
    },
    "openingHours": "Mo-Su 10:00-18:00",
    "email": "Iyersamir@gmail.com",
    "telephone": "+31 687343078",
    "sameAs": [
      "https://twitter.com/cryptomuseum",
      "https://linkedin.com/company/cryptomuseum",
      "https://facebook.com/cryptomuseum"
    ],
    "foundingDate": "2025",
    "isAccessibleForFree": false,
    "priceRange": "€15-€25",
    "currenciesAccepted": ["EUR", "BTC", "ETH"],
    "paymentAccepted": ["Cash", "Credit Card", "Cryptocurrency"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Museum Experiences and Educational Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interactive Cryptocurrency Exhibits",
            "description": "Hands-on cryptocurrency and blockchain demonstrations including Bitcoin trading simulator, wallet security training, and blockchain building activities"
          },
          "category": "Educational Experience"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Educational Tours and Workshops",
            "description": "Guided tours explaining cryptocurrency concepts, blockchain technology, and digital wallet security for all ages"
          },
          "category": "Educational Experience"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cryptocurrency Safety Training",
            "description": "Interactive programs teaching crypto scam prevention, wallet security, and safe trading practices"
          },
          "category": "Educational Experience"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Family-Friendly Crypto Learning",
            "description": "Age-appropriate cryptocurrency education programs designed for families and children"
          },
          "category": "Educational Experience"
        }
      ]
    },
    "audience": {
      "@type": "Audience",
      "audienceType": ["Families", "Students", "Crypto Enthusiasts", "Beginners", "Professionals"]
    },
    "keywords": "cryptocurrency museum, bitcoin museum, blockchain education, crypto learning, digital currency exhibits, crypto safety, cryptocurrency for beginners, blockchain technology, Amsterdam museum, Netherlands crypto education"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 