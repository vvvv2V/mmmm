/**
 * Video Testimonials Section
 * Apresenta depoimentos de clientes com videos e imagens
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      title: 'Gerente de Projetos',
      content: 'O serviço foi excelente! Minha casa ficou impecável e os profissionais foram muito atenciosos.',
      rating: 5,
      image: '👩‍💼',
      avatar: 'MS',
      color: 'from-pink-500 to-pink-600',
      highlight: 'Serviço excelente e profissional'
    },
    {
      id: 2,
      name: 'João Santos',
      title: 'Empresário',
      content: 'Contratei para meu escritório e o resultado superou expectativas. Pontual, responsável e impecável!',
      rating: 5,
      image: '👨‍💼',
      avatar: 'JS',
      color: 'from-blue-500 to-blue-600',
      highlight: 'Profissionalismo sem igual'
    },
    {
      id: 3,
      name: 'Ana Costa',
      title: 'Médica',
      content: 'Uso regularmente e adoro! Segurança, qualidade e confiança. Equipe sempre pontual.',
      rating: 5,
      image: '👩‍⚕️',
      avatar: 'AC',
      color: 'from-green-500 to-green-600',
      highlight: 'Confiabilidade garantida'
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      title: 'Advogado',
      content: 'Melhor decisão! Economizei tempo e dinheiro. O atendimento é fantástico e responsivo.',
      rating: 5,
      image: '👨‍⚖️',
      avatar: 'CO',
      color: 'from-purple-500 to-purple-600',
      highlight: 'Economia e qualidade'
    }
  ]

  const currentTestimonial = testimonials[selectedVideo]

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-white via-gray-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-pink-600 to-red-500 text-white px-6 py-2 rounded-full font-semibold mb-6">
            💬 Depoimentos
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Histórias reais de clientes satisfeitos que transformaram suas rotinas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Video/Testimonial */}
          <AnimatePresence>
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className={`relative bg-gradient-to-br ${currentTestimonial.color} rounded-3xl overflow-hidden shadow-2xl`}>
                {/* Video Container */}
                <div className="relative w-full aspect-video bg-gray-900 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-8xl"
                  >
                    {currentTestimonial.image}
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Testimonial Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 text-white relative z-10"
                >
                  <motion.div
                    className="flex items-center gap-4 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-bold text-xl text-white shadow-lg">
                      {currentTestimonial.avatar}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{currentTestimonial.name}</h3>
                      <p className="text-white/80">{currentTestimonial.title}</p>
                    </div>
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    className="flex gap-1 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                        className="text-3xl"
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Highlight */}
                  <motion.p
                    className="text-lg font-semibold mb-6 italic text-white/95 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    "{currentTestimonial.highlight}"
                  </motion.p>

                  {/* Full Content */}
                  <motion.p
                    className="text-lg text-white/90 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {currentTestimonial.content}
                  </motion.p>
                </motion.div>

                {/* Navigation Buttons */}
                <div className="absolute top-6 right-6 flex gap-2 z-20">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedVideo((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-xl hover:bg-white/30 transition"
                  >
                    ←
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedVideo((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-xl hover:bg-white/30 transition"
                  >
                    →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Cards Sidebar */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5★ Avaliações
            </h3>
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                variants={itemVariants}
                onClick={() => setSelectedVideo(index)}
                whileHover={{ scale: 1.05, x: 8 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                  selectedVideo === index
                    ? `bg-gradient-to-r ${testimonial.color} text-white border-transparent shadow-lg`
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${selectedVideo === index ? 'bg-white/20' : `bg-gradient-to-br ${testimonial.color}`} ${selectedVideo !== index && 'text-white'}`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className={`text-xs ${selectedVideo === index ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                      ⭐ {testimonial.rating}.0
                    </p>
                  </div>
                </div>
                {selectedVideo === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm text-white/90 line-clamp-2 mt-2"
                  >
                    {testimonial.content}
                  </motion.p>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Stats Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-pink-500 via-red-500 to-red-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Satisfação Garantida</h3>
          <p className="text-xl text-white/90 mb-8">
            Mais de 500 clientes avaliam nossos serviços com 5 estrelas
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: 'Clientes', value: '500+' },
              { label: 'Avaliação', value: '4.9★' },
              { label: 'Satisfação', value: '99%' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Junte-se aos milhares de clientes satisfeitos
          </p>
          <Link href="/agendar">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-red-500 text-white font-bold py-4 px-12 rounded-xl hover:shadow-xl transition cursor-pointer"
            >
              <span>📅</span>
              <span>Agende Seu Serviço Agora</span>
              <span>→</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
