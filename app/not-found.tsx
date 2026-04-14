import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-9xl font-black text-[#E31937]/20 mb-4">404</div>
        <h1 className="text-4xl font-black text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#E31937] hover:bg-[#C41630] text-white font-semibold px-6 py-3 rounded-xl transition-all"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
