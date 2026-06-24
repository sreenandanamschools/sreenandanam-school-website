import Script from "next/script";

export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "School",
    "name": "Sree Nandanam Public School",
    "alternateName": "Sree Nandanam Schools",
    "url": "https://sreenandanamschools.com",
    "logo": "https://sreenandanamschools.com/images/logo.png",
    "image": "https://sreenandanamschools.com/images/hero-school.jpg",
    "description": "Sree Nandanam Public School offers high-quality primary and upper primary English medium education in Parassala, Thiruvananthapuram, Kerala. Established in 2008, we provide modern digital learning labs, experienced educators, and holistic child development.",
    "foundingDate": "2008",
    "address": [
      {
        "@type": "PostalAddress",
        "name": "Sree Nandanam Schools (Primary Campus)",
        "streetAddress": "Near KSRTC Depot, Kurumkutty",
        "addressLocality": "Parassala, Thiruvananthapuram",
        "addressRegion": "Kerala",
        "postalCode": "695502",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "name": "Sree Nandanam Kindergarten",
        "streetAddress": "Near Mahadeva Temple",
        "addressLocality": "Parassala, Thiruvananthapuram",
        "addressRegion": "Kerala",
        "postalCode": "695502",
        "addressCountry": "IN"
      }
    ],
    "telephone": "+91 97454 33356",
    "email": "sreenandadnamschools@gmail.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-97454-33356",
      "contactType": "Admissions",
      "email": "sreenandadnamschools@gmail.com",
      "areaServed": "IN",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/SreeNandanamPublicSchool"
    ]
  };

  return (
    <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  );
}
