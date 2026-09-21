import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { getRelatedServices, getServiceDetail } from '@/lib/service-details';
import { getServiceAreaBySlug, phoneHref, siteConfig } from '@/lib/site-config';

type LocalServicePageProps = {
  params: Promise<{ slug: string; categorySlug: string; serviceSlug: string }>;
};

export async function generateMetadata({ params }: LocalServicePageProps): Promise<Metadata> {
  const { slug, categorySlug, serviceSlug } = await params;
  const area = getServiceAreaBySlug(slug);
  const record = getServiceDetail(categorySlug, serviceSlug);
  if (!area || !record) return {};

  const { detail, category, summary } = record;
  const title = `${detail.name} in ${area.name}, Michigan`;
  const description = `${summary.description} Request mobile ${category.shortTitle.toLowerCase()} locksmith service in ${area.name}, Michigan, and call MI Lock Pros to confirm current coverage and compatibility.`;

  return {
    title,
    description,
    keywords: [
      `${detail.name} ${area.name} MI`,
      `${detail.name} in ${area.name}`,
      `${category.shortTitle.toLowerCase()} locksmith ${area.name}`,
      `mobile locksmith ${area.name} Michigan`,
      ...detail.keywords.map((keyword) => `${keyword} ${area.name}`),
    ],
    alternates: { canonical: `/service-areas/${area.slug}` },
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
    openGraph: { type: 'website', title: `${title} | MI Lock Pros`, description, images: [] },
    twitter: { card: 'summary', title: `${title} | MI Lock Pros`, description, images: [] },
  };
}

