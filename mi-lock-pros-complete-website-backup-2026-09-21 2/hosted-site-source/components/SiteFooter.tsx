import Image from 'next/image';
import Link from 'next/link';
import { emailHref, isConfigured, phoneHref, serviceCategories, siteConfig, textHref } from '@/lib/site-config';

export function SiteFooter() {
  const googleLink = isConfigured(siteConfig.googleProfileUrl) ? siteConfig.googleProfileUrl : '/#reviews';

  return (
    <>
      <footer className="footer">
        <div className="footer-grid section-shell">
          <div className="footer-brand">
            <Link className="brand" href="/#home" aria-label="MI Lock Pros home"><Image className="header-logo" src="/mi-lock-pros-logo.png" alt="" width={64} height={64} /><span>LOCK PROS</span></Link>
            <p>Professional locksmith solutions for vehicles, homes, and businesses{isConfigured(siteConfig.serviceArea) ? ` in ${siteConfig.serviceArea}` : ''}.</p>
            <div className="social-links" aria-label="Follow MI Lock Pros">
              {Object.entries(siteConfig.socialLinks).filter(([, url]) => Boolean(url)).map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={`MI Lock Pros on ${name}`} title={`Follow MI Lock Pros on ${name}`}>
                  {name === 'facebook' || name === 'instagram'
                    ? <span className={`social-icon social-icon-${name}`} aria-hidden="true" />
                    : name.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-column"><h3>Services</h3>{serviceCategories.map((category) => <Link href={`/services/${category.slug}`} key={category.id}>{category.shortTitle}</Link>)}<Link href="/vehicles">Vehicle Key Guide</Link></div>
          <div className="footer-column"><h3>Company</h3><Link href="/#reviews">Reviews</Link><Link href="/#recent-work">Recent Work</Link><Link href="/service-area">Service Area</Link><Link href="/#about">About</Link><Link href="/updates">Updates &amp; Offers</Link><Link href="/#contact">Contact</Link><a href={googleLink} target="_blank" rel="noreferrer">Google profile</a></div>
          <div className="footer-column"><h3>Get in touch</h3><a href={phoneHref()}>{siteConfig.phone}</a><a href={emailHref()}>{siteConfig.email}</a><span>{siteConfig.businessHours}</span><span>{siteConfig.serviceArea}</span></div>
        </div>
        <div className="footer-assurance section-shell" aria-label="MI Lock Pros trust and business credentials">
          <div><span className="assurance-icon" aria-hidden="true">✓</span><span><small>Coverage</small><strong>Insured</strong></span></div>
          <div><span className="assurance-icon" aria-hidden="true">✓</span><span><small>Technicians</small><strong>Background checked</strong></span></div>
          <a href={googleLink} target="_blank" rel="noreferrer"><span className="assurance-icon" aria-hidden="true">G</span><span><small>Google business</small><strong>View Google profile</strong></span></a>
          <div><span className="assurance-icon" aria-hidden="true">24</span><span><small>Availability</small><strong>24/7 emergency service</strong></span></div>
        </div>
        <div className="payment-acceptance section-shell" aria-labelledby="accepted-payments-title">
          <div className="payment-heading">
            <strong id="accepted-payments-title">Accepted payment methods</strong>
            <span>Cards, cash & digital payments</span>
          </div>
          <div className="payment-logos" role="list" aria-label="Accepted payment methods">
            <span className="payment-logo payment-visa" role="listitem" aria-label="Visa">VISA</span>
            <span className="payment-logo payment-mastercard" role="listitem" aria-label="Mastercard"><i aria-hidden="true" /><i aria-hidden="true" /><b aria-hidden="true">mastercard</b></span>
            <span className="payment-logo payment-discover" role="listitem" aria-label="Discover">DISC<span aria-hidden="true">O</span>VER</span>
            <span className="payment-logo payment-amex" role="listitem" aria-label="American Express">AMERICAN<br />EXPRESS</span>
            <span className="payment-logo payment-cash" role="listitem" aria-label="Cash"><b aria-hidden="true">$</b> CASH</span>
            <span className="payment-logo payment-cashapp" role="listitem" aria-label="Cash App"><b aria-hidden="true">$</b><span>Cash App</span></span>
            <span className="payment-logo payment-zelle" role="listitem" aria-label="Zelle"><b aria-hidden="true">Z</b><span>Zelle</span></span>
          </div>
        </div>
        <div className="footer-bottom section-shell">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms &amp; Conditions</Link></div>
        </div>
      </footer>

      <div className="mobile-action-bar" aria-label="Quick service actions">
        <a href={phoneHref()}>Call Now</a>
        <a href={textHref()}>Text Us</a>
        <Link href="/#request-service">Request Service</Link>
      </div>
    </>
  );
}
