import type { Metadata } from 'next';
import Link from 'next/link';
import { AutomotiveWorkGallery } from '@/components/AutomotiveWorkGallery';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { phoneHref, siteConfig } from '@/lib/site-config';

const pageUrl = `${siteConfig.siteUrl}/updates`;
const description = 'MI Lock Pros service stories, locksmith tips, company updates, and current offers across Southeast Michigan.';

export const metadata: Metadata = {
  title: 'Locksmith Updates & Offers',
  description,
  alternates: { canonical: '/updates' },
  openGraph: {
    type: 'website',
    title: 'Locksmith Updates & Offers | MI Lock Pros',
    description,
    url: '/updates',
    images: [{ url: '/og-gold.png', width: 1200, height: 630, alt: 'MI Lock Pros locksmith updates and offers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Locksmith Updates & Offers | MI Lock Pros',
    description,
    images: ['/og-gold.png'],
  },
};

const updateTypes = [
  { number: '01', title: 'Recent work', copy: 'Original service photos and first-hand stories from MI Lock Pros locksmith work.' },
  { number: '02', title: 'Locksmith tips', copy: 'Practical guidance about locks, keys, key fobs, rekeying, and smart locks.' },
  { number: '03', title: 'Deals & offers', copy: 'Current offers with clear dates, eligibility, limits, and important conditions.' },
  { number: '04', title: 'Service updates', copy: 'Useful business news and updates about the services MI Lock Pros provides.' },
];

export default function UpdatesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'MI Lock Pros Updates & Offers',
    description,
    isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
    about: { '@id': `${siteConfig.siteUrl}/#business` },
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main className="updates-main" id="main-content">
        <section className="updates-hero section-shell">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Updates & Offers</span></nav>
          <p className="eyebrow"><span /> From MI Lock Pros</p>
          <h1>Locksmith updates, <em>work &amp; offers.</em></h1>
          <p>MI Lock Pros uses this space for genuine service stories, useful locksmith information, company news, and current promotions across Southeast Michigan.</p>
        </section>

        <section className="update-type-grid section-shell" aria-label="Update categories">
          {updateTypes.map((item) => <article key={item.number}><small>{item.number}</small><h2>{item.title}</h2><p>{item.copy}</p></article>)}
        </section>

        <section className="work-gallery section-shell" id="recent-work" aria-labelledby="all-recent-work-title">
          <div className="work-section-heading">
            <div><p className="eyebrow"><span /> Recent locksmith work</p><h2 id="all-recent-work-title">Automotive, home, and business projects.</h2></div>
            <p>Browse all currently published MI Lock Pros work photos. Images are framed to keep the key or lock hardware visible on phones and larger screens.</p>
          </div>
          <AutomotiveWorkGallery category="all" />
          <p className="work-gallery-note">Photos show representative completed work. Compatibility and current service availability vary; call with the exact vehicle, key, lock, hardware, and location details.</p>
        </section>

        <div className="updates-actions section-shell"><a className="button button-primary" href={phoneHref()}>Call Now <span aria-hidden="true">↗</span></a><Link className="button button-secondary" href="/#request-service">Request Service</Link></div>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  );
}
