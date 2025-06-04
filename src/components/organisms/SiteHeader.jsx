import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Icon from '../atoms/Icon'
      import Button from '../atoms/Button'
      import Badge from '../atoms/Badge'
      
      export default function SiteHeader({ selectedTrip }) {
        return (
          <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass border-b border-white/20 backdrop-blur-sm sticky top-0 z-40"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 md:h-20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-card">
                    <Icon name="MapPin" className="w-6 h-6 text-white" />
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
                    <div className="hidden md:flex">
                      <Badge icon="Calendar" text={selectedTrip.name} />
                    </div>
                  )}
                  <Button variant="icon" className="hover:bg-white/50">
                    <Icon name="Share2" className="w-5 h-5 text-surface-600" />
                  </Button>
                  <Button variant="icon" className="hover:bg-white/50">
                    <Icon name="Bell" className="w-5 h-5 text-surface-600" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.header>
        )
      }
      
      SiteHeader.propTypes = {
        selectedTrip: PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        }),
      }