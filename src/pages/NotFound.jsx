import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-blue-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-travel"
        >
          <ApperIcon name="MapPin" className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-surface-900 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-surface-800 mb-4">Trip Not Found</h2>
        <p className="text-surface-600 mb-8 leading-relaxed">
          Looks like this destination doesn't exist on our map. Let's get you back to planning your next adventure.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-medium shadow-card hover:shadow-travel transition-all duration-300 transform hover:scale-105"
        >
          <ApperIcon name="Home" className="w-5 h-5" />
          <span>Back to TripCraft</span>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-2 gap-4 text-sm text-surface-500"
        >
          <div className="flex items-center justify-center space-x-2 p-3 bg-white/40 rounded-lg border border-white/30">
            <ApperIcon name="Compass" className="w-4 h-4" />
            <span>Explore</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-3 bg-white/40 rounded-lg border border-white/30">
            <ApperIcon name="Calendar" className="w-4 h-4" />
            <span>Plan</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}