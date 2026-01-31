import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import PersonalizationPanel from '../components/UI/PersonalizationPanel'

export default function Home(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="card grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="space-y-4">
              <div className="kicker">Serviço Premium</div>
              <h1 className="text-3xl md:text-4xl font-bold">Casa limpa. Vida leve.</h1>
              <p className="lead muted">Agende uma limpeza profissional rápida e personalizável. Profissionais verificados, preços transparentes e lembretes automáticos.</p>
              <div className="flex items-center gap-3 mt-3">
                <a href="/agendar" className="btn-primary">Agendar Agora</a>
                <a href="/servicos" className="btn-outline">Ver serviços</a>
              </div>
              <div className="mt-4 text-sm muted">Atendimento em Porto Alegre • Suporte 24/7</div>
            </div>

            <div className="flex justify-center items-center">
              <div className="w-56 h-56 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M3 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 7h6v9a1 1 0 01-1 1H10a1 1 0 01-1-1V7z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 11h2v2h-2z" fill="rgba(255,255,255,0.9)"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
