export const Domains = {
  website: 'https://internxt.com',
  ai: 'https://ai.internxt.com',
  invalid: 'ia.internxt.com',
} as const;

export const Routes = {
  pricing: `${Domains.website}/pricing`,
  business: `${Domains.website}/business`,
  about: `${Domains.website}/about`,
  
  products: {
    drive: `${Domains.website}/drive`,
    antivirus: `${Domains.website}/antivirus`,
    vpn: `${Domains.website}/vpn`,
    cleaner: `${Domains.website}/cleaner`,
    meet: `${Domains.website}/meet`,
    ia: Domains.ai,
  },
  
  values: {
    privacy: `${Domains.website}/privacy`,
    openSource: `${Domains.website}/open-source`,
    sustainability: `${Domains.website}/green-cloud-computing`,
  },
} as const;

export const productRoutes = [
  { href: Routes.products.drive, key: 'drive' },
  { href: Routes.products.antivirus, key: 'antivirus' },
  { href: Routes.products.vpn, key: 'vpn' },
  { href: Routes.products.cleaner, key: 'cleaner' },
  { href: Routes.products.meet, key: 'meet' },
  { href: Routes.products.ia, key: 'ia' },
] as const;

export const valueRoutes = [
  { href: Routes.values.privacy, key: 'privacy' },
  { href: Routes.values.openSource, key: 'openSource' },
  { href: Routes.values.sustainability, key: 'sustainability' },
] as const;