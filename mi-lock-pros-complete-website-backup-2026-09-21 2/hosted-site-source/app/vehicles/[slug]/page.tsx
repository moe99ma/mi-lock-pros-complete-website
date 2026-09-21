import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { phoneHref, serviceAreaCounties, siteConfig } from '@/lib/site-config';
import { getVehicleMake, vehicleKeyServices, vehicleMakes } from '@/lib/vehicle-makes';

type VehicleMakePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return vehicleMakes.map((make) => ({ slug: make.slug }));
}

export async function generateMetadata({ params }: VehicleMakePageProps): Promise<Metadata> {
  const { slug } = await params;
  const make = getVehicleMake(slug);
  if (!make) return {};

  const path = `/vehicles/${make.slug}`;
  const title = `${make.name} Key Replacement & Programming`;
  const description = `See ${make.name} model families MI Lock Pros can check for car key replacement, spare keys, fob programming, and smart-key service in Southeast Michigan. Call to confirm the exact year and key system.`;

  return {
    title,
    description,
    keywords: [`${make.name} key replacement`, `${make.name} key fob programming`, `${make.name} spare key`, `${make.name} locksmith Southeast Michigan`],
    alternates: { canonical: path },
    openGraph: { type: 'website', title: `${title} | MI Lock Pros`, description, url: path, images: [] },
    twitter: { card: 'summary', title: `${title} | MI Lock Pros`, description, images: [] },
  };
}

