import PropTypes from 'prop-types'
      
      export default function Input({ type = 'text', value, onChange, placeholder, className = '', required, min, step }) {
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${className}`}
            placeholder={placeholder}
            required={required}
            min={min}
            step={step}
          />
        )
      }
      
      Input.propTypes = {
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        className: PropTypes.string,
        required: PropTypes.bool,
        min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        step: PropTypes.string,
      }