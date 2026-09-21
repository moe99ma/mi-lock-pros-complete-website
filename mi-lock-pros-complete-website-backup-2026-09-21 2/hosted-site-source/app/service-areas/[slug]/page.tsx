import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import {
  getNearbyServiceAreas,
  getServiceAreaBySlug,
  phoneHref,
  serviceAreaRecords,
  serviceCategories,
  serviceSlug,
  siteConfig,
} from '@/lib/site-config';

type ServiceAreaPageProps = { params: Promise<{ slug: string }> };

function pageDescription(areaName: string) {
  return `Mobile locksmith service in ${areaName}, Michigan for car lockouts, car keys, home lockouts, rekeying, lock changes, smart locks, and commercial door locks.`;
}

export function generateStaticParams() {
  return serviceAreaRecords.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: ServiceAreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) return {};

  const title = `${area.name}, MI Locksmith`;
  const description = pageDescription(area.name);
  const path = `/service-areas/${area.slug}`;

  return {
    title,
    description,
    keywords: [
      `locksmith ${area.name} MI`,
      `car locksmith ${area.name}`,
      `residential locksmith ${area.name}`,
      `commercial locksmith ${area.name}`,
      `car key programming ${area.name}`,
      `lock rekey ${area.name}`,
      `lost car key ${area.name}`,
      `home lockout ${area.name}`,
      `smart lock installation ${area.name}`,
      `commercial door locks ${area.name}`,
    ],
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: `${title} | MI Lock Pros`,
      description,
      url: path,
      images: [],
    },
    twitter: {
      card: 'summary',
      title: `${title} | MI Lock Pros`,
      description,
      images: [],
    },
  };
}

