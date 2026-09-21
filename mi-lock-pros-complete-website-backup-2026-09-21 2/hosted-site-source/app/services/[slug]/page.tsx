import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { AutomotiveWorkGallery } from '@/components/AutomotiveWorkGallery';
import { isConfigured, phoneHref, serviceAreaCounties, serviceCategories, serviceSlug, siteConfig } from '@/lib/site-config';

type ServicePageProps = { params: Promise<{ slug: string }> };

function getService(slug: string) {
  return serviceCategories.find((category) => category.slug === slug);
}

export function generateStaticParams() {
  return serviceCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getService(slug);
  if (!category) return {};

  const area = isConfigured(siteConfig.serviceArea) ? ` in ${siteConfig.serviceArea}` : '';
  const description = `${category.description} Mobile ${category.shortTitle.toLowerCase()} locksmith service${area} from MI Lock Pros.`;
  const path = `/services/${category.slug}`;

  return {
    title: `${category.title}${area}`,
    description,
    keywords: category.services.map((service) => service.name),
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: `${category.title}${area} | MI Lock Pros`,
      description,
      url: path,
      images: [],
    },
    twitter: {
      card: 'summary',
      title: `${category.title}${area} | MI Lock Pros`,
      description,
      images: [],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const category = getService(slug);
  if (!category) notFound();

  const areaCopy = isConfigured(siteConfig.serviceArea) ? ` throughout ${siteConfig.serviceArea}` : '';
  const pageUrl = `${siteConfig.siteUrl}/services/${category.slug}`;
  const businessId = `${siteConfig.siteUrl}/#business`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: category.title,
        serviceType: category.title,
        url: pageUrl,
        description: category.description,
        provider: { '@id': businessId },
        areaServed: serviceAreaCounties.map((name) => ({ '@type': 'AdministrativeArea', name })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${category.title} services`,
          itemListElement: category.services.map((service) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: service.name, description: service.description },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Locksmith Services', item: `${siteConfig.siteUrl}/#services` },
          { '@type': 'ListItem', position: 3, name: category.title, item: pageUrl },
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
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#services">Services</Link><span>/</span><span aria-current="page">{category.shortTitle}</span></nav>
          <p className="eyebrow"><span /> {category.code}</p>
          <h1>{category.title}<em>.</em></h1>
          <p>{category.heroCopy}{areaCopy ? ` Service is available${areaCopy}.` : ''}</p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href={phoneHref()}>Call {siteConfig.phone} <span>↗</span></a>
            <Link className="button button-secondary button-large" href="/#request-service">Request Service</Link>
          </div>
          <p className="service-area-link">Serving communities across Wayne, Oakland, Macomb, Washtenaw, Livingston, and Monroe counties. <Link href="/service-area">View all service areas.</Link></p>
          {category.id === 'automotive' && <p className="service-area-link">Looking for your car? <Link href="/vehicles">Browse vehicle makes and model families.</Link> Call to confirm the exact year and key system.</p>}
        </section>

        <section className="service-content section-shell">
          <div className="service-content-heading">
            <p className="eyebrow"><span /> Available services</p>
            <h2>How MI Lock Pros can help.</h2>
          </div>
          <ol className="service-detail-list">
            {category.services.map((service, index) => (
              <li key={service.name}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Link href={`/services/${category.slug}/${serviceSlug(service.name)}`}>
                  <strong>{service.name}</strong>
                  <p>{service.description}</p>
                  <b aria-hidden="true">Explore service ↗</b>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {(
          <section className="service-work section-shell" aria-labelledby="recent-automotive-work">
            <div className="work-section-heading">
              <div>
                <p className="eyebrow"><span /> Genuine MI Lock Pros work</p>
                <h2 id="recent-automotive-work">Recent {category.shortTitle.toLowerCase()} locksmith work.</h2>
              </div>
              <p>{category.id === 'automotive' ? 'Original photos from smart-key, spare-key, and key-fob programming jobs. Vehicle compatibility depends on the year, make, model, and key system.' : category.id === 'residential' ? 'Original photos of smart deadbolts, entry handlesets, and mechanical lock upgrades completed by MI Lock Pros.' : 'Original photos of storefront cylinders, keypad levers, and mechanical door-lock work completed by MI Lock Pros.'}</p>
            </div>
            <AutomotiveWorkGallery category={category.id} limit={3} />
            {category.id === 'automotive' && <div className="work-section-actions"><Link className="button button-secondary" href="/updates/automotive-key-programming">View all key programming work <span aria-hidden="true">↗</span></Link></div>}
          </section>
        )}

        <section className="service-guide section-shell">
          <div>
            <p className="eyebrow"><span /> Before you contact us</p>
            <h2>Details that help us understand the job.</h2>
          </div>
          <div className="service-guide-card">
            <p>{category.preparation}</p>
            <p>Do not send payment details, door codes, alarm codes, or other sensitive access credentials through the website form.</p>
          </div>
        </section>

        <section className="service-next section-shell">
          <p className="eyebrow"><span /> Other locksmith services</p>
          <div>
            {serviceCategories.filter((item) => item.id !== category.id).map((item) => (
              <Link href={`/services/${item.slug}`} key={item.id}><span>{item.code}</span><strong>{item.title}</strong><b aria-hidden="true">↗</b></Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  );
}
