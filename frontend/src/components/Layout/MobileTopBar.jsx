import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { useRouter } from 'next/router'

export default function MobileTopBar() {
  const [openSearch, setOpenSearch] = useState(false)
  const [q, setQ] = useState('')
  const router = useRouter()

  const submitSearch = (e) => {
    e && e.preventDefault()
    if (!q || q.trim().length === 0) return setOpenSearch(false)
    router.push(`/search?q=${encodeURIComponent(q.trim())}`)
    setOpenSearch(false)
  }

  return (
    <>
      <header className="mobile-only fixed top-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative rounded-lg overflow-hidden">
                <Image src="/images/logo.svg" alt="Leidy Cleaner" width={40} height={40} />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-black text-gray-900 dark:text-white">Leidy Cleaner</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Limpeza Premium</div>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button onClick={() => setOpenSearch(true)} aria-label="Abrir busca" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
              <Search className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            </button>
            <Link href="/agendar">
              <a className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold">📅 Agendar</a>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile search modal */}
      {openSearch && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start pt-24 px-4">
          <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-xl p-4 shadow-xl">
            <form onSubmit={submitSearch} className="flex items-center gap-3">
              <img src="/icon-brand.jpg" alt="logo" className="w-8 h-8 rounded-full" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar serviços, dúvidas ou artigos..."
                className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button type="button" onClick={() => { setQ(''); setOpenSearch(false) }} className="px-3 py-2 rounded-md text-sm">Cancelar</button>
            </form>
            <div className="mt-4 text-sm text-slate-600">Dicas: busque por "faxina", "limpeza pós-obra", "preço" ou número do serviço.</div>
          </div>
        </div>
      )}
    </>
  )
}
