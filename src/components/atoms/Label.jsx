import PropTypes from 'prop-types'
      
      export default function Label({ children, htmlFor, className = '' }) {
        return (
          <label htmlFor={htmlFor} className={`block text-sm font-medium text-surface-700 mb-2 ${className}`}>
            {children}
          </label>
        )
      }
      
      Label.propTypes = {
        children: PropTypes.node.isRequired,
        htmlFor: PropTypes.string,
        className: PropTypes.string,
      }