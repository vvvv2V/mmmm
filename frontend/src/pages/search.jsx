import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

export default function SearchPage() {
  const router = useRouter()
  const { q } = router.query

  const query = (q || '').toString()

  return (
    <>
      <Head>
        <title>Buscar - Leidy Cleaner</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Resultados para: "{query}"</h1>
        <p className="text-gray-600 mb-6">Aqui estão resultados rápidos que combinam com sua pesquisa.</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Serviços</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/servicos">
                <a className="text-primary-600 hover:underline">Ver lista de serviços</a>
              </Link>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Perguntas Frequentes</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/#faq">
                <a className="text-primary-600 hover:underline">Ir para FAQ</a>
              </Link>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Artigos e Blog</h2>
          <p className="text-gray-600">Em breve: busca por posts do blog.</p>
        </section>

        <div className="mt-12">
          <Link href="/">
            <a className="text-sm text-gray-500 hover:underline">Voltar para a página inicial</a>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}
