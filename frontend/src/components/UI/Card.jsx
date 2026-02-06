import React from 'react'
import { motion } from 'framer-motion'

export const Card = ({
  children,
  className = '',
  hover = true,
  gradient = false,
  onClick,
  ...rest
}) => {
  const cardVariants = {
    rest: { y: 0, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)' },
    hover: { y: -8, boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)' }
  }

  const baseClass = `rounded-2xl p-6 transition-all duration-300 ${
    gradient 
      ? 'bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900' 
      : 'bg-white dark:bg-slate-800'
  } ${className}`

  return (
    <motion.div
      className={baseClass}
      variants={hover ? cardVariants : {}}
      initial="rest"
      whileHover={hover ? 'hover' : 'rest'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default Card
