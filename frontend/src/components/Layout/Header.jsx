import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import ThemeSelector from '../UI/ThemeSelector';

/**
 * Header Component - Premium com logo visual
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/servicos', label: 'Servicos', icon: '✨' },
    { href: '/agendar', label: 'Agendar', icon: '📅' },
    { href: '/dashboard', label: 'Minha Conta', icon: '👤' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 border-b border-purple-700/30 shadow-2xl desktop-only">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo + Brand with Theme Image */}
          <Link href="/">
            <div className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
              {/* Brand Image - Circular with Border */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl overflow-hidden border-2 border-purple-300/50 hover:border-purple-400/80 transition-all">
                <Image 
                  src="/images/theme-brand.jpg" 
                  alt="Leidy Cleaner Brand" 
                  width={64} 
                  height={64} 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
              </div>
              {/* Text Brand */}
              <div>
                <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
                  Leidy Cleaner
                </h1>
                <p className="text-xs sm:text-sm text-purple-200/80 dark:text-purple-300/80 font-medium">
                  Limpeza Profissional Premium
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="px-4 py-2 rounded-lg text-purple-100 dark:text-purple-200 hover:bg-purple-500/30 dark:hover:bg-purple-600/40 hover:text-white dark:hover:text-white transition-all font-medium flex items-center gap-2 group">
                  <span className="group-hover:scale-125 transition-transform">{link.icon}</span>
                  {link.label}
                </div>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeSelector />
            <Link href="/agendar">
              <div className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-2xl hover:scale-105 transition-all font-bold text-sm shadow-lg hover:from-cyan-400 hover:to-purple-400">
                <span>📅</span>
                Agendar
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 hover:bg-purple-500/30 dark:hover:bg-purple-600/40 rounded-xl transition-all"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6 text-purple-100 dark:text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2 border-t border-purple-600/30 pt-4 animate-in fade-in slide-up">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div 
                  className="block px-4 py-3 text-purple-100 dark:text-purple-200 hover:bg-purple-500/30 dark:hover:bg-purple-600/40 hover:text-white dark:hover:text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </div>
              </Link>
            ))}
            <Link href="/agendar">
              <div 
                className="block px-4 py-3 mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-bold text-center hover:shadow-lg transition-all hover:from-cyan-400 hover:to-purple-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Agendar Agora
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
