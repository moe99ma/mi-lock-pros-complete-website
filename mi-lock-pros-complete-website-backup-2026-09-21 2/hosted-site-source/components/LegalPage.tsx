import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site-config';

type LegalSection = { title: string; paragraphs?: string[]; items?: string[] };

export function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <a className="skip-link" href="#legal-content">Skip to main content</a>
      <SiteHeader />
      <main className="legal-main" id="legal-content">
        <article className="legal-shell">
          <p className="eyebrow"><span /> {eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          {sections.map((section) => (
            <section className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          <section className="legal-section">
            <h2>Questions</h2>
            <p>Questions about this page can be sent to MI Lock Pros at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or <a href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}>{siteConfig.phone}</a>.</p>
          </section>
          <Link className="legal-back" href="/">← Back to MI Lock Pros</Link>
        </article>
      </main>
    </>
  );
}
