import PropTypes from 'prop-types'
      import Label from '../atoms/Label'
      import Input from '../atoms/Input'
      import Select from '../atoms/Select'
      import Textarea from '../atoms/Textarea'
      
      export default function FormField({ label, type = 'text', value, onChange, placeholder, required, options, rows, className = '' }) {
        const renderInput = () => {
          switch (type) {
            case 'select':
              return <Select value={value} onChange={onChange} options={options} />
            case 'textarea':
              return <Textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} />
            default:
              return <Input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} />
          }
        }
      
        return (
          <div className={className}>
            {label && <Label>{label} {required && '*'}</Label>}
            {renderInput()}
          </div>
        )
      }
      
      FormField.propTypes = {
        label: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
          })
        ),
        rows: PropTypes.number,
        className: PropTypes.string,
      }