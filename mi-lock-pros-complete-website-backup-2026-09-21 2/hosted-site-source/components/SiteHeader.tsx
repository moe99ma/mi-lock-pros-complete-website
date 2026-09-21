'use client';

import { type MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { phoneHref, siteConfig, textHref } from '@/lib/site-config';

type Theme = 'light' | 'dark';

const businessCredentials = [
  '24/7 Emergency Service',
  'Insured',
  'Background-Checked Technicians',
  `Serving ${siteConfig.serviceArea}`,
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  function handleSectionClick(href: string) {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      setOpen(false);
      if (!href.startsWith('/#') || window.location.pathname !== '/') return;

      const targetId = href.slice(2);
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${targetId}`);
    };
  }

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextTheme === 'light' ? '#f6f1e7' : '#050504');
    sessionStorage.setItem('mi-lock-pros-theme', nextTheme);
    setTheme(nextTheme);
  }

  const themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <>
      <aside className="top-trust-bar" aria-label="MI Lock Pros business credentials">
        <div className="top-trust-marquee">
          <div className="top-trust-track">
            {[false, true].map((duplicate) => (
              <div className="top-trust-group" aria-hidden={duplicate || undefined} key={duplicate ? 'duplicate' : 'primary'}>
                {businessCredentials.map((credential, index) => (
                  <span key={credential}>
                    {index === 0 ? <i className="trust-status-dot" /> : null}
                    {credential}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </aside>
      <header className="site-header">
      <Link className="brand" href="/#home" aria-label="MI Lock Pros home" onClick={handleSectionClick('/#home')}>
        <Image className="header-logo" src="/mi-lock-pros-logo.png" alt="" width={64} height={64} priority />
        <span>LOCK PROS</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {siteConfig.navigation.map((item) => <Link key={item.label} href={item.href} onClick={handleSectionClick(item.href)}>{item.label}</Link>)}
      </nav>

      <div className="header-actions">
        <Link className="button button-ghost header-request" href="/#request-service" onClick={handleSectionClick('/#request-service')}>Request Service</Link>
        <a className="button button-text header-text" href={textHref()}>Text Us</a>
        <a className="button button-primary header-call" href={phoneHref()}>Call Now</a>
        <button className="theme-toggle theme-toggle-header" type="button" aria-label={themeLabel} title={themeLabel} onClick={toggleTheme}>
          <span className="theme-icon theme-icon-sun" aria-hidden="true">☀</span>
          <span className="theme-icon theme-icon-moon" aria-hidden="true">☾</span>
          <span className="theme-toggle-knob" aria-hidden="true" />
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((current) => !current)}
        >
          <span /><span /><span />
        </button>
      </div>

      <button className={`mobile-menu-backdrop ${open ? 'is-open' : ''}`} type="button" aria-label="Close navigation menu" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} />
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} id="mobile-navigation">
        <div className="mobile-menu-heading">
          <div><small>Menu</small><strong>How can we help?</strong></div>
          <button type="button" aria-label="Close navigation menu" onClick={() => setOpen(false)}><span aria-hidden="true">×</span></button>
        </div>
        <nav aria-label="Mobile navigation">
          {siteConfig.navigation.map((item, index) => (
            <Link key={item.label} href={item.href} onClick={handleSectionClick(item.href)}><small>{String(index + 1).padStart(2, '0')}</small><strong>{item.label}</strong><span>↗</span></Link>
          ))}
        </nav>
        <div className="mobile-theme-row">
          <div><small>Appearance</small><strong>{theme === 'dark' ? 'Dark theme' : 'Light theme'}</strong></div>
          <button className="theme-toggle" type="button" aria-label={themeLabel} title={themeLabel} onClick={toggleTheme}>
            <span className="theme-icon theme-icon-sun" aria-hidden="true">☀</span>
            <span className="theme-icon theme-icon-moon" aria-hidden="true">☾</span>
            <span className="theme-toggle-knob" aria-hidden="true" />
          </button>
        </div>
        <div className="mobile-menu-actions">
          <a className="button button-primary" href={phoneHref()} onClick={() => setOpen(false)}>Call Now</a>
          <a className="button button-text" href={textHref()} onClick={() => setOpen(false)}>Text Us</a>
          <Link className="button button-secondary" href="/#request-service" onClick={handleSectionClick('/#request-service')}>Request Service</Link>
        </div>
      </div>
      </header>
    </>
  );
}
