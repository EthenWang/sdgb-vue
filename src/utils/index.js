import * as _ from 'lodash'

function isArray (arg) {
  if (typeof arg === 'object') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return false
}

export function buildGameScore (store, gameId) {
  if (store && store.games && isArray(store.games)) {
    return _.filter(store.games, game => game.id === gameId)
  }
  return [{}, {}, {}, {}].map(a => ({
    teamId: 0,
    playerId: 0,
    score: 0,
    breakTime: 0
  }))
}

export function nickName ({ name, webId }) {
  return `${name}[${webId}]`
}

export function copyArray (arr) {
  return JSON.parse(JSON.stringify(arr))
}
