import HeroSection from '@/components/home/HeroSection'
import FeaturedCars from '@/components/home/FeaturedCars'
import TechSection from '@/components/home/TechSection'
import WhyLeaseSection from '@/components/home/WhyLeaseSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import EligibilitySection from '@/components/home/EligibilitySection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ContactSection from '@/components/home/ContactSection'
import FaqSection from '@/components/home/FaqSection'

export default function HomePage() {
  return (
    <main className="relative" style={{ overflowX: 'hidden' }}>
      {/* 1. HOOK — emotion + price + 3-step promise */}
      <HeroSection />

      {/* 2. PRODUCT — see the actual cars, build desire */}
      <FeaturedCars />

      {/* 3. VALUE PROPOSITION — leasing beats buying, here's why */}
      <WhyLeaseSection />

      {/* 4. SIMPLICITY — it's only 4 steps, don't overthink it */}
      <HowItWorksSection />

      {/* 5. ELIGIBILITY — remove the "do I qualify?" objection */}
      <EligibilitySection />

      {/* 6. SOCIAL PROOF — real customers, real stories */}
      <TestimonialsSection />

      {/* 7. CLOSING CTA — get a quote, capture the lead */}
      <ContactSection />

      {/* 8. LAST MILE — handle final doubts before they leave */}
      <FaqSection />

      {/* 9. WOW CLOSER — world-class tech & why Xiaomi, right before footer */}
      <TechSection />
    </main>
  )
}
