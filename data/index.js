const folders = [
  './0-TrainingCamp',
  './1-GoblinStadium',
  './2-BonePit',
  './3-BarbarianBowl',
  './4-PekkasPlayhouse',
  './5-SpellValley',
  './6-BuildersWorkshop',
  './7-RoyalArena',
  './8-FrozenPeak',
  './9-JungleArena',
  './10-HogMountain',
  './11-ElectroValley',
  './12-LegendaryArena',
]

const objects = {
  arenas: [],
  cards: [],
  chests: [],
  leagues: [],
  players: require('./players'),
}

const addArena = (item, arena) => {
  return { ...item, arena }
}

// Merge all items
folders.map(require).forEach((element, index) => {
  Object.keys(element).forEach(collection => {
    element[collection] = element[collection].map(item => addArena(item, index))
    objects[collection] = [...objects[collection], ...element[collection]]
  })
})

// Add orders
Object.keys(objects).forEach(collection => {
  let order = 0
  objects[collection].forEach(item => {
    item.order = order
    order++
  })
})

module.exports = objects
