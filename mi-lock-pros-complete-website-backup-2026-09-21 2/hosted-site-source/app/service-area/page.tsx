import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { featuredServiceAreas, phoneHref, serviceAreaCounties, serviceAreaGroups, serviceAreaNames, serviceAreaSlug, serviceCategories, siteConfig } from '@/lib/site-config';

const pageUrl = `${siteConfig.siteUrl}/service-area`;
const description = `MI Lock Pros serves ${serviceAreaNames.length} listed communities across Wayne, Oakland, Macomb, Washtenaw, Livingston, and Monroe counties in Southeast Michigan.`;

export const metadata: Metadata = {
  title: 'Locksmith Service Area in Southeast Michigan',
  description,
  alternates: { canonical: '/service-area' },
  openGraph: {
    type: 'website',
    title: 'Locksmith Service Area in Southeast Michigan | MI Lock Pros',
    description,
    url: '/service-area',
    images: [{ url: '/og-gold.png', width: 1200, height: 630, alt: 'MI Lock Pros Southeast Michigan locksmith service area' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Locksmith Service Area in Southeast Michigan | MI Lock Pros',
    description,
    images: ['/og-gold.png'],
  },
};

export default function ServiceAreaPage() {
  const businessId = `${siteConfig.siteUrl}/#business`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'Locksmith'],
        '@id': businessId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.siteUrl,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        areaServed: serviceAreaNames.map((name) => ({ '@type': 'Place', name })),
        openingHours: 'Mo-Su 00:00-23:59',
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'MI Lock Pros Southeast Michigan Service Area',
        description,
        isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
        about: { '@id': businessId },
        mainEntity: {
          '@type': 'Service',
          name: 'Locksmith services in Southeast Michigan',
          provider: { '@id': businessId },
          areaServed: serviceAreaCounties.map((name) => ({ '@type': 'AdministrativeArea', name })),
        },
      },
      {
        '@type': 'ItemList',
        name: 'MI Lock Pros service areas',
        numberOfItems: serviceAreaNames.length,
        itemListElement: serviceAreaNames.map((name, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: { '@type': 'Place', name },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Service Area', item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main className="service-main" id="main-content">
        <section className="service-hero section-shell">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Service Area</span></nav>
          <p className="eyebrow"><span /> Southeast Michigan coverage</p>
          <h1>Locksmith service across <em>Southeast Michigan.</em></h1>
          <p>MI Lock Pros provides automotive, residential, and commercial locksmith services across {serviceAreaCounties.join(', ')}. Coverage includes {featuredServiceAreas.join(', ')}, and neighboring communities.</p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href={phoneHref()}>Call {siteConfig.phone} <span>↗</span></a>
            <Link className="button button-secondary button-large" href="/#request-service">Request Service</Link>
          </div>
        </section>

        <section className="coverage section-shell" aria-labelledby="service-area-title">
          <div className="coverage-header">
            <div className="section-heading">
              <p className="eyebrow"><span /> Coverage directory</p>
              <h2 id="service-area-title">Find your community.</h2>
              <p>{serviceAreaNames.length} supplied service areas are organized below. Contact MI Lock Pros to confirm service for your exact ZIP code or address.</p>
            </div>
            <div className="coverage-stat" aria-label={`${serviceAreaNames.length} listed service areas`}><strong>{serviceAreaNames.length}</strong><span>listed service areas</span></div>
          </div>
          <div className="coverage-panel">
            <figure className="coverage-map">
              <Image src="/service-area-map.svg" alt="Map of MI Lock Pros service communities across Southeast Michigan" width={1000} height={760} />
              <figcaption>Gold boundaries show the areas supplied by MI Lock Pros. The map is an orientation guide; contact us to confirm an exact location.</figcaption>
            </figure>
            <div className="area-directory">
              <div className="area-directory-top"><div><small>Southeast Michigan</small><strong>Service-area directory</strong></div><span>{siteConfig.businessHours}</span></div>
              <div className="area-groups">
                {serviceAreaGroups.map((group) => (
                  <details key={group.name} open>
                    <summary><span>{group.name}</span><small>{group.areas.length} areas</small><b aria-hidden="true">+</b></summary>
                    <ul>{group.areas.map((area) => <li key={area}><Link href={`/service-areas/${serviceAreaSlug(area)}`}>{area}</Link></li>)}</ul>
                  </details>
                ))}
              </div>
              <div className="coverage-cta"><p>Need help confirming your location?</p><Link className="button button-primary" href="/#request-service">Send your ZIP code <span aria-hidden="true">↗</span></Link></div>
            </div>
          </div>
        </section>

        <section className="service-guide section-shell">
          <div><p className="eyebrow"><span /> Local service information</p><h2>Coverage without guesswork.</h2></div>
          <div className="service-guide-card">
            <p>MI Lock Pros serves listed communities throughout Southeast Michigan for automotive, residential, and commercial locksmith needs.</p>
            <p>Being listed does not guarantee immediate availability for every job. Call or send your ZIP code so MI Lock Pros can confirm the location and discuss the service needed.</p>
          </div>
        </section>

        <section className="service-next section-shell">
          <p className="eyebrow"><span /> Locksmith services</p>
          <div>{serviceCategories.map((category) => <Link href={`/services/${category.slug}`} key={category.id}><span>{category.code}</span><strong>{category.title}</strong><b aria-hidden="true">↗</b></Link>)}</div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  );
}
