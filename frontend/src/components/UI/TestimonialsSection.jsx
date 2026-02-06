import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

export const TestimonialsSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Apartamento 4 quartos',
      image: 'MS',
      text: 'Minha casa nunca ficou tão limpa! A equipe foi muito pontual, profissional e atenciosa. Produtos de qualidade e a limpeza foi perfeita. Super recomendo!',
      rating: 5,
      date: 'Jan 2025'
    },
    {
      name: 'Ana Costa',
      role: 'Casa comercial',
      image: 'AC',
      text: 'Serviço rápido, impecável e com muito cuidado. Deixaram tudo brilhando! O atendimento foi excelente e consegui agendar facilmente pelo app.',
      rating: 5,
      date: 'Dez 2024'
    },
    {
      name: 'João Santos',
      role: 'Escritório 6 salas',
      image: 'JS',
      text: 'Melhor escolha que já fiz para minha empresa. A equipe chega sempre no horário, deixa tudo impecável. Preço justo e transparente.',
      rating: 5,
      date: 'Nov 2024'
    },
    {
      name: 'Carla Mendes',
      role: 'Apartamento penthouse',
      image: 'CM',
      text: 'Acabei de descobrir vocês e já sou fã! Profissionais educados, equipamento moderno, produtos eco-friendly. Que serviço maravilhoso!',
      rating: 5,
      date: 'Out 2024'
    },
    {
      name: 'Alberto Junior',
      role: 'Após-reforma residencial',
      image: 'AJ',
      text: 'Contratei para limpar após reforma e ficou do jeito que eu queria. Muito profissional, trabalharam com cuidado. Voltarei a chamar!',
      rating: 5,
      date: 'Set 2024'
    }
  ]

  // Auto-play carrossel
  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay, testimonials.length])

  const handlePrev = () => {
    setAutoPlay(false)
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoPlay(false)
    setCurrentIdx((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 px-4" id="testimonials">
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
            Nossos Clientes Amam
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Confira o que as famílias e empresas de Porto Alegre dizem sobre nossos serviços
          </p>
          
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 inline-block"
          >
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-6 py-3 rounded-full border border-yellow-200 dark:border-yellow-800">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-bold text-gray-900 dark:text-white">4.9</span>
              <span className="text-gray-600 dark:text-gray-400">(500+ reviews)</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Carrossel Principal */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence>
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-12 shadow-xl border-2 border-gray-100 dark:border-slate-700">
                
                {/* Quote Mark */}
                <div className="absolute top-4 right-8 text-6xl text-blue-200 dark:text-blue-900 opacity-50">
                  "
                </div>

                {/* Avatar + Info */}
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                  >
                    {testimonials[currentIdx].image}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {testimonials[currentIdx].name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {testimonials[currentIdx].role}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 mb-1">
                      {[...Array(testimonials[currentIdx].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star size={18} className="fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-gray-400 text-xs">{testimonials[currentIdx].date}</p>
                  </div>
                </div>

                {/* Testimonial Text */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed relative z-10"
                >
                  {testimonials[currentIdx].text}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Dot Indicators */}
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setAutoPlay(false)
                setCurrentIdx(idx)
              }}
              className={`h-3 rounded-full transition-all ${
                idx === currentIdx
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 dark:bg-slate-600 w-3 hover:bg-gray-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Confie nos números: <strong>500+ clientes satisfeitos</strong> • 
            <strong> 4.9/5 avaliação</strong> • <strong>100% recomendariam</strong>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
