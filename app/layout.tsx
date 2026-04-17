import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AIConcierge from '@/components/ai/AIConcierge'
import FloatingLeaseChatbot from '@/components/ai/FloatingLeaseChatbot'
import FloatingHub from '@/components/ai/FloatingHub'
import Providers from '@/components/providers'

export const metadata: Metadata = {
  title: 'Xiaomi Cars UAE | Buy Xiaomi Cars in Dubai',
  description:
    'Buy your Xiaomi car in Dubai. SU7, SU7 Ultra & YU7 with flexible financing, full warranty, and free registration. From AED 129,900.',
  keywords: ['Xiaomi cars UAE', 'buy Xiaomi SU7 Dubai', 'Xiaomi car UAE', 'Xiaomi Cars Dubai', 'buy car Dubai'],
  openGraph: {
    title: 'Xiaomi Cars UAE | Buy Xiaomi Cars in Dubai',
    description: 'Own a Xiaomi Car from AED 129,900. Flexible financing. Full warranty. Free registration.',
    type: 'website',
    locale: 'en_AE',
    siteName: 'Xiaomi Cars UAE',
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
