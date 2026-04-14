'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, MessageCircle } from 'lucide-react'
import { BRAND } from '@/lib/constants'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', carInterest: '', message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Header */}
      <div className="bg-[#1A1A1A] border-b border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-[#E31937]" />
            <span className="text-[#E31937] text-sm font-semibold uppercase tracking-wider">Contact</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
            Get a <span className="text-[#E31937]">Free Quote</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            Our team will prepare a personalised Xiaomi lease offer within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-6 bg-[#1E1E1E] rounded-2xl p-12 border border-[#2E2E2E]">
                <div className="w-20 h-20 bg-[#E31937]/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} className="text-[#E31937]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl mb-2">Message Sent!</h3>
                  <p className="text-gray-400">
                    We&apos;ve received your enquiry. Our team will contact you within 24 hours with a personalised quote.
                  </p>
                </div>
                <button onClick={() => setSubmitted(false)} className="text-[#E31937] text-sm hover:underline">
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#2E2E2E] space-y-5">
                <h2 className="text-white font-bold text-xl mb-2">Enquiry Form</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                      className="w-full bg-[#242424] border border-[#2E2E2E] text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E31937] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Phone *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+971 50 000 0000"
                      className="w-full bg-[#242424] border border-[#2E2E2E] text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E31937] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                    className="w-full bg-[#242424] border border-[#2E2E2E] text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E31937] transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Car of Interest</label>
                  <select name="carInterest" value={form.carInterest} onChange={handleChange}
                    className="w-full bg-[#242424] border border-[#2E2E2E] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E31937] transition-colors appearance-none">
                    <option value="">Select a model...</option>
                    <option>Xiaomi SU7</option>
                    <option>Xiaomi SU7 Pro</option>
                    <option>Xiaomi SU7 Max</option>
                    <option>Xiaomi SU7 Ultra</option>
                    <option>Xiaomi YU7</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your requirements — preferred lease term, budget, etc."
                    className="w-full bg-[#242424] border border-[#2E2E2E] text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E31937] transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-[#E31937] hover:bg-[#C41630] text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(227,25,55,0.3)]">
                  <Send size={18} />
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2E2E2E] space-y-5">
              <h3 className="text-white font-bold text-lg">Contact Us</h3>
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-[#E31937]/10 rounded-xl flex items-center justify-center group-hover:bg-[#E31937] transition-colors">
                  <Phone size={18} className="text-[#E31937] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Call Us</div>
                  <div className="text-white font-semibold">{BRAND.phone}</div>
                </div>
              </a>
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-[#25D366]/10 rounded-xl flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                  <MessageCircle size={18} className="text-[#25D366] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs">WhatsApp</div>
                  <div className="text-white font-semibold">Chat Now</div>
                </div>
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-[#E31937]/10 rounded-xl flex items-center justify-center group-hover:bg-[#E31937] transition-colors">
                  <Mail size={18} className="text-[#E31937] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Email</div>
                  <div className="text-white font-semibold">{BRAND.email}</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#E31937]/10 rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-[#E31937]" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Office</div>
                  <div className="text-white font-semibold">{BRAND.address}</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2E2E2E]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[#E31937]/10 rounded-xl flex items-center justify-center">
                  <Clock size={16} className="text-[#E31937]" />
                </div>
                <h3 className="text-white font-bold">Working Hours</h3>
              </div>
              <div className="space-y-3">
                {[
                  { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
                  { day: 'Saturday', hours: '10:00 AM – 5:00 PM' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{s.day}</span>
                    <span className={`text-sm font-medium ${s.hours === 'Closed' ? 'text-red-400' : 'text-[#E31937]'}`}>{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-[#1E1E1E] rounded-2xl border border-[#2E2E2E] overflow-hidden aspect-video flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-[#E31937]/40 mx-auto mb-2" />
                <div className="text-gray-500 text-sm">Dubai Silicon Oasis</div>
                <a href={BRAND.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="text-[#E31937] text-xs mt-1 block hover:underline">
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
