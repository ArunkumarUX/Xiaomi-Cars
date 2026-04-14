export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-black text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: April 2026</p>
        <div className="prose prose-invert max-w-none space-y-8">
          {[
            { title: '1. Information We Collect', content: 'We collect personal information you provide when submitting lease enquiries, including your name, phone number, email address, and vehicle preferences. We also collect usage data to improve our website performance.' },
            { title: '2. How We Use Your Information', content: 'Your information is used solely to process your lease enquiry, contact you with a personalised quote, and improve our services. We do not sell your data to third parties.' },
            { title: '3. Data Security', content: 'We implement industry-standard security measures to protect your personal information from unauthorised access, alteration, or disclosure.' },
            { title: '4. Cookies', content: 'We use cookies to enhance your browsing experience and analyse website traffic. You may disable cookies in your browser settings.' },
            { title: '5. Contact Us', content: 'For privacy-related queries, please contact us at hello@xiaomileasing.ae or call +971 4 347 9888.' },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
              <p className="text-gray-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
