import ApperIcon from '../ApperIcon'
      import PropTypes from 'prop-types'
      
      export default function Icon({ name, className = '' }) {
        return <ApperIcon name={name} className={className} />
      }
      
      Icon.propTypes = {
        name: PropTypes.string.isRequired,
        className: PropTypes.string,
      }