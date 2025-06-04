import PropTypes from 'prop-types'
      import Icon from './Icon'
      
      export default function Badge({ icon, text, className = '' }) {
        return (
          <div className={`flex items-center space-x-3 px-4 py-2 bg-white/50 rounded-lg border border-white/30 ${className}`}>
            <Icon name={icon} className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-surface-700">{text}</span>
          </div>
        )
      }
      
      Badge.propTypes = {
        icon: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        className: PropTypes.string,
      }