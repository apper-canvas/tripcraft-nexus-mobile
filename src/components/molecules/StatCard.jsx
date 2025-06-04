import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Icon from '../atoms/Icon'
      
      export default function StatCard({ icon, value, label, itemVariants }) {
        return (
          <motion.div 
            variants={itemVariants}
            className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30"
          >
            <Icon name={icon} className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
            <div className="text-lg md:text-2xl font-bold text-surface-900">{value}</div>
            <div className="text-xs md:text-sm text-surface-600">{label}</div>
          </motion.div>
        )
      }
      
      StatCard.propTypes = {
        icon: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
        itemVariants: PropTypes.object.isRequired,
      }