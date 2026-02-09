import React from 'react'
import { motion } from 'framer-motion'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  icon: Icon = null,
  loading = false,
  fullWidth = false,
  ...rest
}) => {
  const baseStyles = 'font-inter font-600 rounded-lg transition-all duration-200 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-primary-500/30 active:scale-95',
    secondary: 'bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 active:scale-95',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-lg hover:shadow-accent-500/30 active:scale-95',
    outline: 'border-2 border-primary-300 text-primary-700 hover:bg-primary-50 active:scale-95',
    ghost: 'text-primary-600 hover:bg-primary-50 active:scale-95'
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  return (
    <motion.button
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
        />
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </motion.button>
  )
}

export default Button
