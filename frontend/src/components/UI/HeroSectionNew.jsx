import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, Check, Zap, Clock, User, Award } from 'lucide-react'
import { Button } from './Button'

export const HeroSectionNew = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const trustBadges = [
    { icon: '⭐', label: '4.9', desc: 'Rating' },
    { icon: '👥', label: '500+', desc: 'Clientes' },
    { icon: '📅', label: '10+', desc: 'Anos' },
    { icon: '♻️', label: 'ECO', desc: 'Friendly' }
  ]

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-900 dark:via-slate-900 dark:to-cyan-900 pt-20 pb-32 sm:pt-32 sm:pb-48 flex items-center">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, linear: true }}
        />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12"
        >
          
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block"
            >
              <span className="px-4 py-2 rounded-full bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/30 flex items-center gap-2 w-fit">
                <Zap size={16} /> Limpeza Premium em Porto Alegre
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight font-display">
                Sua casa
                <motion.span
                  className="block text-transparent bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text"
                  animate={{ backgroundPosition: ['0%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  brilhando
                </motion.span>
                como nunca
              </h1>
              <p className="text-xl text-white/90 max-w-xl font-light">
                Serviços profissionais de limpeza com equipe verificada, produtos eco-friendly e garantia de satisfação. Agende em segundos.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 pt-4"
            >
              <Link href="/agendar">
                <Button variant="primary" size="lg">
                  Agendar Agora ✨
                </Button>
              </Link>
              <motion.a
                href="#servicos"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 backdrop-blur-md border border-white/30 transition-colors"
              >
                Conhecer Serviços
              </motion.a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-4 gap-4 pt-8 border-t border-white/20"
            >
              {trustBadges.map((badge, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="text-center text-white"
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="font-bold">{badge.label}</div>
                  <div className="text-xs text-white/70">{badge.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Graphic */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block relative h-96"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center"
              whileHover={{ boxShadow: '0 0 60px rgba(255, 255, 255, 0.2)' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, linear: true }}
                className="text-8xl"
              >
                ✨
              </motion.div>
            </motion.div>

            {/* Floating Cards Animation */}
            {[
              { icon: '🧹', label: 'Rápido', delay: 0 },
              { icon: '♻️', label: 'Eco', delay: 0.2 },
              { icon: '⭐', label: '5★', delay: 0.4 }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="absolute w-20 h-20 bg-white/20 rounded-xl backdrop-blur-md border border-white/30 flex flex-col items-center justify-center text-white font-bold shadow-lg"
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(idx) * 20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 3 + idx,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  top: `${20 + idx * 40}%`,
                  right: `${10 + idx * 15}%`
                }}
              >
                <div className="text-3xl mb-1">{item.icon}</div>
                <div className="text-xs">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-colors">
            <ChevronDown size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSectionNew
