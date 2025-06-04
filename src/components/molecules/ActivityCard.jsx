import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Icon from '../atoms/Icon'
      import Button from '../atoms/Button'
      
      const activityTypes = [
        { value: 'flight', label: 'Flight', icon: 'Plane' },
        { value: 'hotel', label: 'Hotel', icon: 'Bed' },
        { value: 'restaurant', label: 'Restaurant', icon: 'UtensilsCrossed' },
        { value: 'attraction', label: 'Attraction', icon: 'Camera' },
        { value: 'transport', label: 'Transport', icon: 'Car' },
        { value: 'activity', label: 'Activity', icon: 'Activity' }
      ]
      
      const getActivityTypeIcon = (type) => {
        const activityType = activityTypes.find(t => t.value === type)
        return activityType?.icon || 'Calendar'
      }
      
      export default function ActivityCard({ activity, activityIndex, onDragStart, onDelete, draggedActivity }) {
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: activityIndex * 0.05 }}
            draggable
            onDragStart={() => onDragStart(activity)}
            className={`activity-card p-4 md:p-6 cursor-move group ${
              draggedActivity?.id === activity.id ? 'dragging' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 md:space-x-4 flex-1">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Icon 
                    name={getActivityTypeIcon(activity.type)} 
                    className="w-5 h-5 md:w-6 md:h-6 text-white" 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-base md:text-lg font-semibold text-surface-900 mb-1">
                    {activity.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-surface-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" className="w-4 h-4" />
                      <span>{activity.startTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Timer" className="w-4 h-4" />
                      <span>{activity.duration}min</span>
                    </div>
                    {activity.cost > 0 && (
                      <div className="flex items-center space-x-1">
                        <Icon name="DollarSign" className="w-4 h-4" />
                        <span>${activity.cost}</span>
                      </div>
                    )}
                  </div>
                  {activity.location?.name && (
                    <div className="flex items-center space-x-1 text-sm text-surface-500">
                      <Icon name="MapPin" className="w-4 h-4" />
                      <span>{activity.location.name}</span>
                    </div>
                  )}
                  {activity.notes && (
                    <p className="text-sm text-surface-600 mt-2 bg-surface-50 p-2 rounded-lg">
                      {activity.notes}
                    </p>
                  )}
                </div>
              </div>
              
              <Button
                onClick={() => onDelete(activity.id)}
                variant="icon"
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg text-red-500"
              >
                <Icon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )
      }
      
      ActivityCard.propTypes = {
        activity: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          startTime: PropTypes.string.isRequired,
          duration: PropTypes.number.isRequired,
          location: PropTypes.shape({
            name: PropTypes.string,
            address: PropTypes.string,
          }),
          cost: PropTypes.number,
          notes: PropTypes.string,
        }).isRequired,
        activityIndex: PropTypes.number.isRequired,
        onDragStart: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        draggedActivity: PropTypes.object,
      }