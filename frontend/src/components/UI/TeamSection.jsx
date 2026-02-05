/**
 * Team Showcase Component
 * Apresenta os principais profissionais da plataforma
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const team = [
    {
      id: 1,
      name: 'Leidy Silva',
      role: 'Diretora Executiva',
      expertise: 'Limpeza Profissional',
      rating: 4.9,
      reviews: 250,
      specialties: ['Residencial', 'Comercial', 'Pós-Obra'],
      image: '👨‍💼',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Ana Costa',
      role: 'Especialista Sênior',
      expertise: 'Limpeza Profunda',
      rating: 4.95,
      reviews: 180,
      specialties: ['Residencial', 'Manutenção', 'Desinfecção'],
      image: '👩‍💼',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 3,
      name: 'Carlos Santos',
      role: 'Especialista Técnico',
      expertise: 'Limpeza Comercial',
      rating: 4.88,
      reviews: 160,
      specialties: ['Comercial', 'Industrial', 'Manutenção'],
      image: '👨‍💼',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      name: 'Maria Oliveira',
      role: 'Coordenadora de Qualidade',
      expertise: 'Garantia de Satisfação',
      rating: 4.92,
      reviews: 220,
      specialties: ['Qualidade', 'Atendimento', 'Satisfação'],
      image: '👩‍💼',
      color: 'from-green-500 to-green-600'
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold mb-6">
            👥 Nosso Time
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Profissionais Experientes e Qualificados
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Conheça os especialistas que garantem qualidade em cada limpeza
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group"
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.05 }}
                className={`relative h-full bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                {/* Gradient Background on Hover */}
                {hoveredIndex === index && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-5`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                  />
                )}

                {/* Avatar */}
                <motion.div
                  animate={hoveredIndex === index ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                  className={`relative z-10 w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-6xl bg-gradient-to-br ${member.color} shadow-lg`}
                >
                  {member.image}
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className={`text-sm font-semibold bg-gradient-to-r ${member.color} text-transparent bg-clip-text mb-1`}>
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {member.expertise}
                  </p>

                  {/* Rating */}
                  <motion.div
                    animate={hoveredIndex === index ? { scale: 1.1 } : { scale: 1 }}
                    className="flex items-center justify-center gap-2 mb-4"
                  >
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {member.rating}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      ({member.reviews} avaliações)
                    </span>
                  </motion.div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {member.specialties.map((specialty, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={hoveredIndex === index ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.9 }}
                        transition={{ delay: i * 0.05 }}
                        className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${member.color} text-white`}
                      >
                        {specialty}
                      </motion.span>
                    ))}
                  </div>

                  {/* Button */}
                  {hoveredIndex === index && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r ${member.color} hover:shadow-lg transition`}
                    >
                      Ver Histórico
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Profissionais Verificados', value: '50+' },
              { label: 'Média de Avaliação', value: '4.9★' },
              { label: 'Clientes Satisfeitos', value: '2500+' },
              { label: 'Serviços Realizados', value: '10K+' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Encontre o profissional ideal para sua limpeza
          </p>
          <Link href="/agendar">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 px-12 rounded-xl hover:shadow-xl transition cursor-pointer"
            >
              <span>🔍</span>
              <span>Consultar Profissional</span>
              <span>→</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
