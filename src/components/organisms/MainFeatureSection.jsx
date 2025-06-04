import { useState, useEffect } from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import PropTypes from 'prop-types'
      
      import Button from '../atoms/Button'
      import Icon from '../atoms/Icon'
      import TabButton from '../molecules/TabButton'
      import TimelineSection from './TimelineSection'
      import BudgetSummary from './BudgetSummary'
      import ActivityFormModal from './ActivityFormModal'
      
      import { activityService, destinationService } from '../../services'
      
      export default function MainFeatureSection({ trips = [], setTrips, selectedTrip, setSelectedTrip }) {
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
      
        const tabs = [
          { id: 'timeline', label: 'Timeline', icon: 'Calendar' },
          { id: 'map', label: 'Map View', icon: 'Map' },
          { id: 'budget', label: 'Budget', icon: 'DollarSign' }
        ]
      
        return (
          <div className="max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8 gap-4">
              <div className="flex bg-white/60 backdrop-blur-sm rounded-xl p-1 border border-white/40">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    id={tab.id}
                    label={tab.label}
                    icon={tab.icon}
                    activeTab={activeTab}
                    onClick={setActiveTab}
                  />
                ))}
              </div>
      
              <Button onClick={() => setShowAddActivity(true)} variant="primary">
                <Icon name="Plus" className="w-4 h-4" />
                <span className="font-medium text-sm md:text-base">Add Activity</span>
              </Button>
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
                    <TimelineSection 
                      loading={loading}
                      error={error}
                      sortedDates={sortedDates}
                      groupedActivities={groupedActivities}
                      setShowAddActivity={setShowAddActivity}
                      handleDragStart={handleDragStart}
                      handleDrop={handleDrop}
                      handleDeleteActivity={handleDeleteActivity}
                      draggedActivity={draggedActivity}
                    />
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
                        <Icon name="Map" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-surface-700 mb-2">Map View</h3>
                        <p className="text-surface-500">Interactive map coming soon</p>
                      </div>
                    </div>
                  </motion.div>
                )}
      
                {activeTab === 'budget' && (
                  <BudgetSummary 
                    selectedTrip={selectedTrip} 
                    activities={activities} 
                  />
                )}
              </AnimatePresence>
            </div>
      
            <ActivityFormModal 
              show={showAddActivity}
              onClose={() => setShowAddActivity(false)}
              newActivity={newActivity}
              setNewActivity={setNewActivity}
              onSubmit={handleAddActivity}
              loading={loading}
            />
          </div>
        )
      }
      
      MainFeatureSection.propTypes = {
        trips: PropTypes.array,
        setTrips: PropTypes.func.isRequired,
        selectedTrip: PropTypes.object,
        setSelectedTrip: PropTypes.func.isRequired,
      }