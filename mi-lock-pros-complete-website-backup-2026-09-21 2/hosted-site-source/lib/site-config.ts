export type ServiceItem = {
  name: string;
  description: string;
};

export type ServiceCategory = {
  id: 'automotive' | 'residential' | 'commercial';
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  heroCopy: string;
  preparation: string;
  services: ServiceItem[];
};

export const siteConfig = {
  name: 'MI Lock Pros',
  legalName: 'MI Lock Pros LLC',
  siteUrl: 'https://mi-lock-pros.moemah99.chatgpt.site',
  phone: '734-249-5296',
  email: 'admin@milockprosllc.com',
  serviceArea: 'Southeast Michigan',
  businessHours: 'Open 24 hours',
  yearsExperience: '5 years',
  googleProfileUrl: 'https://share.google/v9Mx8tqQuBiI7ZhBa',
  googleReviewUrl: 'https://g.page/r/Caq7Ltopix8HEAI/review',
  googlePlaceId: 'ChIJMziEN2m48qsRqrsu2imLHwc',
  formEndpoint: '',
  socialLinks: {
    facebook: 'https://www.facebook.com/p/MI-LOCK-PROS-LLC-61566472695093/',
    instagram: 'https://www.instagram.com/milockpros/',
    linkedin: '',
  },
  navigation: [
    { label: 'Home', href: '/#home' },
    { label: 'Services', href: '/#services' },
    { label: 'Vehicles', href: '/vehicles' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'Recent Work', href: '/#recent-work' },
    { label: 'Service Area', href: '/#service-area' },
    { label: 'About', href: '/#about' },
    { label: 'Updates', href: '/updates' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

export const serviceAreaGroups = [
  {
    name: 'Wayne County & Downriver',
    areas: [
      'Allen Park', 'Belleville', 'Canton Township', 'Dearborn', 'Dearborn Heights',
      'Detroit', 'Ecorse', 'Flat Rock', 'Garden City', 'Grosse Ile Township',
      'Grosse Pointe', 'Grosse Pointe Farms', 'Grosse Pointe Park', 'Grosse Pointe Woods',
      'Hamtramck', 'Harper Woods', 'Highland Park', 'Inkster', 'Lincoln Park', 'Livonia',
      'Melvindale', 'Northville', 'Northville Township', 'Plymouth', 'Plymouth Township',
      'Redford Township', 'River Rouge', 'Riverview', 'Romulus', 'Southgate', 'Taylor',
      'Trenton', 'Van Buren Township', 'Wayne', 'Wayne County', 'Westland', 'Woodhaven',
      'Wyandotte',
    ],
  },
  {
    name: 'Oakland County',
    areas: [
      'Auburn Hills', 'Berkley', 'Beverly Hills', 'Bingham Farms', 'Birmingham',
      'Bloomfield Hills', 'Bloomfield Township', 'Clawson', 'Ferndale', 'Franklin',
      'Hazel Park', 'Huntington Woods', 'Keego Harbor', 'Madison Heights', 'Milford',
      'New Hudson', 'Novi', 'Oak Park', 'Oakland Township', 'Orchard Lake Village',
      'Pleasant Ridge', 'Pontiac', 'Rochester', 'Rochester Hills', 'Royal Oak', 'South Lyon',
      'Troy', 'Walled Lake', 'Waterford Township', 'West Bloomfield Township',
      'White Lake Township', 'Wixom', 'Wolverine Lake',
    ],
  },
  {
    name: 'Macomb County',
    areas: [
      'Center Line', 'Clinton Township', 'Eastpointe', 'Fraser', 'Harrison Township',
      'Macomb', 'Macomb County', 'Mount Clemens', 'New Baltimore', 'Roseville',
      'Shelby Township', 'St. Clair Shores', 'Sterling Heights', 'Utica', 'Warren',
      'Washington',
    ],
  },
  {
    name: 'Washtenaw, Livingston & Monroe',
    areas: [
      'Ann Arbor', 'Ann Arbor Township', 'Brighton', 'Bryant Pattengill East',
      'Bryant Pattengill West', 'Carleton', 'Dexter', 'Haisley', 'Milan', 'Saline',
      'Superior Township', 'Whitmore Lake', 'Willis', 'York Township', 'Ypsilanti',
      'Ypsilanti Township',
    ],
  },
] as const;

export const serviceAreaNames = serviceAreaGroups.flatMap((group) => group.areas);

export type ServiceAreaRecord = {
  name: string;
  slug: string;
  group: string;
  regionSummary: string;
};

const serviceAreaRegionSummaries: Record<string, string> = {
  'Wayne County & Downriver': 'This coverage group includes Detroit, western Wayne County, the Downriver communities, and nearby Wayne County locations.',
  'Oakland County': 'This coverage group includes communities across southern and central Oakland County and neighboring areas.',
  'Macomb County': 'This coverage group includes communities across southern and central Macomb County and neighboring areas.',
  'Washtenaw, Livingston & Monroe': 'This coverage group includes Ann Arbor and surrounding communities in Washtenaw County, plus listed Livingston and Monroe County locations.',
};

export function serviceAreaSlug(name: string) {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const serviceSlug = serviceAreaSlug;

export const serviceAreaRecords: ServiceAreaRecord[] = serviceAreaGroups.flatMap((group) =>
  group.areas.map((name) => ({
    name,
    slug: serviceAreaSlug(name),
    group: group.name,
    regionSummary: serviceAreaRegionSummaries[group.name],
  })),
);

export function getServiceAreaBySlug(slug: string) {
  return serviceAreaRecords.find((area) => area.slug === slug);
}

export function getNearbyServiceAreas(area: ServiceAreaRecord, limit = 8) {
  const sameGroup = serviceAreaRecords.filter((candidate) => candidate.group === area.group && candidate.slug !== area.slug);
  const currentIndex = serviceAreaRecords.findIndex((candidate) => candidate.slug === area.slug);
  const groupIndex = sameGroup.findIndex((candidate) => serviceAreaRecords.indexOf(candidate) > currentIndex);
  const start = Math.max(0, groupIndex >= 0 ? groupIndex - Math.floor(limit / 2) : sameGroup.length - limit);
  return sameGroup.slice(start, start + limit);
}

export const serviceAreaCounties = [
  'Wayne County',
  'Oakland County',
  'Macomb County',
  'Washtenaw County',
  'Livingston County',
  'Monroe County',
] as const;

export const featuredServiceAreas = [
  'Detroit',
  'Dearborn',
  'Ann Arbor',
  'Royal Oak',
  'Troy',
  'Novi',
  'Warren',
  'Sterling Heights',
  'Rochester Hills',
  'Canton Township',
] as const;

export const faqs = [
  {
    question: 'What types of locksmith services does MI Lock Pros provide?',
    answer: 'MI Lock Pros provides automotive, residential, and commercial locksmith services, including lockouts, key services, lock installation, rekeying, high-security locks, and door-hardware upgrades.',
  },
  {
    question: 'Can MI Lock Pros help with car keys and key fobs?',
    answer: 'Automotive services include car lockout help, car key replacement and duplication, transponder key programming, key fob programming, push-to-start smart key service, and ignition-related locksmith work. Compatibility depends on the vehicle year, make, model, and key system.',
  },
  {
    question: 'Can MI Lock Pros rekey, change, or install smart locks?',
    answer: 'Residential locksmith services include lock rekeying, lock changes and replacement, deadbolt installation, and installation of compatible smart locks. Contact MI Lock Pros with the lock or door details to confirm compatibility.',
  },
  {
    question: 'What residential locksmith services are available?',
    answer: 'Residential services include home lockouts, lock changes and replacement, lock rekeying, key duplication, deadbolt installation, smart lock installation, and home security upgrades.',
  },
  {
    question: 'What commercial locksmith services are available?',
    answer: 'Commercial services include business lockouts, commercial lock changes and installation, rekeying, master key systems, high-security locks, and door-hardware upgrades.',
  },
  {
    question: 'How do I request locksmith service?',
    answer: `Call MI Lock Pros at ${siteConfig.phone} or complete the request-service form with your contact details, service type, location, preferred time, and a short description of the problem.`,
  },
  {
    question: 'What areas does MI Lock Pros serve?',
    answer: `MI Lock Pros serves ${serviceAreaNames.length} listed communities across Southeast Michigan, including areas in Wayne, Oakland, Macomb, Washtenaw, Livingston, and Monroe counties. Check the service-area map and directory or contact us to confirm your location.`,
  },
] as const;

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'automotive',
    slug: 'automotive-locksmith',
    code: 'AUTO / 01',
    title: 'Automotive Locksmith',
    shortTitle: 'Automotive',
    description: 'Car lockout help, car key replacement, key fob programming, push-to-start smart key service, and ignition locksmith work.',
    heroCopy: 'Locked out of your car, lost every key, or need a spare car key or key fob programmed? MI Lock Pros provides mobile automotive locksmith service for supported vehicles across Southeast Michigan.',
    preparation: 'When requesting automotive service, share the vehicle year, make, and model; whether every key is lost or a key is locked inside; and any dashboard or ignition symptoms. Be prepared to confirm authorization for the vehicle before access or replacement-key work begins.',
    services: [
      { name: 'Car lockouts', description: 'Careful entry assistance when a vehicle key is locked inside or unavailable. Authorization for the vehicle may be verified before work begins.' },
      { name: 'Car key replacement', description: 'Replacement options for lost, damaged, or nonworking vehicle keys based on the vehicle year, make, model, and key type.' },
      { name: 'Key duplication', description: 'Duplicate supported vehicle keys so you can keep a working spare before the original key is lost or damaged.' },
      { name: 'Transponder key programming', description: 'Programming for compatible chip keys so the vehicle can recognize and operate with the replacement key.' },
      { name: 'Key fob programming', description: 'Programming and replacement options for compatible key fobs and remote-head vehicle keys.' },
      { name: 'Push-to-start smart keys', description: 'Replacement and programming options for compatible push-to-start smart key systems, based on the vehicle year, make, and model.' },
      { name: 'Ignition-related locksmith services', description: 'Locksmith diagnosis and service for keys that stick, turn poorly, or no longer operate the ignition as expected.' },
    ],
  },
  {
    id: 'residential',
    slug: 'residential-locksmith',
    code: 'HOME / 02',
    title: 'Residential Locksmith',
    shortTitle: 'Residential',
    description: 'Dependable lock and key service designed to help protect your home and household.',
    heroCopy: 'Locked out of your home or need a lock rekeyed, changed, or upgraded? MI Lock Pros provides mobile residential locksmith service for home lockouts, deadbolts, smart locks, keys, and compatible door hardware.',
    preparation: 'Describe the door and lock type, whether the issue affects entry or security, and how many locks need attention. Be prepared to confirm that you are authorized to request work at the property.',
    services: [
      { name: 'Home lockouts', description: 'Entry assistance when an authorized occupant is locked out of a house, apartment, or other residence.' },
      { name: 'Lock changes and replacement', description: 'Changing, installing, or replacing compatible door locks when hardware is worn, damaged, or ready for an update.' },
      { name: 'Lock rekeying', description: 'Reconfiguring supported locks to work with a new key while keeping the existing lock hardware in place.' },
      { name: 'Key duplication', description: 'Copies of supported residential keys for household members, trusted family, or a secure spare.' },
      { name: 'Deadbolt installation', description: 'Installation or replacement of compatible deadbolts to strengthen a home’s exterior-door locking hardware.' },
      { name: 'Smart lock installation', description: 'Installation and setup of compatible smart locks for residential doors, including replacing suitable existing lock hardware.' },
      { name: 'Home security upgrades', description: 'A practical review of existing locks and door hardware with recommendations for appropriate mechanical upgrades.' },
    ],
  },
  {
    id: 'commercial',
    slug: 'commercial-locksmith',
    code: 'BIZ / 03',
    title: 'Commercial Locksmith',
    shortTitle: 'Commercial',
    description: 'Professional lock, key, and door-hardware support for businesses and commercial spaces.',
    heroCopy: 'Need a business lock changed, a storefront door lock serviced, or commercial locks rekeyed? MI Lock Pros provides mobile commercial locksmith service for businesses, offices, storefronts, and managed properties.',
    preparation: 'Share the number and type of doors involved, the existing lock or key hardware, and the work you need completed. For occupied workplaces, include scheduling constraints and the authorized business contact for the project.',
    services: [
      { name: 'Business lockouts', description: 'Entry assistance for authorized owners, managers, or employees who are locked out of a commercial property.' },
      { name: 'Commercial lock changes and installation', description: 'Changing, installing, or replacing compatible commercial lock hardware for offices, storefronts, and other business doors.' },
      { name: 'Rekeying and master key systems', description: 'Rekeying supported commercial locks and organizing mechanical master-key systems for practical key management.' },
      { name: 'High-security locks', description: 'Installation and service options for compatible high-security mechanical lock and key systems.' },
      { name: 'Door hardware and security upgrades', description: 'Evaluation and improvement of compatible commercial locks and related mechanical door hardware.' },
    ],
  },
];

export function isConfigured(value: string) {
  return Boolean(value && !value.startsWith('['));
}

export function phoneHref() {
  return isConfigured(siteConfig.phone)
    ? `tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`
    : '/#contact';
}

export function textHref() {
  return isConfigured(siteConfig.phone)
    ? `sms:${siteConfig.phone.replace(/[^+\d]/g, '')}`
    : '/#contact';
}

export function emailHref() {
  return isConfigured(siteConfig.email) ? `mailto:${siteConfig.email}` : '/#contact';
}
