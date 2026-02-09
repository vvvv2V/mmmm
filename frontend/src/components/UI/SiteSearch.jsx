import React, { useState } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function SiteSearch({ className = '' }) {
  const [q, setQ] = useState('')
  const router = useRouter()

  const onSubmit = (e) => {
    e.preventDefault()
    if (!q || q.trim().length === 0) return
    // Redireciona para página de busca (pode ser indexada para serviços/faq)
    router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <form onSubmit={onSubmit} className={`relative hidden md:flex items-center ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Image src="/icon-brand.jpg" alt="logo" width={20} height={20} className="rounded-full" />
      </div>
      <input
        aria-label="Buscar no site"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar serviços, dúvidas ou artigos..."
        className="pl-10 pr-10 py-2 rounded-full border border-slate-200 bg-white text-sm w-72 focus:ring-2 focus:ring-primary-300 focus:outline-none"
      />
      <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 rounded-full bg-primary-600 text-white hidden sm:inline-flex items-center gap-2">
        <Search className="w-4 h-4" />
      </button>
    </form>
  )
}