export default async function ServiceAreaDetailPage({ params }: ServiceAreaPageProps) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) notFound();

  const nearbyAreas = getNearbyServiceAreas(area);
  const pageUrl = `${siteConfig.siteUrl}/service-areas/${area.slug}`;
  const businessId = `${siteConfig.siteUrl}/#business`;
  const description = pageDescription(area.name);
  const areaEntity = { '@type': 'AdministrativeArea', name: `${area.name}, Michigan` };
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${area.name}, MI Locksmith | MI Lock Pros`,
        description,
        isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
        about: { '@id': businessId },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `Mobile locksmith services in ${area.name}, Michigan`,
        serviceType: 'Automotive, residential, and commercial locksmith services',
        url: pageUrl,
        description,
        provider: { '@id': businessId },
        areaServed: areaEntity,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Locksmith services available in ${area.name}`,
          itemListElement: serviceCategories.map((category) => ({
            '@type': 'OfferCatalog',
            name: category.title,
            itemListElement: category.services.map((service) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: service.name, description: service.description },
            })),
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Service Area', item: `${siteConfig.siteUrl}/service-area` },
          { '@type': 'ListItem', position: 3, name: area.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main className="service-main location-main" id="main-content">
        <section className="service-hero location-hero section-shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/service-area">Service Area</Link><span>/</span><span aria-current="page">{area.name}</span>
          </nav>
          <p className="eyebrow"><span /> Mobile service coverage</p>
          <h1>Locksmith services in <em>{area.name}, Michigan.</em></h1>
          <p>Locked out, lost a car key, or need a lock changed in {area.name}? MI Lock Pros comes to vehicles, homes, and businesses for car lockouts, car key replacement and programming, home lockouts, lock rekeying, smart lock installation, commercial lock changes, and mechanical door-hardware service. Call or send your ZIP code so we can confirm coverage.</p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href={phoneHref()}>Call {siteConfig.phone} <span aria-hidden="true">↗</span></a>
            <Link className="button button-secondary button-large" href="/#request-service">Request Service</Link>
          </div>
          <p className="location-disclosure"><strong>Mobile service area:</strong> This page describes coverage in {area.name}; it does not represent a separate MI Lock Pros storefront or office in the community.</p>
        </section>

        <section className="location-services section-shell" aria-labelledby="location-services-title">
          <div className="section-heading">
            <p className="eyebrow"><span /> Services in {area.name}</p>
            <h2 id="location-services-title">Automotive, residential, and commercial locksmith help.</h2>
            <p>Choose a service category for complete details about car keys and lockouts, home locks and rekeying, or commercial locks and mechanical door hardware in {area.name}.</p>
          </div>
          <div className="location-service-grid">
            {serviceCategories.map((category) => (
              <article className="location-service-card" key={category.id}>
                <div><small>{category.code}</small><h3>{category.title}</h3><p>{category.description}</p></div>
                <ul>{category.services.map((service) => <li key={service.name}><Link href={`/service-areas/${area.slug}/services/${category.slug}/${serviceSlug(service.name)}`}><span aria-hidden="true">+</span>{service.name}<b aria-hidden="true">↗</b></Link></li>)}</ul>
                <Link className="service-detail-link" href={`/services/${category.slug}`}>Explore {category.shortTitle.toLowerCase()} services <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="location-context section-shell">
          <div>
            <p className="eyebrow"><span /> {area.group}</p>
            <h2>Mobile coverage centered on your service location.</h2>
          </div>
          <div className="service-guide-card">
            <p>{area.regionSummary}</p>
            <p>Service availability can depend on the exact ZIP code, technician schedule, vehicle or hardware type, and parts compatibility. MI Lock Pros does not promise a specific arrival time on this page.</p>
          </div>
        </section>

        <section className="location-process section-shell" aria-labelledby="location-process-title">
          <div className="section-heading">
            <p className="eyebrow"><span /> Requesting service</p>
            <h2 id="location-process-title">What to include when you contact us.</h2>
          </div>
          <ol>
            <li><span>01</span><div><strong>Share the ZIP code</strong><p>Provide the ZIP code for the vehicle, home, or business so coverage in {area.name} can be confirmed.</p></div></li>
            <li><span>02</span><div><strong>Describe the locksmith need</strong><p>Include the service category, lock or door type, and vehicle year, make, and model when applicable.</p></div></li>
            <li><span>03</span><div><strong>Confirm authorization</strong><p>Be prepared to show that you are authorized to request entry, key, lock, or door-hardware work.</p></div></li>
          </ol>
        </section>

        <section className="location-faq section-shell" aria-labelledby="location-faq-title">
          <div className="faq-intro">
            <p className="eyebrow"><span /> {area.name} service questions</p>
            <h2 id="location-faq-title">Helpful details before you call.</h2>
          </div>
          <div className="faq-list">
            <details open><summary>Does MI Lock Pros serve {area.name}?<span aria-hidden="true">+</span></summary><p>Yes, {area.name} is included in the listed MI Lock Pros mobile service area. Contact us with the exact ZIP code and requested service so current coverage can be confirmed.</p></details>
            <details><summary>What locksmith services are available in {area.name}?<span aria-hidden="true">+</span></summary><p>Services include supported automotive keys and lockouts, residential lockouts, rekeying, lock changes and smart-lock installation, plus commercial lock, key, master-key, high-security lock, and mechanical door-hardware work.</p></details>
            <details><summary>Does this page mean there is a storefront in {area.name}?<span aria-hidden="true">+</span></summary><p>No. MI Lock Pros is a mobile locksmith company based in Ann Arbor and serving Detroit and communities across Southeast Michigan. This page identifies an area where mobile service may be available.</p></details>
          </div>
        </section>

        <section className="nearby-areas section-shell" aria-labelledby="nearby-areas-title">
          <div>
            <p className="eyebrow"><span /> Nearby coverage</p>
            <h2 id="nearby-areas-title">Other listed areas in {area.group}.</h2>
          </div>
          <div className="nearby-area-links">
            {nearbyAreas.map((nearby) => <Link href={`/service-areas/${nearby.slug}`} key={nearby.slug}>{nearby.name}<span aria-hidden="true">↗</span></Link>)}
            <Link href="/service-area">View all service areas<span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  );
}
