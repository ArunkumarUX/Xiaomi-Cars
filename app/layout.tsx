import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AIConcierge from '@/components/ai/AIConcierge'
import FloatingLeaseChatbot from '@/components/ai/FloatingLeaseChatbot'
import FloatingHub from '@/components/ai/FloatingHub'
import Providers from '@/components/providers'

export const metadata: Metadata = {
  title: 'Xiaomi Leasing UAE | Electric Car Leasing in Dubai',
  description:
    'Lease your Xiaomi electric vehicle in Dubai with zero down payment, full insurance, and free registration. SU7, SU7 Ultra & YU7 from AED 999/month.',
  keywords: ['Xiaomi leasing UAE', 'Xiaomi SU7 lease Dubai', 'electric car lease UAE', 'EV leasing Dubai'],
  openGraph: {
    title: 'Xiaomi Leasing UAE | Electric Car Leasing in Dubai',
    description: 'Drive a Xiaomi EV from AED 1,099/month. No down payment. Full insurance. Free registration.',
    type: 'website',
    locale: 'en_AE',
    siteName: 'Xiaomi Leasing UAE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AIConcierge hideFab />
          <FloatingLeaseChatbot hideFab />
          <FloatingHub />
        </Providers>
      </body>
    </html>
  )
}