export default async function LocalServicePage({ params }: LocalServicePageProps) {
  const { slug, categorySlug, serviceSlug } = await params;
  const area = getServiceAreaBySlug(slug);
  const record = getServiceDetail(categorySlug, serviceSlug);
  if (!area || !record) notFound();

  const { detail, category, summary } = record;
  const related = getRelatedServices(category.slug, detail.slug);
  const pageUrl = `${siteConfig.siteUrl}/service-areas/${area.slug}/services/${category.slug}/${detail.slug}`;
  const cityPageUrl = `${siteConfig.siteUrl}/service-areas/${area.slug}`;
  const localFaqs = [
    ...detail.faqs,
    {
      question: `Can I request ${detail.name.toLowerCase()} in ${area.name}?`,
      answer: `${area.name} is included in the listed MI Lock Pros mobile service area. Call with the exact ZIP code and job details so current coverage, technician availability, and any vehicle or hardware compatibility can be confirmed.`,
    },
    {
      question: `Does MI Lock Pros have a storefront in ${area.name}?`,
      answer: `No separate storefront is claimed in ${area.name}. MI Lock Pros is a mobile locksmith company based in Ann Arbor and serving Detroit and listed communities across Southeast Michigan.`,
    },
  ];
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `${detail.name} in ${area.name}, Michigan`,
        serviceType: detail.name,
        url: pageUrl,
        description: summary.description,
        provider: { '@id': `${siteConfig.siteUrl}/#business` },
        areaServed: { '@type': 'AdministrativeArea', name: `${area.name}, Michigan` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Service Area', item: `${siteConfig.siteUrl}/service-area` },
          { '@type': 'ListItem', position: 3, name: area.name, item: cityPageUrl },
          { '@type': 'ListItem', position: 4, name: detail.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main className="service-main service-detail-main" id="main-content">
        <section className="service-detail-hero section-shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/service-area">Service Area</Link><span>/</span>
            <Link href={`/service-areas/${area.slug}`}>{area.name}</Link><span>/</span>
            <span aria-current="page">{detail.name}</span>
          </nav>
          <div className="service-detail-hero-grid">
            <div className="service-detail-hero-copy">
              <p className="eyebrow"><span /> {category.title} in {area.name}</p>
              <h1>{detail.name} in <em>{area.name}, Michigan.</em></h1>
              <p>{detail.intro} Mobile service can be requested in {area.name}; call with the exact location and job details so current coverage and compatibility can be confirmed.</p>
              <div className="hero-actions">
                <a className="button button-primary button-large" href={phoneHref()}>Call {siteConfig.phone} <span aria-hidden="true">↗</span></a>
                <Link className="button button-secondary button-large" href="/#request-service">Request This Service</Link>
              </div>
            </div>
            <aside className="service-detail-facts" aria-label={`${detail.name} service facts for ${area.name}`}>
              <div><small>Service area</small><strong>{area.name}, Michigan</strong></div>
              <div><small>Service model</small><strong>Mobile—we come to you</strong></div>
              <div><small>Availability</small><strong>Call to confirm your ZIP code</strong></div>
              <div><small>Pricing</small><strong>Quote confirmed before work</strong></div>
            </aside>
          </div>
          <div className="service-detail-assurance" aria-label="MI Lock Pros assurances">
            <span>Insured</span><span>Background-checked technicians</span><span>Mobile service in {area.name}</span>
          </div>
          <p className="location-disclosure"><strong>Mobile service area:</strong> This page shows {detail.name.toLowerCase()} information for customers requesting mobile service in {area.name}. It does not represent a separate MI Lock Pros storefront or office in the community.</p>
        </section>

        <section className="service-detail-overview section-shell">
          <div className="service-detail-list-block">
            <p className="eyebrow"><span /> When this service may help</p>
            <h2>Common reasons customers call.</h2>
            <ul className="service-check-list service-check-list-need">
              {detail.whenNeeded.map((item) => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}
            </ul>
          </div>
          <div className="service-detail-list-block">
            <p className="eyebrow"><span /> What is included</p>
            <h2>A clear, professional service.</h2>
            <ul className="service-check-list">
              {detail.included.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="service-detail-process section-shell" aria-labelledby="local-service-process-title">
          <div className="service-detail-section-heading">
            <p className="eyebrow"><span /> How it works</p>
            <h2 id="local-service-process-title">From your first call to the final check.</h2>
            <p>The exact work depends on the vehicle, lock, key, door, and location. These steps describe the typical process without promising a result before the job is assessed.</p>
          </div>
          <ol>
            {detail.process.map((step, index) => (
              <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{step.title}</strong><p>{step.description}</p></div></li>
            ))}
          </ol>
        </section>

        <section className="service-quote section-shell" aria-labelledby="local-service-quote-title">
          <div><p className="eyebrow"><span /> Request service in {area.name}</p><h2 id="local-service-quote-title">Confirm the location, service, and price.</h2></div>
          <div className="service-quote-card">
            <p>{detail.quoteNote}</p>
            <div>
              <span><small>Direct call</small><a href={phoneHref()}>{siteConfig.phone}</a></span>
              <span><small>Requested area</small><strong>{area.name}, Michigan</strong></span>
              <span><small>Estimate</small><strong>Confirmed before work</strong></span>
            </div>
            <div className="service-quote-actions"><a className="button button-primary" href={phoneHref()}>Call Now <span aria-hidden="true">↗</span></a><Link className="button button-secondary" href="/#request-service">Request This Service</Link></div>
          </div>
        </section>

        <section className="service-detail-faq section-shell" aria-labelledby="local-service-faq-title">
          <div className="faq-intro"><p className="eyebrow"><span /> Helpful answers</p><h2 id="local-service-faq-title">Questions about {detail.name.toLowerCase()} in {area.name}.</h2><p>Call with the exact ZIP code and service details so current mobile coverage can be confirmed.</p></div>
          <div className="faq-list">
            {localFaqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}
          </div>
        </section>

        <section className="service-related section-shell" aria-labelledby="local-related-services-title">
          <div className="service-detail-section-heading"><p className="eyebrow"><span /> More services in {area.name}</p><h2 id="local-related-services-title">Related {category.shortTitle.toLowerCase()} locksmith help.</h2></div>
          <div className="service-related-grid">
            {related.map((item) => (
              <Link href={`/service-areas/${area.slug}/services/${category.slug}/${item.slug}`} key={item.slug}><small>{area.name}</small><strong>{item.name}</strong><span aria-hidden="true">↗</span></Link>
            ))}
            <Link href={`/service-areas/${area.slug}#location-services-title`}><small>All local services</small><strong>View locksmith services in {area.name}</strong><span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  );
}
