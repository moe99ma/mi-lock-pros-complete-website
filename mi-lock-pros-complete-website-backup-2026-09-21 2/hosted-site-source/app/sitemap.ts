import type { MetadataRoute } from 'next';
import { serviceDetails } from '@/lib/service-details';
import { serviceAreaRecords, serviceCategories, siteConfig } from '@/lib/site-config';
import { vehicleMakes } from '@/lib/vehicle-makes';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastUpdated = new Date('2026-09-20');
  const servicePages = serviceCategories.map((category) => ({
    url: `${siteConfig.siteUrl}/services/${category.slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));
  const locationPages = serviceAreaRecords.map((area) => ({
    url: `${siteConfig.siteUrl}/service-areas/${area.slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.72,
  }));
  const serviceDetailPages = serviceDetails.map((service) => ({
    url: `${siteConfig.siteUrl}/services/${service.categorySlug}/${service.slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.82,
  }));
  const vehicleMakePages = vehicleMakes.map((make) => ({
    url: `${siteConfig.siteUrl}/vehicles/${make.slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.78,
  }));

  return [
    { url: siteConfig.siteUrl, lastModified: lastUpdated, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.siteUrl}/service-area`, lastModified: lastUpdated, changeFrequency: 'monthly', priority: 0.9 },
    ...locationPages,
    { url: `${siteConfig.siteUrl}/updates`, lastModified: lastUpdated, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${siteConfig.siteUrl}/updates/automotive-key-programming`, lastModified: lastUpdated, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.siteUrl}/vehicles`, lastModified: lastUpdated, changeFrequency: 'monthly', priority: 0.88 },
    ...vehicleMakePages,
    ...servicePages,
    ...serviceDetailPages,
    { url: `${siteConfig.siteUrl}/privacy`, lastModified: lastUpdated, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteConfig.siteUrl}/terms`, lastModified: lastUpdated, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
