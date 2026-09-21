import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { getRelatedServices, getServiceDetail, serviceDetails } from '@/lib/service-details';
import { phoneHref, serviceAreaCounties, siteConfig } from '@/lib/site-config';

type ServiceDetailPageProps = {
  params: Promise<{ slug: string; serviceSlug: string }>;
};

export function generateStaticParams() {
  return serviceDetails.map((item) => ({ slug: item.categorySlug, serviceSlug: item.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug, serviceSlug } = await params;
  const record = getServiceDetail(slug, serviceSlug);
  if (!record) return {};

  const { detail, summary } = record;
  const path = `/services/${slug}/${serviceSlug}`;
  const title = `${detail.name} in Southeast Michigan`;
  const description = `${summary.description} Mobile service from MI Lock Pros in Ann Arbor, Detroit, and communities across Southeast Michigan.`;

  return {
    title,
    description,
    keywords: detail.keywords,
    alternates: { canonical: path },
    openGraph: { type: 'website', title: `${title} | MI Lock Pros`, description, url: path, images: [] },
    twitter: { card: 'summary', title: `${title} | MI Lock Pros`, description, images: [] },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug, serviceSlug } = await params;
  const record = getServiceDetail(slug, serviceSlug);
  if (!record) notFound();

  const { detail, category, summary } = record;
  const related = getRelatedServices(category.slug, detail.slug);
  const pageUrl = `${siteConfig.siteUrl}/services/${category.slug}/${detail.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: detail.name,
        serviceType: detail.name,
        url: pageUrl,
        description: summary.description,
        provider: { '@id': `${siteConfig.siteUrl}/#business` },
        areaServed: serviceAreaCounties.map((name) => ({ '@type': 'AdministrativeArea', name })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Locksmith Services', item: `${siteConfig.siteUrl}/#services` },
          { '@type': 'ListItem', position: 3, name: category.title, item: `${siteConfig.siteUrl}/services/${category.slug}` },
          { '@type': 'ListItem', position: 4, name: detail.name, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: detail.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
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
            <Link href="/">Home</Link><span>/</span><Link href="/#services">Services</Link><span>/</span>
            <Link href={`/services/${category.slug}`}>{category.shortTitle}</Link><span>/</span>
            <span aria-current="page">{detail.name}</span>
          </nav>
          <div className="service-detail-hero-grid">
            <div className="service-detail-hero-copy">
              <p className="eyebrow"><span /> {category.title}</p>
              <h1>{detail.name} in <em>Southeast Michigan.</em></h1>
              <p>{detail.intro}</p>
              <div className="hero-actions">
                <a className="button button-primary button-large" href={phoneHref()}>Call {siteConfig.phone} <span aria-hidden="true">↗</span></a>
                <Link className="button button-secondary button-large" href="/#request-service">Request a Quote</Link>
              </div>
            </div>
            <aside className="service-detail-facts" aria-label="Service facts">
              <div><small>Availability</small><strong>{siteConfig.businessHours}</strong></div>
              <div><small>Service model</small><strong>Mobile—we come to you</strong></div>
              <div><small>Coverage</small><strong>{siteConfig.serviceArea}</strong></div>
              <div><small>Pricing</small><strong>Quote confirmed before work</strong></div>
            </aside>
          </div>
          <div className="service-detail-assurance" aria-label="MI Lock Pros assurances">
            <span>Insured</span><span>Background-checked technicians</span><span>Authorization verified</span>
          </div>
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

        <section className="service-detail-process section-shell" aria-labelledby="detail-process-title">
          <div className="service-detail-section-heading">
            <p className="eyebrow"><span /> How it works</p>
            <h2 id="detail-process-title">From first call to final check.</h2>
            <p>The exact work depends on the lock, key, door, or vehicle. These steps show the typical service path without promising a result before the job is assessed.</p>
          </div>
          <ol>
            {detail.process.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{step.title}</strong><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="service-quote section-shell" aria-labelledby="service-quote-title">
          <div>
            <p className="eyebrow"><span /> Request a quote</p>
            <h2 id="service-quote-title">Know the approved price before work begins.</h2>
          </div>
          <div className="service-quote-card">
            <p>{detail.quoteNote}</p>
            <div>
              <span><small>Direct call</small><a href={phoneHref()}>{siteConfig.phone}</a></span>
              <span><small>Service area</small><strong>{siteConfig.serviceArea}</strong></span>
              <span><small>Estimate</small><strong>Confirmed before work</strong></span>
            </div>
            <div className="service-quote-actions">
              <a className="button button-primary" href={phoneHref()}>Call Now <span aria-hidden="true">↗</span></a>
              <Link className="button button-secondary" href="/#request-service">Request This Service</Link>
            </div>
          </div>
        </section>

        <section className="service-detail-faq section-shell" aria-labelledby="service-detail-faq-title">
          <div className="faq-intro">
            <p className="eyebrow"><span /> Helpful answers</p>
            <h2 id="service-detail-faq-title">Questions about {detail.name.toLowerCase()}.</h2>
            <p>Contact MI Lock Pros with the exact vehicle, key, lock, door, and ZIP-code details to confirm current service availability.</p>
          </div>
          <div className="faq-list">
            {detail.faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="service-related section-shell" aria-labelledby="related-services-title">
          <div className="service-detail-section-heading">
            <p className="eyebrow"><span /> Related services</p>
            <h2 id="related-services-title">More {category.shortTitle.toLowerCase()} locksmith help.</h2>
          </div>
          <div className="service-related-grid">
            {related.map((item) => (
              <Link href={`/services/${category.slug}/${item.slug}`} key={item.slug}>
                <small>{category.code}</small><strong>{item.name}</strong><span aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link href={`/services/${category.slug}`}>
              <small>All services</small><strong>Explore {category.title}</strong><span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  );
}
