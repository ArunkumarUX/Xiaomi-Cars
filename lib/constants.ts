export const BRAND = {
  name: 'Xiaomi Cars',
  tagline: 'Own Smarter with Xiaomi',
  phone: '+971 4 347 9888',
  whatsapp: '971543479888',
  email: 'hello@xiaomicars.ae',
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
  { label: 'Why Buy', href: '/why-lease' },
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

export const FINANCE_OPTIONS = [
  {
    months: 12 as const,
    label: '12 Months',
    description: 'Short-term finance — lower commitment, higher monthly',
    highlight: false,
    inclusions: [
      'Comprehensive insurance',
      'Free registration',
      'Unlimited mileage',
      '24/7 roadside assistance',
      'Basic service package',
    ]
  },
  {
    months: 24 as const,
    label: '24 Months',
    description: 'Most popular — the perfect balance between cost and term',
    highlight: true,
    inclusions: [
      'Comprehensive insurance',
      'Free registration',
      'Unlimited mileage',
      '24/7 roadside assistance',
      'Full service package',
      '3-year warranty included',
    ]
  },
  {
    months: 36 as const,
    label: '36 Months',
    description: 'Best monthly rate — lowest installment for your Xiaomi',
    highlight: false,
    inclusions: [
      'Comprehensive insurance',
      'Free registration',
      'Unlimited mileage',
      '24/7 roadside assistance',
      'Full service package',
      '5-year warranty included',
      'Personal accident cover',
    ]
  }
]

// Keep for backwards compatibility
export const LEASE_OPTIONS = FINANCE_OPTIONS
