import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { siteConfig } from '@/lib/site-config';
import { RequestServiceModal } from '@/components/RequestServiceModal';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteDescription = `Mobile locksmith service in Ann Arbor, Detroit, and Southeast Michigan for car lockouts, car keys, home lockouts, rekeying, lock changes, smart locks, and commercial door locks.`;
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification = process.env.BING_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'Mobile Locksmith in Ann Arbor, Detroit & Southeast Michigan | MI Lock Pros',
    template: '%s | MI Lock Pros',
  },
  description: siteDescription,
  applicationName: 'MI Lock Pros',
  alternates: { canonical: '/' },
  authors: [{ name: 'MI Lock Pros', url: '/' }],
  creator: 'MI Lock Pros',
  publisher: 'MI Lock Pros',
  category: 'Locksmith services',
  keywords: [
    'locksmith in Southeast Michigan',
    'car lockout',
    'car key replacement',
    'key fob programming',
    'push-to-start smart key',
    'lock rekeying',
    'lock change',
    'smart lock installation',
    'automotive locksmith',
    'residential locksmith',
    'commercial locksmith',
    'locksmith Ann Arbor',
    'locksmith Detroit',
    'mobile locksmith Southeast Michigan',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: {
    ...(googleVerification && { google: googleVerification }),
    ...(bingVerification && { other: { 'msvalidate.01': bingVerification } }),
  },
  icons: { icon: '/favicon.png' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MI Lock Pros',
    title: 'Mobile Locksmith in Ann Arbor, Detroit & Southeast Michigan | MI Lock Pros',
    description: siteDescription,
    url: '/',
    images: [{ url: '/og-gold.png', width: 1200, height: 630, alt: 'MI Lock Pros LLC — professional locksmith services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile Locksmith in Ann Arbor, Detroit & Southeast Michigan | MI Lock Pros',
    description: siteDescription,
    images: ['/og-gold.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#050504',
  colorScheme: 'light dark',
};

const themeInitializer = `
  (function () {
    try {
      var saved = sessionStorage.getItem('mi-lock-pros-theme');
      var theme = saved === 'light' || saved === 'dark'
        ? saved
        : 'dark';
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', theme === 'light' ? '#f6f1e7' : '#050504');
    } catch (_) {
      document.documentElement.dataset.theme = 'dark';
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInitializer }} /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <RequestServiceModal />
      </body>
    </html>
  );
}
