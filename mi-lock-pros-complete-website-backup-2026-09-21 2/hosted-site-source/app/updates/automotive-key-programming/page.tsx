import type { Metadata } from 'next';
import Link from 'next/link';
import { AutomotiveWorkGallery } from '@/components/AutomotiveWorkGallery';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { automotiveWork } from '@/lib/automotive-work';
import { phoneHref, siteConfig } from '@/lib/site-config';

const path = '/updates/automotive-key-programming';
const pageUrl = `${siteConfig.siteUrl}${path}`;
const description = 'See genuine MI Lock Pros photos of push-to-start smart keys, spare keys, key fobs, FOBIK keys, and all-keys-lost programming work across Southeast Michigan.';

export const metadata: Metadata = {
  title: 'Automotive Key Programming Work in Southeast Michigan',
  description,
  keywords: ['car key programming', 'key fob programming', 'push-to-start key programming', 'all keys lost locksmith', 'spare car key', 'Southeast Michigan locksmith'],
  alternates: { canonical: path },
  openGraph: {
    type: 'article',
    title: 'Automotive Key Programming Work | MI Lock Pros',
    description,
    url: path,
    images: [{ url: automotiveWork[0].image, alt: automotiveWork[0].alt }],
  },
  twitter: { card: 'summary_large_image', title: 'Automotive Key Programming Work | MI Lock Pros', description, images: [automotiveWork[0].image] },
};

export default function AutomotiveKeyProgrammingPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Automotive Key Programming Work in Southeast Michigan',
        description,
        isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
        about: { '@id': `${siteConfig.siteUrl}/#business` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: automotiveWork.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: { '@type': 'ImageObject', name: item.title, caption: item.caption, contentUrl: `${siteConfig.siteUrl}${item.image}` },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Updates', item: `${siteConfig.siteUrl}/updates` },
          { '@type': 'ListItem', position: 3, name: 'Automotive Key Programming Work', item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main className="work-main" id="main-content">
        <section className="work-hero section-shell">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/updates">Updates</Link><span>/</span><span aria-current="page">Automotive key programming</span></nav>
          <p className="eyebrow"><span /> Genuine service photos</p>
          <h1>Automotive key programming <em>work.</em></h1>
          <p>These original MI Lock Pros photos show completed and in-progress car key programming work across Southeast Michigan, including spare keys, key fobs, push-to-start smart keys, FOBIK keys, and all-keys-lost service.</p>
          <div className="hero-actions"><a className="button button-primary button-large" href={phoneHref()}>Call {siteConfig.phone} <span aria-hidden="true">↗</span></a><Link className="button button-secondary button-large" href="/#request-service">Request Service</Link></div>
        </section>

        <section className="work-gallery section-shell" aria-labelledby="work-gallery-title">
          <div className="work-section-heading">
            <div><p className="eyebrow"><span /> Recent work</p><h2 id="work-gallery-title">Keys programmed for popular vehicle makes.</h2></div>
            <p>Service availability and key compatibility vary by vehicle year, make, model, and key system. Call with your vehicle details so MI Lock Pros can confirm the right service.</p>
          </div>
          <AutomotiveWorkGallery />
          <p className="work-gallery-note">Vehicle names and trademarks belong to their respective owners. They are used only to identify vehicles shown in genuine service photos and do not imply manufacturer endorsement.</p>
        </section>

        <section className="work-cta section-shell">
          <div><p className="eyebrow"><span /> Need a car key?</p><h2>Tell us what you drive.</h2></div>
          <div><p>Share the year, make, model, key type, and whether any working keys remain. We’ll use that information to understand the service you need.</p><Link className="button button-primary" href="/#request-service">Request Automotive Service <span aria-hidden="true">↗</span></Link></div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  );
}
