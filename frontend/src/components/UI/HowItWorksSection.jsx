import React from 'react'
import { motion } from 'framer-motion'

export const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      icon: '📅',
      title: 'Escolha a Data',
      description: 'Selecione a data e horário que melhor se adequam à sua rotina'
    },
    {
      number: 2,
      icon: '🏠',
      title: 'Descreva o Espaço',
      description: 'Indique o tipo de imóvel, tamanho e áreas prioritárias para limpeza'
    },
    {
      number: 3,
      icon: '💳',
      title: 'Confirme o Pagamento',
      description: 'Receba o orçamento final e confirme através de Stripe, Pix ou dinheiro'
    },
    {
      number: 4,
      icon: '✨',
      title: 'Aproveite',
      description: 'Nossa equipe chega no horário marcado e deixa tudo impecável'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
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
    <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 px-4">
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
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Agendamento simples em 4 passos. Rápido, fácil e seguro.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="relative"
            >
              
              {/* Step Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 h-full border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors relative z-10">
                
                {/* Large Number Background */}
                <div className="absolute top-0 right-0 text-8xl font-bold text-gray-100 dark:text-slate-700 opacity-50 -mr-4 -mt-4 select-none">
                  {String(step.number).padStart(2, '0')}
                </div>

                {/* Icon Circle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, linear: true }}
                  className="relative w-20 h-20 mb-6 mx-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-lg" />
                  <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl shadow-lg transform">
                    {step.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-20">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line (hidden on last item) */}
              {idx < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-16 left-[110%] w-[calc(100%+2rem)] h-1 bg-gradient-to-r from-blue-500 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/agendar"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
          >
            Comece Agora →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorksSection
