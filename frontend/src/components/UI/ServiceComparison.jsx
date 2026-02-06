import React, { useState } from 'react'

/**
 * Service Comparison Matrix
 */
export default function ServiceComparison() {
  const [selectedServices, setSelectedServices] = useState(['residential', 'commercial'])

  const services = {
    residential: {
      name: '🏠 Limpeza Residencial',
      price: 'A partir de R$ 150',
      features: [
        { icon: '✓', text: 'Sala, quartos, cozinha', included: true },
        { icon: '✓', text: 'Banheiros completos', included: true },
        { icon: '✓', text: 'Limpeza de pisos', included: true },
        { icon: '✓', text: 'Organização', included: false },
        { icon: '✓', text: 'Superfícies altas', included: true },
        { icon: '✓', text: 'Limpeza de vidros', included: false }
      ],
      duration: '2-4 horas',
      professionals: '1-2 pessoas',
      color: 'from-blue-400 to-blue-600'
    },
    commercial: {
      name: '🏢 Limpeza Comercial',
      price: 'A partir de R$ 300',
      features: [
        { icon: '✓', text: 'Escritórios, salas', included: true },
        { icon: '✓', text: 'Banheiros comerciais', included: true },
        { icon: '✓', text: 'Pisos comerciais', included: true },
        { icon: '✓', text: 'Cozinha corporativa', included: true },
        { icon: '✓', text: 'Desinfecção', included: true },
        { icon: '✓', text: 'Serviço recorrente', included: true }
      ],
      duration: 'Customizável',
      professionals: '2-4 pessoas',
      color: 'from-purple-400 to-purple-600'
    },
    deepclean: {
      name: '✨ Limpeza Profunda',
      price: 'A partir de R$ 200',
      features: [
        { icon: '✓', text: 'Limpeza completa', included: true },
        { icon: '✓', text: 'Sofás e estofados', included: true },
        { icon: '✓', text: 'Carpetes e tapetes', included: true },
        { icon: '✓', text: 'Climatizador/AC', included: true },
        { icon: '✓', text: 'Janelas internas/externas', included: true },
        { icon: '✓', text: 'Desinfecção', included: true }
      ],
      duration: '4-6 horas',
      professionals: '2-3 pessoas',
      color: 'from-green-400 to-green-600'
    },
    poswork: {
      name: '🔨 Limpeza Pós-Obra',
      price: 'A partir de R$ 250',
      features: [
        { icon: '✓', text: 'Remoção de pó e reboco', included: true },
        { icon: '✓', text: 'Limpeza de vidros', included: true },
        { icon: '✓', text: 'Pisos e rodapés', included: true },
        { icon: '✓', text: 'Remoção de sujeira fina', included: true },
        { icon: '✓', text: 'Sanitização completa', included: true },
        { icon: '✓', text: 'Acabamento premium', included: true }
      ],
      duration: '4-8 horas',
      professionals: '3-5 pessoas',
      color: 'from-orange-400 to-orange-600'
    }
  }

  const serviceKeys = ['residential', 'commercial', 'deepclean', 'poswork']

  const toggleService = (key) => {
    setSelectedServices(prev =>
      prev.includes(key)
        ? prev.filter(s => s !== key)
        : [...prev, key]
    )
  }

  const getMaxFeatures = () => {
    return Math.max(...selectedServices.map(key => services[key].features.length))
  }

  return (
    <div className="w-full py-16 bg-gray-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔄 Compare Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Escolha qual serviço melhor atende suas necessidades
          </p>

          {/* Service Toggle */}
          <div className="flex flex-wrap gap-3 justify-center">
            {serviceKeys.map(key => (
              <button
                key={key}
                onClick={() => toggleService(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedServices.includes(key)
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-400'
                }`}
              >
                {services[key].name.split(' ')[0]} {services[key].name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedServices.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {selectedServices.map(key => {
                const service = services[key]
                return (
                  <div
                    key={key}
                    className={`rounded-2xl overflow-hidden shadow-lg border-2 border-purple-300 dark:border-purple-600 bg-gradient-to-br ${service.color}`}
                  >
                    {/* Header */}
                    <div className="p-6 bg-white dark:bg-slate-800 border-b-2 border-purple-300 dark:border-purple-600">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {service.name}
                      </h3>
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {service.price}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="p-6 bg-white/95 dark:bg-slate-800/95">
                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">⏱️ DURAÇÃO</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {service.duration}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">👥 PROFISSIONAIS</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {service.professionals}
                          </p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-gray-600 dark:text-gray-400">O QUE ESTÁ INCLUÍDO:</p>
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 p-2 rounded-lg ${
                              feature.included
                                ? 'bg-green-100 dark:bg-green-900/30'
                                : 'bg-gray-100 dark:bg-gray-700 opacity-50'
                            }`}
                          >
                            <span className={feature.included ? 'text-green-600' : 'text-gray-400'}>
                              {feature.included ? '✓' : '○'}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg font-bold hover:shadow-lg transition-all">
                        Solicitar Orçamento
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Selecione ao menos um serviço para comparar
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
