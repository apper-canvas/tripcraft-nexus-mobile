import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      
      export default function Button({ children, className = '', type = 'button', onClick, disabled, variant = 'primary' }) {
        const baseClasses = 'flex items-center space-x-2 rounded-xl transition-all duration-300 transform'
        const variants = {
          primary: 'bg-gradient-to-r from-primary to-secondary text-white px-4 md:px-6 py-2 md:py-3 shadow-card hover:shadow-travel hover:scale-105',
          secondary: 'border border-surface-300 text-surface-700 px-6 py-3 hover:bg-surface-50',
          icon: 'p-2 rounded-lg transition-colors',
          text: 'text-sm font-medium hidden sm:block' // For tab buttons, adjust padding in molecule
        }
      
        return (
          <motion.button
            whileTap={{ scale: 0.95 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {children}
          </motion.button>
        )
      }
      
      Button.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        type: PropTypes.oneOf(['button', 'submit', 'reset']),
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        variant: PropTypes.oneOf(['primary', 'secondary', 'icon', 'text'])
      }