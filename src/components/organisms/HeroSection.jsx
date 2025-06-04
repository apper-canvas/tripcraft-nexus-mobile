import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import StatCard from '../molecules/StatCard'
      
      export default function HeroSection({ trips, itemVariants, containerVariants, children }) {
        const stats = [
          { icon: "Map", value: trips?.length || 0, label: "Active Trips" },
          { icon: "Calendar", value: "24/7", label: "Access" },
          { icon: "Users", value: "Team", label: "Collaboration" },
          { icon: "Globe", value: "Global", label: "Destinations" }
        ]
      
        return (
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
      
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto mb-12 md:mb-16"
                >
                  {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} itemVariants={itemVariants} />
                  ))}
                </motion.div>
              </div>
      
              <motion.div variants={itemVariants}>
                {children}
              </motion.div>
            </div>
          </motion.section>
        )
      }
      
      HeroSection.propTypes = {
        trips: PropTypes.array.isRequired,
        itemVariants: PropTypes.object.isRequired,
        containerVariants: PropTypes.object.isRequired,
        children: PropTypes.node,
      }