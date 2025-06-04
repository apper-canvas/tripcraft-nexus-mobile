import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Icon from '../atoms/Icon'
      
      export default function FeatureCard({ icon, title, description, index }) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group p-6 md:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 hover:shadow-travel transition-all duration-300 hover:-translate-y-2"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name={icon} className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h4 className="text-lg md:text-xl font-semibold text-surface-900 mb-2 md:mb-3">{title}</h4>
            <p className="text-surface-600 leading-relaxed">{description}</p>
          </motion.div>
        )
      }
      
      FeatureCard.propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
      }