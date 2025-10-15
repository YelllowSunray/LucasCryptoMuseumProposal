export function AdditionalStructuredData() {
  // Organization Schema for better business understanding
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CryptoMuseum",
    "alternateName": ["Crypto Museum", "Cryptocurrency Museum", "Blockchain Museum"],
    "url": "https://www.reallybigappologytodadmusuem.com",
    "logo": "https://www.reallybigappologytodadmusuem.com/logos/blockriselogo1.png",
    "description": "World's first cryptocurrency museum dedicated to making blockchain technology accessible and understandable for everyone through interactive exhibits and educational experiences.",
    "foundingDate": "2025",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL",
      "addressLocality": "Amsterdam",
      "addressRegion": "North Holland"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31 687343078",
      "contactType": "Customer Service",
      "email": "Iyersamir@gmail.com",
      "availableLanguage": ["English", "Dutch"]
    },
    "sameAs": [
      "https://twitter.com/cryptomuseum",
      "https://linkedin.com/company/cryptomuseum",
      "https://facebook.com/cryptomuseum"
    ],
    "knowsAbout": [
      "Cryptocurrency",
      "Blockchain Technology",
      "Digital Currency Education",
      "Cryptocurrency Safety",
      "Bitcoin",
      "Digital Wallet Security",
      "Cryptocurrency for Beginners"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Netherlands"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Netherlands"
    }
  };

  // Event Schema for exhibitions and workshops
  const eventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Interactive Cryptocurrency Education Experience",
    "description": "Hands-on cryptocurrency and blockchain learning experience featuring interactive exhibits, trading simulators, and safety training workshops.",
    "startDate": "2025-06-01T10:00:00+02:00",
    "endDate": "2025-12-31T18:00:00+02:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "CryptoMuseum",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NL",
        "addressLocality": "Amsterdam",
        "addressRegion": "North Holland"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "CryptoMuseum",
      "url": "https://www.reallybigappologytodadmusuem.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "15",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-06-01"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": ["Families", "Students", "Crypto Enthusiasts", "Beginners"]
    }
  };

  // FAQ Schema for common questions
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is CryptoMuseum?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CryptoMuseum is the world's first cryptocurrency museum featuring interactive exhibits, hands-on blockchain learning, and crypto safety education. We make cryptocurrency understandable and accessible for everyone through immersive educational experiences."
        }
      },
      {
        "@type": "Question",
        "name": "Is CryptoMuseum suitable for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! CryptoMuseum is designed specifically for beginners and families. Our interactive exhibits make complex cryptocurrency concepts easy to understand through hands-on learning and visual demonstrations."
        }
      },
      {
        "@type": "Question",
        "name": "What can visitors learn at CryptoMuseum?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visitors can learn about cryptocurrency basics, blockchain technology, digital wallet security, trading fundamentals, crypto scam prevention, and the future of digital money through interactive exhibits and educational workshops."
        }
      },
      {
        "@type": "Question",
        "name": "Where is CryptoMuseum located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CryptoMuseum is planned to be located in Amsterdam, Netherlands. The exact address will be announced closer to our opening date in 2025."
        }
      },
      {
        "@type": "Question",
        "name": "Is CryptoMuseum family-friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! CryptoMuseum offers age-appropriate cryptocurrency education programs designed for families and children. Our interactive exhibits make learning about digital money fun and engaging for all ages."
        }
      }
    ]
  };

  // Educational Organization Schema
  const educationalData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "CryptoMuseum Educational Program",
    "description": "Comprehensive cryptocurrency and blockchain education programs for all ages, from beginners to professionals.",
    "url": "https://www.reallybigappologytodadmusuem.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL",
      "addressLocality": "Amsterdam",
      "addressRegion": "North Holland"
    },
    "educationalCredentialAwarded": "Cryptocurrency Literacy Certificate",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Educational Programs",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Cryptocurrency Basics for Beginners",
          "description": "Introduction to cryptocurrency, blockchain technology, and digital wallet basics"
        },
        {
          "@type": "Course",
          "name": "Cryptocurrency Security and Safety",
          "description": "Learn about wallet security, scam prevention, and safe trading practices"
        },
        {
          "@type": "Course",
          "name": "Blockchain Technology Fundamentals",
          "description": "Understanding how blockchain works through hands-on demonstrations and interactive exhibits"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalData) }}
      />
    </>
  );
}
