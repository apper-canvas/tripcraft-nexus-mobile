import activityData from '../mockData/activity.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let activities = [...activityData]

const activityService = {
  async getAll() {
    await delay(300)
    return [...activities]
  },

  async getById(id) {
    await delay(250)
    const activity = activities.find(a => a.id === id)
    return activity ? { ...activity } : null
  },

  async create(activityData) {
    await delay(400)
    const newActivity = {
      ...activityData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    activities.push(newActivity)
    return { ...newActivity }
  },

  async update(id, updatedData) {
    await delay(350)
    const index = activities.findIndex(a => a.id === id)
    if (index === -1) {
      throw new Error('Activity not found')
    }
    activities[index] = { ...activities[index], ...updatedData }
    return { ...activities[index] }
  },

  async delete(id) {
    await delay(300)
    const index = activities.findIndex(a => a.id === id)
    if (index === -1) {
      throw new Error('Activity not found')
    }
    activities.splice(index, 1)
    return true
  }
}

export default activityService