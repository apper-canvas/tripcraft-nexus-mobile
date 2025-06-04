import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import FeatureCard from '../molecules/FeatureCard'
      
      const features = [
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
      ]
      
      export default function FeatureGridSection() {
        return (
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
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </div>
            </div>
          </motion.section>
        )
      }