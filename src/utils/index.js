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

export function generateTestData () {
  let index = 0
  let totalPlayerNum = 0

  const players = _.range(1, 40).map(n => {
    let playerNum = _.random(4, 6) // number of players in a team range from 4 ~ 6
    totalPlayerNum = totalPlayerNum + playerNum
    return {
      team: {
        id: n,
        name: `t${n}`
      },
      players: _.range(1, playerNum + 1).map(m => ({
        id: ++index,
        name: `t${n}_p${m}`,
        webId: `sdgb${n}${m}`
      }))
    }
  })

  index = 0
  const games = _.range(1, totalPlayerNum * 50).map(n => {
    let totalScore = 0
    return {
      id: ++index,
      score: _.orderBy(_.sampleSize(players, 4).map((p, i) => { // players are grouped by team. select 4 teams
        let m = _.random(0, p.players.length - 1)
        if (i < 3) {
          let score = _.random(-200, 200)
          totalScore = totalScore + score
          return {
            playerId: p.players[m].id,
            score
          }
        }
        return {
          playerId: p.players[m].id,
          score: -1 * totalScore
        }
      }), ['score'], ['desc'])
    }
  })
  return {
    matchId: 0,
    players,
    games,
    rule: {
      matchType: 'tp',
      minTeamPlayer: 4,
      maxTeamPlayer: 6,
      minTeamGames: 120,
      minPlayerGames: 24,
      maxPlayerGames: 48,
      globalRanking: false,
      points: [4, 2, 1, 0]
    }
  }
}