export default async function VehicleMakePage({ params }: VehicleMakePageProps) {
  const { slug } = await params;
  const make = getVehicleMake(slug);
  if (!make) notFound();

  const pageUrl = `${siteConfig.siteUrl}/vehicles/${make.slug}`;
  const makeArticle = /^[AEIOU]/i.test(make.name) ? 'an' : 'a';
  const faqs = [
    {
      question: `Can MI Lock Pros make a key for every ${make.name} model and year?`,
      answer: `No single list can guarantee every ${make.name} vehicle. Key systems can change by year, trim, market, immobilizer, and installed equipment. Call with the exact vehicle details so compatibility can be checked.`,
    },
    {
      question: `What information should I provide for ${makeArticle} ${make.name} key?`,
      answer: 'Provide the year, exact model, VIN if available, key or fob style, whether a working key remains, and whether the vehicle uses a turn-key or push-button start.',
    },
    {
      question: 'Can you help when every key is lost?',
      answer: 'All-keys-lost service is available for many supported vehicles, but the procedure, parts, and authorization requirements vary. Call to confirm the exact vehicle and service options.',
    },
  ];
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `${make.name} car key replacement and programming`,
        serviceType: 'Automotive locksmith service',
        url: pageUrl,
        description: make.summary,
        provider: { '@id': `${siteConfig.siteUrl}/#business` },
        areaServed: serviceAreaCounties.map((name) => ({ '@type': 'AdministrativeArea', name })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Vehicle Key Guide', item: `${siteConfig.siteUrl}/vehicles` },
          { '@type': 'ListItem', position: 3, name: make.name, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main className="vehicle-main vehicle-make-main" id="main-content">
        <section className="vehicle-make-hero section-shell">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/vehicles">Vehicle Key Guide</Link><span>/</span><span aria-current="page">{make.name}</span></nav>
          <div className="vehicle-make-hero-grid">
            <div>
              <p className="eyebrow"><span /> Automotive locksmith</p>
              <h1>{make.name} key replacement <em>&amp; programming.</em></h1>
              <p>{make.summary} Exact compatibility must be confirmed before service.</p>
              <div className="hero-actions">
                <a className="button button-primary button-large" href={phoneHref()}>Call {siteConfig.phone} <span aria-hidden="true">↗</span></a>
                <Link className="button button-secondary button-large" href="/#request-service">Request Service</Link>
              </div>
            </div>
            <div className="vehicle-make-logo"><Image src={make.logoUrl} alt={make.logoAlt} width={300} height={170} sizes="(max-width: 1020px) 70vw, 280px" priority /></div>
          </div>
        </section>

        <aside className="vehicle-confirm section-shell" aria-label="Vehicle compatibility notice">
          <span className="vehicle-confirm-icon" aria-hidden="true">!</span>
          <div>
            <strong>Please call to confirm this exact {make.name}.</strong>
            <p>The models below are a non-exhaustive guide, not a guarantee of service. Availability depends on the model year, trim, key system, immobilizer, parts, software, and current key situation.</p>
          </div>
          <a href={phoneHref()}>Check my vehicle <span aria-hidden="true">↗</span></a>
        </aside>

        <section className="vehicle-models section-shell" aria-labelledby="vehicle-models-title">
          <div className="vehicle-section-heading">
            <div><p className="eyebrow"><span /> Models to ask us about</p><h2 id="vehicle-models-title">Common {make.name} model families.</h2></div>
            <p>This list may not include every supported vehicle. A listed model can also use different key systems in different years.</p>
          </div>
          <ul className="vehicle-model-grid">
            {make.models.map((model) => <li key={model}><span aria-hidden="true">✓</span><strong>{model}</strong><small>Call to confirm year and key</small></li>)}
          </ul>
        </section>

        <section className="vehicle-services section-shell" aria-labelledby="make-services-title">
          <div className="vehicle-section-heading">
            <div><p className="eyebrow"><span /> Available key services</p><h2 id="make-services-title">Options for supported {make.name} vehicles.</h2></div>
            <p>The correct service is determined after the vehicle, key system, and current key situation are reviewed.</p>
          </div>
          <div className="vehicle-service-grid">
            {vehicleKeyServices.map((service) => (
              <Link href={`/services/automotive-locksmith/${service.slug}`} key={service.slug}>
                <small>{make.name}</small><strong>{service.name}</strong><p>{service.description}</p><span aria-hidden="true">Explore service ↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="vehicle-call-prep section-shell" aria-labelledby="vehicle-call-prep-title">
          <div><p className="eyebrow"><span /> Before you call</p><h2 id="vehicle-call-prep-title">Information that helps us check compatibility.</h2></div>
          <ol>
            <li><span>01</span><div><strong>Year, make, and exact model</strong><p>Vehicle systems often change between model years and trim levels.</p></div></li>
            <li><span>02</span><div><strong>VIN, if available</strong><p>The VIN can help identify the vehicle and compatible key system. Do not post it publicly.</p></div></li>
            <li><span>03</span><div><strong>Your current key situation</strong><p>Tell us whether all keys are lost, one key still works, or a replacement fob needs programming.</p></div></li>
            <li><span>04</span><div><strong>Key and ignition style</strong><p>Let us know whether the vehicle uses a blade key, remote-head key, fobik, or push-button start.</p></div></li>
          </ol>
        </section>

        <section className="service-detail-faq section-shell" aria-labelledby="vehicle-faq-title">
          <div className="faq-intro"><p className="eyebrow"><span /> Helpful answers</p><h2 id="vehicle-faq-title">Questions about {make.name} keys.</h2><p>A brief phone check helps prevent the wrong key or service from being scheduled.</p></div>
          <div className="faq-list">
            {faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}
          </div>
        </section>

        <section className="vehicle-final-cta section-shell">
          <div><p className="eyebrow"><span /> Confirm your vehicle</p><h2>Call before you schedule.</h2><p>Share the vehicle details and MI Lock Pros will check current service and parts availability.</p></div>
          <div className="hero-actions"><a className="button button-primary button-large" href={phoneHref()}>Call {siteConfig.phone} <span aria-hidden="true">↗</span></a><Link className="button button-secondary button-large" href="/vehicles">View All Makes</Link></div>
        </section>
        <p className="vehicle-trademark-note section-shell">{make.name} names and logos are trademarks of their respective owners and are used only for vehicle identification. MI Lock Pros is an independent locksmith and is not affiliated with or endorsed by the manufacturer.</p>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  );
}
