import Vue from 'vue'
import Vuex from 'vuex'
import * as _ from 'lodash'
import * as actions from './actions'
import { nickName, generateTestData } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  state: {
    matchId: 0, // 0 means the match under way
    players: [],
    games: [],
    rule: {}
  },

  actions: {
    [actions.INIT_MATCH_STATE] ({ commit, context }) {
      /* Vue.axios.get(`api/match/${state.matchId}`).then(response => {
        commit({
          type: actions.INIT_MATCH_STATE,
          data: response
        })
      }) */
      commit({
        type: actions.INIT_MATCH_STATE,
        data: generateTestData()
      })
    },

    [actions.GET_TEAM_PLAYERS] ({ commit, context }, { teamId }) {
      if (_.some(context.players, { teamId })) {
        return
      }

      Vue.axios.get(`api/team/getplayers/${teamId}`).then(response => {
        commit({
          type: actions.GET_TEAM_PLAYERS,
          data: response
        })
      })
    },

    [actions.POST_GAME_SCORE] ({ commit, context }, { score }) {
      console.log('post game score')
      console.dir(score)
    }
  },

  getters: {
    teams: function (state) {
      return _.map(state.players, p => p.team)
    },
    playerObject: function (state) {
      return _.transform(state.players, (result, { team, players }) => {
        _.each(players, p => {
          result[p.id] = {
            ...p,
            teamId: team.id,
            teamName: team.name,
            teamPlayerNum: players.length
          }
        })
      }, {})
    },
    validGameNum: function ({ games, rule }, { playerObject }) {
      if (games && rule && playerObject) {
        const { minPlayerGames, maxPlayerGames } = rule
        const num = Math.round(games.length * 4 / _.keys(playerObject).length)
        if (num > maxPlayerGames) {
          return maxPlayerGames
        }
        if (num < minPlayerGames) {
          return minPlayerGames
        }
        return num
      }
      return 0
    },
    playerScore: function (state, getters) {
      const { points, minTeamGames } = state.rule

      const calcPoints = function ({ score }) {
        let tmpPoints = [0, 0, 0, 0]
        _.each(
          _.groupBy(score.map((s, index) => ({ ...s, index })), s => s.score),
          (value, key) => {
            let totalPoints = _.sumBy(value, val => points[val.index])
            _.each(value, val => {
              tmpPoints[val.index] = totalPoints / value.length
            })
          }
        )
        return tmpPoints
      }

      let score = []
      state.games.forEach(g => {
        let tmpPoints = calcPoints(g)
        g.score.forEach((s, i) => {
          const index = _.findIndex(score, a => a.playerId === s.playerId)
          const { name, webId, teamName, teamPlayerNum } = getters.playerObject[s.playerId]
          if (index === -1) {
            score.push({
              playerId: s.playerId,
              playerName: name,
              webId: webId,
              nickName: nickName({ name, webId }),
              teamName: teamName,
              totalPoint: tmpPoints[i],
              totalGames: 1,
              totalScore: s.score,
              teamPlayerNum: teamPlayerNum,
              teamValidGameNum: minTeamGames / teamPlayerNum,
              teamValidTotalPoint: 0,
              avgPoint: tmpPoints[i],
              validAvgPoint: 0
            })
          } else {
            score[index].totalPoint += tmpPoints[i]
            score[index].totalGames += 1
            score[index].totalScore += s.score
            score[index].avgPoint = _.round(score[index].totalPoint / score[index].totalGames, 5)
            if (score[index].totalGames >= getters.validGameNum) {
              score[index].validAvgPoint = score[index].avgPoint
            }
            if (score[index].totalGames === score[index].teamValidGameNum) {
              score[index].teamValidTotalPoint = score[index].totalPoint
            }
          }
        })
      })

      return _.orderBy(score, ['validAvgPoint', 'totalGames'], ['desc', 'desc']).map((s, i) => ({
        ...s,
        ranking: i + 1
      }))
    },
    teamScore: function (state, getters) {
      let score = []
      if (getters.playerScore) {
        _.forEach(
          _.groupBy(getters.playerScore, 'teamName'),
          (playerScore, teamName) => {
            let totalGames = _.sumBy(playerScore, s => s.totalGames)
            let totalPoint = _.sumBy(playerScore, s => s.totalPoint)
            let totalScore = _.sumBy(playerScore, s => s.totalScore)

            let teamValidTotalPoint = 0
            for (let i = 0; i < playerScore.length; i++) {
              teamValidTotalPoint += playerScore[i].teamValidTotalPoint
              if (playerScore[i].teamValidTotalPoint === 0) {
                teamValidTotalPoint = 0
                break
              }
            }

            let avgPoint = _.round(totalPoint / totalGames, 5)
            let stdAvgPoint = _.round(state.rule.minTeamGames ? teamValidTotalPoint / state.rule.minTeamGames : 0, 5)
            score.push({
              teamName,
              totalGames,
              totalPoint,
              totalScore,
              playerNum: playerScore[0].teamPlayerNum,
              avgPoint,
              stdAvgPoint,
              validAvgPoint: stdAvgPoint > 0 ? Math.max(avgPoint, stdAvgPoint) : 0,
              playerScore
            })
          }
        )
      }
      return _.orderBy(score, 'validAvgPoint', 'desc')
        .map((s, i) => ({
          ...s,
          ranking: i + 1
        }))
    }
  },

  mutations: {
    [actions.INIT_MATCH_STATE] (state, payload) {
      state.players = [...payload.data.players]
      state.games = [...payload.data.games]
      state.rule = {...payload.data.rule}
    }
  }
})
