import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Building2, Sparkles, RotateCw, Layers, Hammer } from 'lucide-react'

export const ServicesGridSection = () => {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      id: 1,
      title: 'Limpeza Residencial',
      icon: Home,
      description: 'Limpeza completa para apartamentos e casas com atenção aos detalhes',
      details: 'Abrange todos os cômodos, móveis, acabamentos. Produtos seguros para a família.',
      price: 'A partir de R$ 120',
      popular: false,
      image: '/images/service-cleaning.svg'
    },
    {
      id: 2,
      title: 'Limpeza Profunda',
      icon: Sparkles,
      description: 'Higienização profunda para sujeiras incrustadas e manutenção pesada',
      details: 'Higienização de móveis, carpetes e cortinas. Desinfecção completa.',
      price: 'A partir de R$ 200',
      popular: true,
      image: '/images/service-cleaning.svg'
    },
    {
      id: 3,
      title: 'Pós-Mudança',
      icon: Layers,
      description: 'Preparação e limpeza especializada após mudança ou reforma',
      details: 'Remoção de resíduos, poeira e acabamentos. Pronto para uso.',
      price: 'A partir de R$ 180',
      popular: false,
      image: '/images/service-cleaning.svg'
    },
    {
      id: 4,
      title: 'Manutenção Periódica',
      icon: RotateCw,
      description: 'Limpeza regular semanal ou mensal para manter tudo sempre limpo',
      details: 'Agendamentos recorrentes. Descontos para contratos mensais/anuais.',
      price: 'A partir de R$ 100',
      popular: false,
      image: '/images/service-cleaning.svg'
    },
    {
      id: 5,
      title: 'Pós-Reforma',
      icon: Hammer,
      description: 'Limpeza especializada pós-obra, remoção de resíduos construtivos',
      details: 'Uso de equipamentos profissionais e produtos específicos.',
      price: 'A partir de R$ 250',
      popular: false,
      image: '/images/service-cleaning.svg'
    },
    {
      id: 6,
      title: 'Encanamento & Reparos',
      icon: Building2,
      description: 'Pequenos reparos e manutenção de encanamentos',
      details: 'Atendimento rápido para vazamentos, troca de peças e manutenção.',
      price: 'Sob consulta',
      popular: false,
      image: '/images/service-plumbing.svg'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-20 sm:py-32 bg-white dark:bg-slate-900 px-4" id="servicos">
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
            Nossos Serviços Premium
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Escolha o serviço que melhor atende às suas necessidades de limpeza
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, idx) => {
            const Icon = service.icon
            const isSelected = selectedService === idx

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -12 }}
                onClick={() => setSelectedService(isSelected ? null : idx)}
                className="cursor-pointer"
              >
                <div
                  className={`relative h-full rounded-2xl p-8 transition-all duration-300 overflow-hidden group ${
                    isSelected || service.popular
                      ? 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 ring-2 ring-blue-500'
                      : 'bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500'
                  }`}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <span className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Popular
                      </span>
                    </motion.div>
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={isSelected ? { rotate: 8, scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 w-fit rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40"
                  >
                    <Icon size={40} className="text-blue-600 dark:text-blue-400" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>

                  {/* Price */}
                  <motion.div
                    className="mb-4"
                    animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
                  >
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {service.price}
                    </p>
                  </motion.div>

                  {/* Expandable Details */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      isSelected
                        ? { height: 'auto', opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {service.details}
                      </p>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href="/agendar"
                        className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      >
                        Agendar Agora →
                      </motion.a>
                    </div>
                  </motion.div>

                  {/* Background Gradient Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity -z-10"
                    animate={isSelected ? { x: [0, 10, 0] } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Não encontrou o serviço que procura?
          </p>
          <a
            href="/agendar"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
          >
            Solicitar Orçamento Personalizado
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesGridSection
