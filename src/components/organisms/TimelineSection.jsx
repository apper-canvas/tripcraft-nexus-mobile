import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Icon from '../atoms/Icon'
      import Button from '../atoms/Button'
      import ActivityCard from '../molecules/ActivityCard'
      
      export default function TimelineSection({ 
        loading, 
        error, 
        sortedDates, 
        groupedActivities, 
        setShowAddActivity, 
        handleDragStart, 
        handleDrop, 
        handleDeleteActivity, 
        draggedActivity 
      }) {
        if (loading) {
          return (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          )
        }
      
        if (error) {
          return (
            <div className="text-center py-12">
              <Icon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600">{error}</p>
            </div>
          )
        }
      
        if (sortedDates.length === 0) {
          return (
            <div className="text-center py-12">
              <Icon name="Calendar" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-surface-700 mb-2">No Activities Yet</h3>
              <p className="text-surface-500 mb-6">Start building your itinerary by adding your first activity.</p>
              <Button onClick={() => setShowAddActivity(true)} variant="primary">
                Add Your First Activity
              </Button>
            </div>
          )
        }
      
        return (
          <div className="space-y-6 md:space-y-8">
            {sortedDates.map((date, dateIndex) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dateIndex * 0.1 }}
                className="relative"
                onDrop={(e) => {
                  e.preventDefault()
                  handleDrop(date)
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="flex items-center space-x-4 mb-4 md:mb-6">
                  <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full"></div>
                  <h3 className="text-lg md:text-xl font-semibold text-surface-900">
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                </div>
      
                <div className="ml-4 md:ml-8 space-y-3 md:space-y-4">
                  {groupedActivities[date]
                    ?.sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((activity, activityIndex) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        activityIndex={activityIndex}
                        onDragStart={handleDragStart}
                        onDelete={handleDeleteActivity}
                        draggedActivity={draggedActivity}
                      />
                    ))}
                </div>
      
                {dateIndex < sortedDates.length - 1 && (
                  <div className="ml-6 md:ml-12 mt-6 md:mt-8 h-8 w-0.5 timeline-connector"></div>
                )}
              </motion.div>
            ))}
          </div>
        )
      }
      
      TimelineSection.propTypes = {
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        sortedDates: PropTypes.array.isRequired,
        groupedActivities: PropTypes.object.isRequired,
        setShowAddActivity: PropTypes.func.isRequired,
        handleDragStart: PropTypes.func.isRequired,
        handleDrop: PropTypes.func.isRequired,
        handleDeleteActivity: PropTypes.func.isRequired,
        draggedActivity: PropTypes.object,
      }