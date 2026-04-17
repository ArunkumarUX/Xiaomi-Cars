export interface ColorVariant {
  name: string
  hex: string
  image: string
}

export interface Car {
  id: string
  slug: string
  brand: string
  model: string
  fullName: string
  year: number
  bodyType: 'Sedan' | 'SUV' | 'Coupe' | 'Hatchback' | 'Crossover'
  fuelType: 'Electric' | 'Petrol' | 'Hybrid'
  doors: number
  condition: 'New' | 'Pre-Owned'
  range?: string
  acceleration?: string
  topSpeed?: string
  horsepower?: string
  battery?: string
  price: number
  pricePerMonth: { 12: number; 24: number; 36: number }
  images: string[]
  colors: string[]
  colorVariants: ColorVariant[]
  features: string[]
  badge?: string
  description: string
  isFeatured?: boolean
}

export interface LeadEnquiry {
  name: string
  phone: string
  email: string
  carInterest?: string
  message?: string
  createdAt: Date
}

export interface LeaseOption {
  months: 12 | 24 | 36
  label: string
  description: string
  highlight?: boolean
  inclusions: string[]
}

export interface Testimonial {
  id: string
  name: string
  rating: number
  review: string
  car: string
  location: string
  avatar: string
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
}
