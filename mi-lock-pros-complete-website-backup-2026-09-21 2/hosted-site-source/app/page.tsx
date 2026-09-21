import Image from 'next/image';
import Link from 'next/link';
import { GoogleReviews } from '@/components/GoogleReviews';
import { AutomotiveWorkGallery } from '@/components/AutomotiveWorkGallery';
import { ServiceRequestForm } from '@/components/ServiceRequestForm';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { emailHref, faqs, featuredServiceAreas, isConfigured, phoneHref, serviceAreaGroups, serviceAreaNames, serviceAreaSlug, serviceCategories, serviceSlug, siteConfig } from '@/lib/site-config';

function SectionHeading({ label, title, copy }: { label: string; title: string; copy?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span /> {label}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function BusinessValue({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = <><small>{label}</small><strong>{value}</strong></>;
  return href ? <a className="business-value" href={href}>{content}</a> : <div className="business-value">{content}</div>;
}

export default function Home() {
  const googleLink = isConfigured(siteConfig.googleProfileUrl) ? siteConfig.googleProfileUrl : '#google-review-setup';
  const googleReviewLink = isConfigured(siteConfig.googleReviewUrl) ? siteConfig.googleReviewUrl : googleLink;
  const businessId = `${siteConfig.siteUrl}/#business`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'Locksmith'],
        '@id': businessId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        alternateName: ['MI Lock Pros LLC', 'MI LOCK PROS LLC'],
        url: siteConfig.siteUrl,
        logo: `${siteConfig.siteUrl}/mi-lock-pros-logo.png`,
        image: `${siteConfig.siteUrl}/og-gold.png`,
        description: 'Mobile automotive, residential, and commercial locksmith services based in Ann Arbor and serving Detroit and communities across Southeast Michigan.',
        ...(isConfigured(siteConfig.phone) && { telephone: siteConfig.phone }),
        ...(isConfigured(siteConfig.email) && { email: siteConfig.email }),
        areaServed: serviceAreaNames.map((name) => ({ '@type': 'Place', name })),
        openingHours: 'Mo-Su 00:00-23:59',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        paymentAccepted: 'Cash, Visa, Mastercard, Discover, American Express, Cash App, Zelle',
        currenciesAccepted: 'USD',
        knowsLanguage: 'English',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteConfig.phone,
          email: siteConfig.email,
          contactType: 'customer service',
          areaServed: siteConfig.serviceArea,
          availableLanguage: ['English'],
        },
        knowsAbout: serviceCategories.flatMap((category) => category.services.map((service) => service.name)),
        ...(isConfigured(siteConfig.googleProfileUrl) && { hasMap: siteConfig.googleProfileUrl }),
        sameAs: [siteConfig.googleProfileUrl, ...Object.values(siteConfig.socialLinks)].filter(isConfigured),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Locksmith services',
          itemListElement: serviceCategories.map((category) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: category.title,
              url: `${siteConfig.siteUrl}/services/${category.slug}`,
              description: category.description,
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.siteUrl}/#website`,
        url: siteConfig.siteUrl,
        name: siteConfig.name,
        alternateName: siteConfig.legalName,
        publisher: { '@id': businessId },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': `${siteConfig.siteUrl}/#webpage`,
        url: siteConfig.siteUrl,
        name: 'Mobile Locksmith in Ann Arbor, Detroit & Southeast Michigan | MI Lock Pros',
        description: 'Mobile locksmith service for car lockouts, car keys, home lockouts, lock rekeying, lock changes, smart locks, and commercial door locks across Southeast Michigan.',
        isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
        about: { '@id': businessId },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${siteConfig.siteUrl}/og-gold.png` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteConfig.siteUrl}/#faq`,
        mainEntity: faqs.map((faq) => ({
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

      <main id="main-content">
        <section className="hero hero-copy-only" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Security, handled with care</p>
            <h1>Locked out, lost your keys, or need a lock changed? <em>Call MI Lock Pros.</em></h1>
            <p className="hero-intro">
              We come to your car, home, or business across Ann Arbor, Detroit, and Southeast Michigan
              for car lockouts, car key programming, home lockouts, lock rekeying, smart locks, and commercial door locks.
            </p>
            <div className="hero-actions">
              <a className="button button-primary button-large" href={phoneHref()}>Call Now <span>↗</span></a>
              <a className="button button-secondary button-large" href="#request-service">Request Service</a>
            </div>
            <div className="trust-line" aria-label="Professional, reliable, responsive">
              <span>Professional</span><i /> <span>Reliable</span><i /> <span>Responsive</span>
            </div>
          </div>

        </section>

        <section className="services section-shell" id="services">
          <div className="section-topline">
            <SectionHeading
              label="Locksmith services"
              title="The right service for every lock."
              copy={`Automotive, residential, and commercial locksmith help for customers across ${siteConfig.serviceArea}.`}
            />
            <p className="section-index">03 / SERVICE CATEGORIES</p>
          </div>

          <div className="service-grid">
            {serviceCategories.map((category) => (
              <article className="service-card" key={category.id}>
                <Link className="service-card-click-target" href={`/services/${category.slug}`} aria-label={`Explore ${category.title} services`} />
                <div className="service-card-top">
                  <span className={`service-symbol symbol-${category.id}`} aria-hidden="true"><i /></span>
                  <small>{category.code}</small>
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <ul>
                  {category.services.map((service) => (
                    <li key={service.name}>
                      <Link href={`/services/${category.slug}/${serviceSlug(service.name)}`}>
                        <span aria-hidden="true">+</span>{service.name}<b aria-hidden="true">↗</b>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link className="service-detail-link" href={`/services/${category.slug}`}>Explore {category.shortTitle.toLowerCase()} locksmith services <span>↗</span></Link>
                <a className="button button-card" href="#request-service">Request This Service <span>↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="reviews section-shell" id="reviews">
          <div className="reviews-header">
            <SectionHeading
              label="Google reviews"
              title="Customer trust, verified on Google."
              copy="MI Lock Pros has a verified 4.9 average rating from 223 Google reviews. Read the latest customer feedback on the official Google profile."
            />
            <a className={`button button-secondary ${!isConfigured(siteConfig.googleProfileUrl) ? 'is-placeholder-link' : ''}`} href={googleLink} target={isConfigured(siteConfig.googleProfileUrl) ? '_blank' : undefined} rel={isConfigured(siteConfig.googleProfileUrl) ? 'noreferrer' : undefined}>
              {isConfigured(siteConfig.googleProfileUrl) ? 'Read Google reviews' : 'Add Google profile URL'} <span>↗</span>
            </a>
          </div>

          <GoogleReviews profileUrl={googleLink} reviewUrl={googleReviewLink} />
        </section>

        <section className="trust-strip" aria-label="MI Lock Pros service categories">
          <span>Automotive</span><i>01</i><span>Residential</span><i>02</i><span>Commercial</span><i>03</i>
        </section>

		<section className="service-work service-work-compact section-shell" id="recent-work" aria-labelledby="recent-work-title">
		  <div className="work-section-heading">
			<div><p className="eyebrow"><span /> Recent locksmith work</p><h2 id="recent-work-title">Real key, lock, and door projects.</h2></div>
			<p>One automotive, one residential, and one commercial project from MI Lock Pros work across Southeast Michigan.</p>
		  </div>
		  <AutomotiveWorkGallery category="featured" />
		  <div className="work-section-actions"><Link className="button button-secondary" href="/updates#recent-work">View all recent work <span aria-hidden="true">↗</span></Link></div>
		  <p className="work-gallery-note">Work shown is representative of completed projects. Vehicle, key, lock, and hardware compatibility varies; call with the exact details so current service can be confirmed.</p>
		</section>
        <section className="coverage section-shell" id="service-area" aria-labelledby="coverage-title">
          <div className="coverage-header">
            <SectionHeading
              label="Service coverage"
              title="Serving Southeast Michigan."
              copy={`MI Lock Pros serves ${serviceAreaNames.length} listed communities across Wayne, Oakland, Macomb, Washtenaw, Livingston, Monroe, and nearby areas.`}
            />
            <div className="coverage-stat" aria-label={`${serviceAreaNames.length} listed service areas`}>
              <strong>{serviceAreaNames.length}</strong>
              <span>listed service areas</span>
            </div>
          </div>
          <div className="coverage-panel">
            <figure className="coverage-map">
              <Image src="/service-area-map.svg" alt="Map of Southeast Michigan with MI Lock Pros service communities highlighted in gold" width={1000} height={760} />
              <figcaption>Gold boundaries show the service areas supplied by MI Lock Pros. The map is for service-coverage orientation; contact us to confirm an exact address.</figcaption>
            </figure>
            <div className="area-directory">
              <div className="area-directory-top">
                <div><small>Coverage directory</small><strong>Find your community</strong></div>
                <span>{siteConfig.businessHours}</span>
              </div>
              <div className="area-groups">
                {serviceAreaGroups.map((group, index) => (
                  <details key={group.name} open={index === 0}>
                    <summary><span>{group.name}</span><small>{group.areas.length} areas</small><b aria-hidden="true">+</b></summary>
                    <ul>{group.areas.map((area) => <li key={area}><Link href={`/service-areas/${serviceAreaSlug(area)}`}>{area}</Link></li>)}</ul>
                  </details>
                ))}
              </div>
              <div className="coverage-cta"><p>Not sure whether your address is covered?</p><a className="button button-primary" href="#request-service">Check your location <span aria-hidden="true">↗</span></a></div>
            </div>
          </div>
          <p className="coverage-summary">Coverage includes {featuredServiceAreas.join(', ')}, and many neighboring Southeast Michigan communities. <Link href="/service-area">View the complete service-area directory <span aria-hidden="true">↗</span></Link></p>
        </section>

        <section className="about section-shell" id="about">
          <div className="about-panel">
            <div className="about-copy">
              <SectionHeading
                label="About MI Lock Pros"
                title="Security service built around people."
                copy="MI Lock Pros is a mobile locksmith company based in Ann Arbor and serving Detroit and communities across Southeast Michigan. We provide dependable automotive, residential, and commercial locksmith service with clear communication and respect for every vehicle, home, and workplace."
              />
              <p className="about-note">Serving drivers, homeowners, property managers, and businesses throughout <strong>{siteConfig.serviceArea}</strong>.</p>
              <a className="text-link" href="#request-service">Tell us what you need <span>↗</span></a>
            </div>
            <div className="about-values" aria-label="Business details">
              <BusinessValue label="Service area" value={siteConfig.serviceArea} />
              <BusinessValue label="Experience" value={siteConfig.yearsExperience} />
              <BusinessValue label="Business hours" value={siteConfig.businessHours} />
              <BusinessValue label="Direct contact" value={siteConfig.phone} href={phoneHref()} />
            </div>
          </div>
        </section>

        <section className="process section-shell" id="process" aria-labelledby="process-title">
          <div className="process-intro">
            <p className="eyebrow"><span /> Simple process</p>
            <h2 id="process-title">Clear from first contact.</h2>
          </div>
          <ol className="process-list">
            <li><b>01</b><span><strong>Share the problem</strong><small>Call or use the service request form with the key details.</small></span></li>
            <li><b>02</b><span><strong>Discuss your options</strong><small>We’ll clarify the locksmith service that best fits the situation.</small></span></li>
            <li><b>03</b><span><strong>Confirm the service</strong><small>Choose how and when you prefer to be contacted next.</small></span></li>
          </ol>
        </section>

        <section className="request section-shell" id="request-service">
          <div className="request-panel">
            <aside className="request-copy">
              <p className="eyebrow"><span /> Request service</p>
              <h2>Tell us how we can help.</h2>
              <p>Share a few details about the lock, key, or access issue. MI Lock Pros can follow up using the contact method you choose.</p>
              <div className="request-direct">
                <small>Prefer to call?</small>
                <a href={phoneHref()}>{siteConfig.phone}<span>↗</span></a>
              </div>
              <div className="privacy-note"><span aria-hidden="true">◇</span><p>Your contact details are used only to respond to this request. Do not send payment details through this form.</p></div>
            </aside>
            <div className="form-wrap">
              <ServiceRequestForm />
            </div>
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-copy">
            <p className="eyebrow"><span /> Contact MI Lock Pros</p>
            <h2>Let’s get your security back on track.</h2>
            <p>Contact MI Lock Pros for professional automotive, residential, or commercial locksmith service in {siteConfig.serviceArea}.</p>
          </div>
          <div className="contact-grid">
            <BusinessValue label="Phone" value={siteConfig.phone} href={phoneHref()} />
            <BusinessValue label="Email" value={siteConfig.email} href={emailHref()} />
            <BusinessValue label="Business hours" value={siteConfig.businessHours} />
            <BusinessValue label="Service area" value={siteConfig.serviceArea} />
          </div>
        </section>

        <section className="faq section-shell" id="faq" aria-labelledby="faq-title">
          <div className="faq-intro">
            <p className="eyebrow"><span /> Locksmith questions</p>
            <h2 id="faq-title">Helpful answers before you call.</h2>
            <p>Clear information about the automotive, residential, and commercial locksmith services available from MI Lock Pros.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  );
}
