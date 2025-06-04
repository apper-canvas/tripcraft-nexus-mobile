import destinationData from '../mockData/destination.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let destinations = [...destinationData]

const destinationService = {
  async getAll() {
    await delay(300)
    return [...destinations]
  },

  async getById(id) {
    await delay(250)
    const destination = destinations.find(d => d.id === id)
    return destination ? { ...destination } : null
  },

  async create(destinationData) {
    await delay(400)
    const newDestination = {
      ...destinationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    destinations.push(newDestination)
    return { ...newDestination }
  },

  async update(id, updatedData) {
    await delay(350)
    const index = destinations.findIndex(d => d.id === id)
    if (index === -1) {
      throw new Error('Destination not found')
    }
    destinations[index] = { ...destinations[index], ...updatedData }
    return { ...destinations[index] }
  },

  async delete(id) {
    await delay(300)
    const index = destinations.findIndex(d => d.id === id)
    if (index === -1) {
      throw new Error('Destination not found')
    }
    destinations.splice(index, 1)
    return true
  }
}

export default destinationService