export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-black text-white mb-4">Terms & Conditions</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: April 2026</p>
        <div className="space-y-8">
          {[
            { title: '1. Lease Agreement', content: 'All vehicle leases are subject to credit approval and eligibility verification. Xiaomi Leasing UAE reserves the right to decline applications at its discretion.' },
            { title: '2. Monthly Payments', content: 'Monthly lease payments are due on the agreed date via direct debit from a UAE bank account. Late payments may incur penalties as outlined in the lease agreement.' },
            { title: '3. Mileage', content: 'All lease plans include 20,000 km per year. Excess mileage is charged at AED 0.20 per km. Unused mileage does not carry over.' },
            { title: '4. Vehicle Care', content: 'Lessees are responsible for maintaining the vehicle in good condition. Fair wear and tear is accepted; damage beyond this will be assessed at the end of the lease term.' },
            { title: '5. Insurance', content: 'Comprehensive insurance is included in your lease package. The lessee must comply with all insurance requirements and report any incidents within 24 hours.' },
            { title: '6. Early Termination', content: 'Early termination of the lease agreement may be subject to penalties. Please refer to your individual lease contract for specific terms.' },
            { title: '7. Governing Law', content: 'These terms are governed by the laws of the United Arab Emirates. Disputes are subject to the jurisdiction of UAE courts.' },
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
