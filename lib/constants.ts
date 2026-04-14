export const BRAND = {
  name: 'Xiaomi Leasing',
  tagline: 'Drive Smarter with Xiaomi',
  phone: '+971 4 347 9888',
  whatsapp: '971543479888',
  email: 'hello@xiaomileasing.ae',
  address: 'Dubai Silicon Oasis, Dubai, UAE',
  mapUrl: 'https://maps.google.com/?q=Dubai+Silicon+Oasis,Dubai,UAE',
  social: {
    instagram: 'https://www.instagram.com/xiaomi/',
    facebook: 'https://www.facebook.com/xiaomi/',
    linkedin: 'https://www.linkedin.com/company/xiaomi/',
    youtube: 'https://www.youtube.com/@XiaomiGlobal',
    twitter: 'https://twitter.com/Xiaomi',
  }
}

export const COLORS = {
  orange: '#FF6900',
  orangeDark: '#E55C00',
  dark: '#1A1A1A',
  card: '#242424',
  border: '#2E2E2E',
  white: '#FFFFFF',
  gray: '#555555',
  grayLight: '#888888',
  light: '#F5F5F5',
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Our Cars', href: '/cars' },
  { label: 'Why Lease', href: '/why-lease' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const STATS = [
  { value: '100+', label: 'Countries with Xiaomi', suffix: '' },
  { value: '500+', label: 'Vehicles Available', suffix: '' },
  { value: '2024', label: 'Launched in UAE', suffix: '' },
]

export const BODY_TYPES = ['All', 'Sedan', 'SUV', 'Coupe', 'Crossover']
export const CONDITIONS = ['All', 'New', 'Pre-Owned']
export const BRANDS = ['All', 'Xiaomi']

export const LEASE_OPTIONS = [
  {
    months: 12 as const,
    label: '12 Months',
    description: 'Perfect for flexibility — ideal if your needs may change',
    highlight: false,
    inclusions: [
      'Comprehensive insurance',
      'Free registration',
      '20,000 km/year',
      '24/7 roadside assistance',
      'Basic maintenance',
    ]
  },
  {
    months: 24 as const,
    label: '24 Months',
    description: 'Most popular — the perfect balance of savings and flexibility',
    highlight: true,
    inclusions: [
      'Comprehensive insurance',
      'Free registration',
      '20,000 km/year',
      '24/7 roadside assistance',
      'Full maintenance package',
      'ILOE cover included',
    ]
  },
  {
    months: 36 as const,
    label: '36 Months',
    description: 'Best value per month — maximum savings for stable drivers',
    highlight: false,
    inclusions: [
      'Comprehensive insurance',
      'Free registration',
      '20,000 km/year',
      '24/7 roadside assistance',
      'Full maintenance package',
      'ILOE cover included',
      'Personal accident insurance',
    ]
  }
]
