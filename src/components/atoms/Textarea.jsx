import PropTypes from 'prop-types'
      
      export default function Textarea({ value, onChange, placeholder, rows = 3, className = '' }) {
        return (
          <textarea
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${className}`}
            rows={rows}
            placeholder={placeholder}
          />
        )
      }
      
      Textarea.propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        rows: PropTypes.number,
        className: PropTypes.string,
      }