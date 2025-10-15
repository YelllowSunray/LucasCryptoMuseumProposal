export function SEOHead() {
  return (
    <>
      {/* Additional SEO meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      
      {/* Language and locale */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="NL-NH" />
      <meta name="geo.placename" content="Amsterdam" />
      <meta name="geo.position" content="52.3676;4.9041" />
      <meta name="ICBM" content="52.3676, 4.9041" />
      
      {/* Additional Open Graph tags */}
      <meta property="og:locale:alternate" content="nl_NL" />
      <meta property="og:site_name" content="CryptoMuseum" />
      
      {/* Twitter additional tags */}
      <meta name="twitter:domain" content="lucas-crypto-museum-proposal.vercel.app" />
      <meta name="twitter:url" content="https://www.reallybigappologytodadmusuem.com" />
      
      {/* Mobile app meta tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="CryptoMuseum" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon and app icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      
      {/* Additional structured data for better understanding */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "CryptoMuseum",
            "url": "https://www.reallybigappologytodadmusuem.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.reallybigappologytodadmusuem.com/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CryptoMuseum",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.reallybigappologytodadmusuem.com/logos/blockriselogo1.png"
              }
            }
          })
        }}
      />
    </>
  );
}
