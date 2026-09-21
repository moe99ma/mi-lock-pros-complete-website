import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { phoneHref, siteConfig } from '@/lib/site-config';
import { vehicleKeyServices, vehicleMakes } from '@/lib/vehicle-makes';

export const metadata: Metadata = {
  title: 'Cars We Make Keys For | Vehicle Key Guide',
  description: 'Explore vehicle makes and model families MI Lock Pros may support for car key replacement, key duplication, fob programming, and smart-key service in Southeast Michigan. Call to confirm your exact vehicle.',
  keywords: ['cars we make keys for', 'car key replacement vehicles', 'key fob programming makes and models', 'Southeast Michigan automotive locksmith'],
  alternates: { canonical: '/vehicles' },
  openGraph: {
    type: 'website',
    title: 'Cars We Make Keys For | MI Lock Pros',
    description: 'Browse vehicle makes and model families, then call MI Lock Pros to confirm your exact year and key system.',
    url: '/vehicles',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Cars We Make Keys For | MI Lock Pros',
    description: 'Browse vehicle makes and call to confirm your exact year, model, and key system.',
    images: [],
  },
};

export default function VehiclesPage() {
  const pageUrl = `${siteConfig.siteUrl}/vehicles`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#vehicle-makes`,
        name: 'Vehicle makes MI Lock Pros can check for car key service',
        itemListElement: vehicleMakes.map((make, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: make.name,
          url: `${siteConfig.siteUrl}/vehicles/${make.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Vehicle Key Guide', item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main className="vehicle-main" id="main-content">
        <section className="vehicle-index-hero section-shell">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Vehicle Key Guide</span></nav>
          <p className="eyebrow"><span /> Automotive key coverage</p>
          <h1>Cars we make <em>keys for.</em></h1>
          <p>Choose a vehicle make to see model families and the automotive key services MI Lock Pros can check for your car, SUV, van, or truck.</p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href={phoneHref()}>Call {siteConfig.phone} <span aria-hidden="true">↗</span></a>
            <Link className="button button-secondary button-large" href="/#request-service">Request Service</Link>
          </div>
        </section>

        <aside className="vehicle-confirm section-shell" aria-label="Vehicle compatibility notice">
          <span className="vehicle-confirm-icon" aria-hidden="true">!</span>
          <div>
            <strong>Call to confirm your exact vehicle before scheduling.</strong>
            <p>Coverage varies by model year, trim, key system, immobilizer, available parts, and programming procedure. This guide is not a guarantee and may not include every vehicle we can service. Call with the year, make, model, VIN if available, and whether all keys are lost.</p>
          </div>
          <a href={phoneHref()}>Call now <span aria-hidden="true">↗</span></a>
        </aside>

        <section className="vehicle-directory section-shell" aria-labelledby="vehicle-directory-title">
          <div className="vehicle-section-heading">
            <div>
              <p className="eyebrow"><span /> Select a manufacturer</p>
              <h2 id="vehicle-directory-title">Tap a logo to view model families.</h2>
            </div>
            <p>These manufacturer pages are a starting point for a compatibility check. We will confirm the exact vehicle and key before any work begins.</p>
          </div>
          <div className="vehicle-logo-grid">
            {vehicleMakes.map((make) => (
              <Link className="vehicle-logo-card" href={`/vehicles/${make.slug}`} key={make.slug} aria-label={`View ${make.name} key service information`}>
                <span className="vehicle-logo-frame"><Image src={make.logoUrl} alt={make.logoAlt} width={180} height={100} sizes="(max-width: 680px) 38vw, (max-width: 1020px) 24vw, 155px" /></span>
                <span className="vehicle-logo-copy"><strong>{make.name}</strong><small>{make.models.length} model families listed</small></span>
                <span className="vehicle-card-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <p className="vehicle-trademark-note">Manufacturer names and logos are trademarks of their respective owners. They are used only to identify vehicle makes. MI Lock Pros is an independent locksmith and is not affiliated with or endorsed by these manufacturers.</p>
        </section>

        <section className="vehicle-services section-shell" aria-labelledby="vehicle-services-title">
          <div className="vehicle-section-heading">
            <div><p className="eyebrow"><span /> Vehicle key services</p><h2 id="vehicle-services-title">Key help for supported vehicles.</h2></div>
            <p>Available options depend on the exact vehicle and the current key situation.</p>
          </div>
          <div className="vehicle-service-grid">
            {vehicleKeyServices.map((service) => (
              <Link href={`/services/automotive-locksmith/${service.slug}`} key={service.slug}>
                <small>Automotive</small><strong>{service.name}</strong><p>{service.description}</p><span aria-hidden="true">Explore service ↗</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  );
}
