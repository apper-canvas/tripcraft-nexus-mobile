import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import { tripService } from '../services'

export default function Home() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedTrip, setSelectedTrip] = useState(null)

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true)
      try {
        const result = await tripService.getAll()
        setTrips(result || [])
        if (result?.length > 0) {
          setSelectedTrip(result[0])
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadTrips()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-surface-100">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass border-b border-white/20 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-card">
                <ApperIcon name="MapPin" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  TripCraft
                </h1>
                <p className="text-xs md:text-sm text-surface-600 hidden sm:block">Plan your perfect journey</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              {selectedTrip && (
                <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-white/50 rounded-lg border border-white/30">
                  <ApperIcon name="Calendar" className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-surface-700">{selectedTrip.name}</span>
                </div>
              )}
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                <ApperIcon name="Share2" className="w-5 h-5 text-surface-600" />
              </button>
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                <ApperIcon name="Bell" className="w-5 h-5 text-surface-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden pt-8 md:pt-16 pb-12 md:pb-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-surface-900 mb-4 md:mb-6"
            >
              Craft Your Perfect
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                Travel Experience
              </span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed"
            >
              Create detailed itineraries, collaborate with travel companions, and organize every aspect of your journey in one beautiful, intuitive platform.
            </motion.p>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto mb-12 md:mb-16"
            >
              {[
                { icon: "Map", value: trips?.length || 0, label: "Active Trips" },
                { icon: "Calendar", value: "24/7", label: "Access" },
                { icon: "Users", value: "Team", label: "Collaboration" },
                { icon: "Globe", value: "Global", label: "Destinations" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30">
                  <ApperIcon name={stat.icon} className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
                  <div className="text-lg md:text-2xl font-bold text-surface-900">{stat.value}</div>
                  <div className="text-xs md:text-sm text-surface-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Main Feature */}
          <motion.div variants={itemVariants}>
            <MainFeature trips={trips} setTrips={setTrips} selectedTrip={selectedTrip} setSelectedTrip={setSelectedTrip} />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-white/30 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-2xl md:text-4xl font-bold text-surface-900 mb-4">
              Everything You Need to Plan Amazing Trips
            </h3>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              From initial inspiration to detailed day-by-day planning, TripCraft has all the tools you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "Calendar",
                title: "Smart Timeline",
                description: "Drag and drop activities to create the perfect daily schedule with intelligent time management."
              },
              {
                icon: "Users",
                title: "Team Collaboration",
                description: "Invite travel companions to edit plans together in real-time with seamless synchronization."
              },
              {
                icon: "DollarSign",
                title: "Budget Tracking",
                description: "Monitor expenses across categories with currency conversion and spending insights."
              },
              {
                icon: "MapPin",
                title: "Interactive Maps",
                description: "Visualize your journey with location-based planning and proximity recommendations."
              },
              {
                icon: "Smartphone",
                title: "Mobile Ready",
                description: "Access your itineraries anywhere with offline support and mobile-optimized interface."
              },
              {
                icon: "BookOpen",
                title: "Trip Documents",
                description: "Store tickets, reservations, and important documents in one organized digital wallet."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 md:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 hover:shadow-travel transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-surface-900 mb-2 md:mb-3">{feature.title}</h4>
                <p className="text-surface-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="MapPin" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">TripCraft</span>
            </div>
            <p className="text-surface-400 mb-8 max-w-2xl mx-auto">
              Making travel planning enjoyable, collaborative, and stress-free. Start crafting your next adventure today.
            </p>
            <div className="flex justify-center space-x-6 text-surface-500">
              <a href="#" className="hover:text-primary transition-colors">
                <ApperIcon name="Mail" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}