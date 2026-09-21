import { serviceAreaCounties, serviceAreaGroups, serviceAreaSlug, serviceCategories, serviceSlug, siteConfig } from '@/lib/site-config';
import { vehicleMakes } from '@/lib/vehicle-makes';

export async function GET() {
  const services = serviceCategories.flatMap((category) => [
    `## ${category.title}`,
    category.description,
    ...category.services.map((service) => `- ${service.name}: ${service.description} ${siteConfig.siteUrl}/services/${category.slug}/${serviceSlug(service.name)}`),
    `Details: ${siteConfig.siteUrl}/services/${category.slug}`,
    '',
  ]);
  const areas = serviceAreaGroups.flatMap((group) => [
    `## ${group.name}`,
    ...group.areas.map((area) => `- ${area}: ${siteConfig.siteUrl}/service-areas/${serviceAreaSlug(area)}`),
    '',
  ]);

  const content = [
    `# ${siteConfig.legalName}`,
    '',
    `> ${siteConfig.name} is a mobile locksmith company based in Ann Arbor and serving Detroit and communities across ${siteConfig.serviceArea}.`,
    '',
    `Canonical website: ${siteConfig.siteUrl}`,
    `Phone: ${siteConfig.phone}`,
    `Email: ${siteConfig.email}`,
    `Business hours: ${siteConfig.businessHours}`,
    `Primary service region: ${siteConfig.serviceArea}`,
    `Counties served: ${serviceAreaCounties.join(', ')}`,
    `Google Business Profile: ${siteConfig.googleProfileUrl}`,
    '',
    '# Services',
    '',
    ...services,
    '# Vehicle key guide',
    '',
    `Browse vehicle makes: ${siteConfig.siteUrl}/vehicles`,
    ...vehicleMakes.map((make) => `- ${make.name}: ${make.models.join(', ')}. ${siteConfig.siteUrl}/vehicles/${make.slug}`),
    '',
    'Vehicle compatibility notice: The make and model lists are non-exhaustive guides, not guarantees. Service depends on model year, trim, key system, immobilizer, parts, software, and the current key situation. Customers should call MI Lock Pros to confirm an exact vehicle.',
    '',
    '# Service areas',
    '',
    ...areas,
    '# Important notes',
    '',
    '- Contact MI Lock Pros to confirm service for an exact ZIP code or address.',
    '- The website does not claim a guaranteed response time.',
    '- Reviews displayed on the website come from the official Google Business Profile when the Google Places connection is configured.',
    '',
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
