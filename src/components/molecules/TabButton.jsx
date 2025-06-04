import PropTypes from 'prop-types'
      import Icon from '../atoms/Icon'
      import Button from '../atoms/Button'
      
      export default function TabButton({ id, label, icon, activeTab, onClick }) {
        return (
          <Button
            key={id}
            onClick={() => onClick(id)}
            variant="text"
            className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === id
                ? 'bg-primary text-white shadow-card'
                : 'text-surface-600 hover:text-surface-900 hover:bg-white/50'
            }`}
          >
            <Icon name={icon} className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:block">{label}</span>
          </Button>
        )
      }
      
      TabButton.propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        activeTab: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
      }