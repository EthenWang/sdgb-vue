import * as _ from 'lodash'

export const matchTypes = [
  {
    title: '团体赛',
    code: 't'
  },
  {
    title: '个人赛',
    code: 's'
  },
  {
    title: '团体 + 个人赛',
    code: 'ts'
  }
]

export function buildGameScore (store, gameId) {
  if (store.state && store.state.games && Array.isArray(store.state.games)) {
    const game = _.find(store.state.games, g => g.id === gameId)
    if (game) {
      return game.score.map(s => {
        const player = store.getters.playerObject[s.playerId]
        if (player) {
          return {
            ...s,
            teamId: player.teamId
          }
        }
        return {}
      })
    }
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
  const games = _.range(1, totalPlayerNum * 48).map(n => {
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
      matchType: 'ts',
      minTeamPlayers: 4,
      maxTeamPlayers: 6,
      minTeamGames: 120,
      minPlayerGames: 24,
      maxPlayerGames: 48,
      globalRanking: false,
      points: [4, 2, 1, 0],
      breakPunish: false,
      punishPoint: 0
    }
  }
}
