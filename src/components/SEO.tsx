export default function SEO() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://edin.live'

  // Person Schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Edin',
    jobTitle: 'Web Developer & AI Specialist',
    url: siteUrl,
    image: `${siteUrl}/images/og.png`,
    sameAs: [
      'https://facebook.com',
      'https://linkedin.com',
      'https://twitter.com',
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'AI Development',
      'Web Design',
      'SEO',
    ],
  }

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Edin Live',
    url: siteUrl,
    logo: `${siteUrl}/images/glavni.png`,
    description: 'Premium Web Design, Development & AI Integration Services',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'HR',
    },
    sameAs: [
      'https://facebook.com',
      'https://linkedin.com',
      'https://twitter.com',
    ],
  }

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development',
    provider: {
      '@type': 'Person',
      name: 'Edin',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    description: 'Premium Web Design, Development & AI Integration Services',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Edin Live',
    url: siteUrl,
    description: 'Premium Web Design, Development & AI Integration Services',
    publisher: {
      '@type': 'Person',
      name: 'Edin',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

