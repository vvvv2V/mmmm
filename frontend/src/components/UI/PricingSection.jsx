import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Básico',
      description: 'Perfeito para começar',
      monthlyPrice: 149,
      annualPrice: 1490,
      features: [
        '1 limpeza por mês',
        'Até 3 cômodos',
        'Produtos padrão',
        'Suporte por email',
        'Cancelamento a qualquer hora'
      ],
      highlighted: false,
      icon: '🌱'
    },
    {
      name: 'Pro',
      description: 'Mais popular',
      monthlyPrice: 299,
      annualPrice: 2990,
      features: [
        '1-2 limpezas por mês',
        'Até 5 cômodos',
        'Produtos eco-friendly',
        'Prioridade no agendamento',
        'Suporte por WhatsApp',
        'Relatório de limpeza',
        'Desconto em extras'
      ],
      highlighted: true,
      icon: '⚡',
      badge: 'Mais Popular'
    },
    {
      name: 'Premium',
      description: 'Completo e executivo',
      monthlyPrice: 499,
      annualPrice: 4990,
      features: [
        'Até 4 limpezas por mês',
        'Até 10+ cômodos',
        'Produtos premium importados',
        'Agendamento ilimitado',
        'Atendente dedicado',
        'Whatsapp 24/7',
        'Fotos antes/depois',
        'Relatório detalhado',
        'Desconto em extras (50%)',
        'Prioridade máxima'
      ],
      highlighted: false,
      icon: '👑'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-slate-900 px-4" id="pricing">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Planos Flexíveis
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Escolha o plano que melhor se adequa às suas necessidades
          </p>

          {/* Toggle Anual/Mensal */}
          <motion.div className="inline-flex items-center gap-4 bg-gray-100 dark:bg-slate-800 rounded-full p-2">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                !isAnnual
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                isAnnual
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Anual
              {isAnnual && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 inline-block bg-green-400 text-white text-xs px-2 py-1 rounded-full"
                >
                  -17% OFF
                </motion.span>
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <AnimatePresence>
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={plan.highlighted ? { scale: 1.05, y: -20 } : { y: -8 }}
                className={`relative rounded-2xl overflow-hidden h-full ${
                  plan.highlighted
                    ? 'md:ring-2 ring-blue-500 md:scale-105'
                    : ''
                }`}
              >
                {/* Card Background */}
                <div
                  className={`relative h-full p-8 border-2 transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-500'
                      : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700'
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-2 rounded-full">
                        {plan.badge}
                      </span>
                    </motion.div>
                  )}

                  {/* Icon */}
                  <div className="text-4xl mb-4">{plan.icon}</div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <motion.div
                      key={isAnnual ? 'annual' : 'monthly'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-baseline gap-1"
                    >
                      <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        R$ {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {isAnnual ? '/ano' : '/mês'}
                      </span>
                    </motion.div>
                    {isAnnual && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-semibold">
                        💰 Economize R$ {(plan.monthlyPrice * 12 * 0.17).toFixed(0)}/ano
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all mb-8 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-blue-500/50'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {plan.highlighted ? 'Escolher Plano ✨' : 'Começar'}
                  </motion.button>

                  {/* Features List */}
                  <div className="space-y-4">
                    {plan.features.map((feature, featureIdx) => (
                      <motion.div
                        key={featureIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIdx * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            delay: 0.2 + featureIdx * 0.05,
                            duration: 0.6
                          }}
                          className="flex-shrink-0"
                        >
                          <Check size={20} className="text-green-500" />
                        </motion.div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
        >
          <p className="text-gray-700 dark:text-gray-300">
            💳 <strong>Sem taxa de inscrição</strong> • Cancele quando quiser • 
            <strong> 30 dias de garantia</strong>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingSection
