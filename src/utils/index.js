import * as _ from 'lodash'

function isArray (arg) {
  if (typeof arg === 'object') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return false
}

export function buildGameScore (store, gameId) {
  if (store.games && isArray(store.games)) {
    return _.filter(store.games, game => game.id === gameId)
  }
  return [{}, {}, {}, {}].map(a => ({
    teamId: 0,
    playerId: 0,
    score: 0,
    'break': 0
  }))
}
