import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Icon from '../atoms/Icon'
      
      export default function BudgetSummary({ selectedTrip, activities }) {
        const totalBudget = selectedTrip?.budget?.total || 5000
        const spent = activities?.reduce((sum, activity) => sum + (activity.cost || 0), 0) || 0
        const remaining = totalBudget - spent
      
        return (
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
                  <Icon name="DollarSign" className="w-6 h-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">
                  ${totalBudget}
                </div>
              </div>
      
              {/* Spent */}
              <div className="bg-white p-6 rounded-xl border border-surface-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-surface-900">Spent</h3>
                  <Icon name="TrendingUp" className="w-6 h-6 text-red-500" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-surface-900">
                  ${spent}
                </div>
              </div>
      
              {/* Remaining */}
              <div className="bg-white p-6 rounded-xl border border-surface-200 md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-surface-900">Remaining</h3>
                  <Icon name="Wallet" className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-secondary">
                  ${remaining}
                </div>
              </div>
            </div>
          </motion.div>
        )
      }
      
      BudgetSummary.propTypes = {
        selectedTrip: PropTypes.shape({
          budget: PropTypes.shape({
            total: PropTypes.number,
          }),
        }),
        activities: PropTypes.array,
      }