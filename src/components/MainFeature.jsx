import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { activityService, destinationService } from '../services'

export default function MainFeature({ trips = [], setTrips, selectedTrip, setSelectedTrip }) {
  const [activities, setActivities] = useState([])
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('timeline')
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [draggedActivity, setDraggedActivity] = useState(null)
  const [newActivity, setNewActivity] = useState({
    name: '',
    type: 'attraction',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    duration: 60,
    location: { name: '', address: '' },
    cost: 0,
    notes: ''
  })

  const activityTypes = [
    { value: 'flight', label: 'Flight', icon: 'Plane' },
    { value: 'hotel', label: 'Hotel', icon: 'Bed' },
    { value: 'restaurant', label: 'Restaurant', icon: 'UtensilsCrossed' },
    { value: 'attraction', label: 'Attraction', icon: 'Camera' },
    { value: 'transport', label: 'Transport', icon: 'Car' },
    { value: 'activity', label: 'Activity', icon: 'Activity' }
  ]

  // Load activities and destinations
  useEffect(() => {
    const loadData = async () => {
      if (!selectedTrip) return
      
      setLoading(true)
      try {
        const [activitiesResult, destinationsResult] = await Promise.all([
          activityService.getAll(),
          destinationService.getAll()
        ])
        
        // Filter activities for selected trip
        const tripActivities = activitiesResult?.filter(activity => 
          activity.tripId === selectedTrip.id
        ) || []
        
        setActivities(tripActivities)
        setDestinations(destinationsResult || [])
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load trip data')
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [selectedTrip])

  // Handle adding new activity
  const handleAddActivity = async (e) => {
    e.preventDefault()
    
    if (!selectedTrip) {
      toast.error('Please select a trip first')
      return
    }

    if (!newActivity.name.trim()) {
      toast.error('Activity name is required')
      return
    }

    setLoading(true)
    try {
      const activityData = {
        ...newActivity,
        tripId: selectedTrip.id,
        id: Date.now().toString()
      }
      
      const createdActivity = await activityService.create(activityData)
      setActivities(prev => [...prev, createdActivity])
      
      // Reset form
      setNewActivity({
        name: '',
        type: 'attraction',
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        duration: 60,
        location: { name: '', address: '' },
        cost: 0,
        notes: ''
      })
      
      setShowAddActivity(false)
      toast.success('Activity added successfully!')
    } catch (err) {
      setError(err.message)
      toast.error('Failed to add activity')
    } finally {
      setLoading(false)
    }
  }

  // Handle activity deletion
  const handleDeleteActivity = async (activityId) => {
    setLoading(true)
    try {
      await activityService.delete(activityId)
      setActivities(prev => prev.filter(activity => activity.id !== activityId))
      toast.success('Activity deleted successfully!')
    } catch (err) {
      setError(err.message)
      toast.error('Failed to delete activity')
    } finally {
      setLoading(false)
    }
  }

  // Drag and drop handlers
  const handleDragStart = (activity) => {
    setDraggedActivity(activity)
  }

  const handleDrop = async (newDate) => {
    if (!draggedActivity) return
    
    setLoading(true)
    try {
      const updatedActivity = {
        ...draggedActivity,
        date: newDate
      }
      
      await activityService.update(draggedActivity.id, updatedActivity)
      setActivities(prev => 
        prev.map(activity => 
          activity.id === draggedActivity.id 
            ? updatedActivity 
            : activity
        )
      )
      
      toast.success('Activity moved successfully!')
    } catch (err) {
      setError(err.message)
      toast.error('Failed to move activity')
    } finally {
      setLoading(false)
      setDraggedActivity(null)
    }
  }

  // Group activities by date
  const groupedActivities = activities?.reduce((groups, activity) => {
    const date = activity.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {}) || {}

  // Sort dates
  const sortedDates = Object.keys(groupedActivities).sort()

  const getActivityTypeIcon = (type) => {
    const activityType = activityTypes.find(t => t.value === type)
    return activityType?.icon || 'Calendar'
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8 gap-4">
        <div className="flex bg-white/60 backdrop-blur-sm rounded-xl p-1 border border-white/40">
          {[
            { id: 'timeline', label: 'Timeline', icon: 'Calendar' },
            { id: 'map', label: 'Map View', icon: 'Map' },
            { id: 'budget', label: 'Budget', icon: 'DollarSign' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-card'
                  : 'text-surface-600 hover:text-surface-900 hover:bg-white/50'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddActivity(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-card hover:shadow-travel transition-all duration-300 transform hover:scale-105"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span className="font-medium text-sm md:text-base">Add Activity</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-travel overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-8"
            >
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600">{error}</p>
                </div>
              ) : (
                <div className="space-y-6 md:space-y-8">
                  {sortedDates.length === 0 ? (
                    <div className="text-center py-12">
                      <ApperIcon name="Calendar" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-surface-700 mb-2">No Activities Yet</h3>
                      <p className="text-surface-500 mb-6">Start building your itinerary by adding your first activity.</p>
                      <button
                        onClick={() => setShowAddActivity(true)}
                        className="btn-primary"
                      >
                        Add Your First Activity
                      </button>
                    </div>
                  ) : (
                    sortedDates.map((date, dateIndex) => (
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
                        {/* Date Header */}
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

                        {/* Activities for this date */}
                        <div className="ml-4 md:ml-8 space-y-3 md:space-y-4">
                          {groupedActivities[date]
                            ?.sort((a, b) => a.startTime.localeCompare(b.startTime))
                            .map((activity, activityIndex) => (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: activityIndex * 0.05 }}
                              draggable
                              onDragStart={() => handleDragStart(activity)}
                              className={`activity-card p-4 md:p-6 cursor-move group ${
                                draggedActivity?.id === activity.id ? 'dragging' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 md:space-x-4 flex-1">
                                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                                    <ApperIcon 
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
                                        <ApperIcon name="Clock" className="w-4 h-4" />
                                        <span>{activity.startTime}</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <ApperIcon name="Timer" className="w-4 h-4" />
                                        <span>{activity.duration}min</span>
                                      </div>
                                      {activity.cost > 0 && (
                                        <div className="flex items-center space-x-1">
                                          <ApperIcon name="DollarSign" className="w-4 h-4" />
                                          <span>${activity.cost}</span>
                                        </div>
                                      )}
                                    </div>
                                    {activity.location?.name && (
                                      <div className="flex items-center space-x-1 text-sm text-surface-500">
                                        <ApperIcon name="MapPin" className="w-4 h-4" />
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
                                
                                <button
                                  onClick={() => handleDeleteActivity(activity.id)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg text-red-500"
                                >
                                  <ApperIcon name="Trash2" className="w-4 h-4" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Timeline connector */}
                        {dateIndex < sortedDates.length - 1 && (
                          <div className="ml-6 md:ml-12 mt-6 md:mt-8 h-8 w-0.5 timeline-connector"></div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-8"
            >
              <div className="h-64 md:h-96 bg-gradient-to-br from-surface-100 to-surface-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <ApperIcon name="Map" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-surface-700 mb-2">Map View</h3>
                  <p className="text-surface-500">Interactive map coming soon</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'budget' && (
            <motion.div
              key="budget"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Total Budget */}
                <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Total Budget</h3>
                    <ApperIcon name="DollarSign" className="w-6 h-6" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">
                    ${selectedTrip?.budget?.total || 5000}
                  </div>
                </div>

                {/* Spent */}
                <div className="bg-white p-6 rounded-xl border border-surface-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-surface-900">Spent</h3>
                    <ApperIcon name="TrendingUp" className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-surface-900">
                    ${activities?.reduce((sum, activity) => sum + (activity.cost || 0), 0) || 0}
                  </div>
                </div>

                {/* Remaining */}
                <div className="bg-white p-6 rounded-xl border border-surface-200 md:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-surface-900">Remaining</h3>
                    <ApperIcon name="Wallet" className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-secondary">
                    ${(selectedTrip?.budget?.total || 5000) - (activities?.reduce((sum, activity) => sum + (activity.cost || 0), 0) || 0)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Activity Modal */}
      <AnimatePresence>
        {showAddActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddActivity(false)}
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
                <button
                  onClick={() => setShowAddActivity(false)}
                  className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddActivity} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Activity Name *
                  </label>
                  <input
                    type="text"
                    value={newActivity.name}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Visit Eiffel Tower"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Type
                    </label>
                    <select
                      value={newActivity.type}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      {activityTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newActivity.date}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newActivity.startTime}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={newActivity.duration}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newActivity.location.name}
                    onChange={(e) => setNewActivity(prev => ({ 
                      ...prev, 
                      location: { ...prev.location, name: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Paris, France"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Cost ($)
                  </label>
                  <input
                    type="number"
                    value={newActivity.cost}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    rows="3"
                    placeholder="Additional details..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddActivity(false)}
                    className="flex-1 px-6 py-3 border border-surface-300 text-surface-700 rounded-xl hover:bg-surface-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Adding...' : 'Add Activity'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}