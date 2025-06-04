import tripData from '../mockData/trip.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let trips = [...tripData]

const tripService = {
  async getAll() {
    await delay(300)
    return [...trips]
  },

  async getById(id) {
    await delay(250)
    const trip = trips.find(t => t.id === id)
    return trip ? { ...trip } : null
  },

  async create(tripData) {
    await delay(400)
    const newTrip = {
      ...tripData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    trips.push(newTrip)
    return { ...newTrip }
  },

  async update(id, updatedData) {
    await delay(350)
    const index = trips.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Trip not found')
    }
    trips[index] = { ...trips[index], ...updatedData }
    return { ...trips[index] }
  },

  async delete(id) {
    await delay(300)
    const index = trips.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Trip not found')
    }
    trips.splice(index, 1)
    return true
  }
}

export default tripService