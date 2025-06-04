import { motion, AnimatePresence } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Icon from '../atoms/Icon'
      import FormField from '../molecules/FormField'
      import Button from '../atoms/Button'
      
      const activityTypes = [
        { value: 'flight', label: 'Flight' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'attraction', label: 'Attraction' },
        { value: 'transport', label: 'Transport' },
        { value: 'activity', label: 'Activity' }
      ]
      
      export default function ActivityFormModal({ 
        show, 
        onClose, 
        newActivity, 
        setNewActivity, 
        onSubmit, 
        loading 
      }) {
        const handleChange = (field, value) => {
          setNewActivity(prev => {
            if (field === 'locationName') {
              return { ...prev, location: { ...prev.location, name: value } }
            }
            return { ...prev, [field]: value }
          })
        }
      
        return (
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-surface-900">Add New Activity</h3>
                    <Button onClick={onClose} variant="icon" className="hover:bg-surface-100">
                      <Icon name="X" className="w-5 h-5" />
                    </Button>
                  </div>
      
                  <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
                    <FormField
                      label="Activity Name"
                      type="text"
                      value={newActivity.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="e.g., Visit Eiffel Tower"
                      required
                    />
      
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Type"
                        type="select"
                        value={newActivity.type}
                        onChange={(e) => handleChange('type', e.target.value)}
                        options={activityTypes}
                      />
      
                      <FormField
                        label="Date"
                        type="date"
                        value={newActivity.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                      />
                    </div>
      
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Start Time"
                        type="time"
                        value={newActivity.startTime}
                        onChange={(e) => handleChange('startTime', e.target.value)}
                      />
      
                      <FormField
                        label="Duration (minutes)"
                        type="number"
                        value={newActivity.duration}
                        onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
                        min="0"
                      />
                    </div>
      
                    <FormField
                      label="Location"
                      type="text"
                      value={newActivity.location.name}
                      onChange={(e) => handleChange('locationName', e.target.value)}
                      placeholder="e.g., Paris, France"
                    />
      
                    <FormField
                      label="Cost ($)"
                      type="number"
                      value={newActivity.cost}
                      onChange={(e) => handleChange('cost', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
      
                    <FormField
                      label="Notes"
                      type="textarea"
                      value={newActivity.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      placeholder="Additional details..."
                      rows={3}
                    />
      
                    <div className="flex space-x-4 pt-4">
                      <Button
                        type="button"
                        onClick={onClose}
                        variant="secondary"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading}
                        variant="primary"
                        className="flex-1"
                      >
                        {loading ? 'Adding...' : 'Add Activity'}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      }
      
      ActivityFormModal.propTypes = {
        show: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        newActivity: PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          startTime: PropTypes.string.isRequired,
          duration: PropTypes.number.isRequired,
          location: PropTypes.shape({
            name: PropTypes.string.isRequired,
            address: PropTypes.string,
          }).isRequired,
          cost: PropTypes.number.isRequired,
          notes: PropTypes.string.isRequired,
        }).isRequired,
        setNewActivity: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
      }