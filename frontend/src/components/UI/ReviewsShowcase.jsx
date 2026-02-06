import React, { useState, useEffect } from 'react'

/**
 * Reviews Showcase - Depoimentos com filtros
 */
export default function ReviewsShowcase() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [displayedReviews, setDisplayedReviews] = useState([])

  const allReviews = [
    {
      id: 1,
      name: 'Maria Silva',
      avatar: '👩‍🦰',
      rating: 5,
      service: 'residential',
      text: 'Serviço impecável! A equipe foi pontual, profissional e deixou minha casa brilhando. Super recomendo!',
      date: '2 dias atrás',
      verified: true
    },
    {
      id: 2,
      name: 'João Santos',
      avatar: '👨‍💼',
      rating: 5,
      service: 'commercial',
      text: 'Usamos para nossa limpeza comercial mensal. Sempre pontual, eficiente e ao melhor preço.',
      date: '1 semana atrás',
      verified: true
    },
    {
      id: 3,
      name: 'Ana Costa',
      avatar: '👩‍💻',
      rating: 5,
      service: 'deepclean',
      text: 'Limpeza profunda excelente! Removeu sujeira que eu achava impossível. Muito satisfeita!',
      date: '3 semanas atrás',
      verified: true
    },
    {
      id: 4,
      name: 'Pedro Oliveira',
      avatar: '👨‍🎓',
      rating: 4,
      service: 'residential',
      text: 'Ótimo atendimento, profissionais educados. Único ponto: chegaram 15 min atrasados.',
      date: '1 mês atrás',
      verified: false
    },
    {
      id: 5,
      name: 'Carla Mendes',
      avatar: '👩‍⚕️',
      rating: 5,
      service: 'poswork',
      text: 'Limpeza impecável após reforma. Todos os detalhes foram cuidados. Profissionalismo de alto nível!',
      date: '2 meses atrás',
      verified: true
    },
    {
      id: 6,
      name: 'Lucas Ferreira',
      avatar: '👨‍🔧',
      rating: 5,
      service: 'residential',
      text: 'Agendamento fácil, preço justo, execução perfeita. Já virou minha limpeza fixa!',
      date: '3 meses atrás',
      verified: true
    }
  ]

  const filters = [
    { id: 'all', label: 'Todos (6)', count: 6 },
    { id: 'residential', label: '🏠 Residencial', count: 3 },
    { id: 'commercial', label: '🏢 Comercial', count: 1 },
    { id: 'deepclean', label: '✨ Limpeza Profunda', count: 1 },
    { id: 'poswork', label: '🔨 Pós-Obra', count: 1 }
  ]

  useEffect(() => {
    if (activeFilter === 'all') {
      setDisplayedReviews(allReviews)
    } else {
      setDisplayedReviews(allReviews.filter(r => r.service === activeFilter))
    }
  }, [activeFilter])

  const renderStars = (rating) => {
    return '⭐'.repeat(rating)
  }

  return (
    <div className="w-full py-16 bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-900/10 dark:to-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ⭐ O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Mais de 500 avaliações positivas
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map(review => (
            <div
              key={review.id}
              className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
            >
              {/* Header com avatar e rating */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{review.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.date}
                      {review.verified && ' ✓'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400">{renderStars(review.rating)}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {review.rating}.0
                </span>
              </div>

              {/* Texto */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                "{review.text}"
              </p>

              {/* Badges */}
              {review.verified && (
                <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full font-semibold">
                  ✓ Cliente Verificado
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all hover:scale-105">
            Ver Todas as Avaliações
          </button>
        </div>
      </div>
    </div>
  )
}
