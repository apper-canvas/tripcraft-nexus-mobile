import PropTypes from 'prop-types'
      
      export default function Select({ value, onChange, options, className = '' }) {
        return (
          <select
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${className}`}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        )
      }
      
      Select.propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
          })
        ).isRequired,
        className: PropTypes.string,
      }