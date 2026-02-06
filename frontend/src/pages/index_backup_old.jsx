import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import FAQ from '../components/UI/FAQ'
import BlogSection from '../components/UI/BlogSection'
import CTANewsletter from '../components/UI/CTANewsletter'
import FloatingChat from '../components/UI/FloatingChat'
import HeroSectionNew from '../components/UI/HeroSectionNew'
import HowItWorksSection from '../components/UI/HowItWorksSection'
import ServicesGridSection from '../components/UI/ServicesGridSection'
import PricingSection from '../components/UI/PricingSection'
import TestimonialsSection from '../components/UI/TestimonialsSection'
import StatsSection from '../components/UI/StatsSection'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: 'ease-out-cubic'
    })
  }, [])

  return (
    <>
      <Head>
        <title>Leidy Cleaner - Limpeza Profissional em Porto Alegre | Serviços Premium</title>
        <meta name="description" content="Limpeza profissional residencial e comercial em Porto Alegre. Serviços premium com profissionais verificados, produtos eco-friendly e garantia de satisfação. Agende online!" />
        <meta name="keywords" content="limpeza profissional Porto Alegre, diarista, faxina, limpeza residencial, limpeza comercial, limpeza pós obra, produtos ecofriendly" />
        <meta name="author" content="Leidy Cleaner" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="pt-BR" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://leidycleaner.com/" />
        <meta property="og:title" content="Leidy Cleaner - Limpeza Profissional em Porto Alegre" />
        <meta property="og:description" content="Limpeza profissional residencial e comercial em Porto Alegre. Serviços premium com profissionais verificados." />
        <meta property="og:image" content="https://leidycleaner.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://leidycleaner.com/" />
        <meta property="twitter:title" content="Leidy Cleaner - Limpeza Profissional em Porto Alegre" />
        <meta property="twitter:description" content="Limpeza profissional residencial e comercial em Porto Alegre. Serviços premium com profissionais verificados." />
        <meta property="twitter:image" content="https://leidycleaner.com/og-image.jpg" />

        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Leidy Cleaner",
            "description": "Serviços profissionais de limpeza residencial e comercial em Porto Alegre",
            "url": "https://leidycleaner.com",
            "telephone": "+55-51-98030-3740",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Porto Alegre",
              "addressRegion": "RS",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-30.0346",
              "longitude": "-51.2177"
            },
            "openingHours": "Mo-Su 08:00-18:00",
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500"
            },
            "serviceType": ["Limpeza Residencial", "Limpeza Comercial", "Limpeza Profunda"]
          })}
        </script>
      </Head>

      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
        <Header />
        <main className="flex-grow">
          {/* Hero Section Novo - Épico com background animado */}
          <HeroSectionNew />

          <div className="container mx-auto px-4 lg:px-8 space-y-20">
            {/* Statistical Highlights - Números animados */}
            <StatsSection />

            {/* How It Works - 4 passos visuais */}
            <HowItWorksSection />

            {/* Services Grid - 6 serviços expandibles */}
            <ServicesGridSection />

            {/* Pricing Comparator - Anual vs Mensal */}
            <PricingSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* FAQ Section - Accordion */}
            <FAQ />

            {/* Blog Preview - 3 últimos posts */}
            <BlogSection />
          </div>

          {/* Newsletter CTA - Inscrição */}
          <CTANewsletter />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Chat Widget - sempre visível */}
        <FloatingChat />
      </div>
    </>
  )
}
