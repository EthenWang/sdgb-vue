import Vue from 'vue'
import Vuex from 'vuex'
import * as _ from 'lodash'
import * as actions from './actions'
import { ajaxCall } from '../utils/ajax'
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
    [actions.INIT_MATCH_STATE] ({ commit, state }) {
      /* ajaxCall({
        url: `api/match/${state.matchId}`
      }, function (response) {
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

    [actions.GET_TEAM_PLAYERS] ({ commit, state }, teamId) {
      if (_.some(state.players, { teamId })) {
        return
      }

      ajaxCall({
        url: `api/team/getplayers/${teamId}`
      }, function (response) {
        commit({
          type: actions.GET_TEAM_PLAYERS,
          data: response
        })
      })
    }
  },

  getters: {
    playerScore: function (state) {
      const { points, minPlayerGames, minTeamGames } = state.rule

      const calcPoints = function ({ score }) {
        let tmpPoints = [0, 0, 0, 0]
        let tmpScore = _.groupBy(score.map((s, index) => ({ ...s, index })), s => s.score)
        _.each(tmpScore, (value, key) => {
          let totalPoints = _.sumBy(value, val => points[val.index])
          _.each(value, val => {
            tmpPoints[val.index] = totalPoints / value.length
          })
        })
        return tmpPoints
      }

      let playerCache = {}
      const findPlayer = function (playerId) {
        if (playerCache[playerId] != null) {
          return playerCache[playerId]
        }

        let player
        let team = _.find(state.players, t => {
          player = _.find(t.players, p => p.id === playerId)
          return player !== undefined
        })
        playerCache[playerId] = { team, player }
        return { team, player }
      }

      let score = []
      state.games.forEach(g => {
        let tmpPoints = calcPoints(g)
        g.score.forEach((s, i) => {
          const index = _.findIndex(score, a => a.playerId === s.playerId)
          const { team, player } = findPlayer(s.playerId)
          if (index === -1) {
            score.push({
              playerId: s.playerId,
              playerName: player.name,
              webId: player.webId,
              nickName: nickName(player),
              teamName: team.team.name,
              totalPoint: tmpPoints[i],
              totalGames: 1,
              totalScore: s.score,
              playerNum: team.players.length,
              teamValidGameNum: minTeamGames / team.players.length,
              teamValidTotalPoint: 0,
              avgPoint: tmpPoints[i]
            })
          } else {
            score[index].totalPoint += tmpPoints[i]
            score[index].totalGames += 1
            score[index].totalScore += s.score
            score[index].avgPoint = _.round(score[index].totalPoint / score[index].totalGames, 5)
            if (score[index].totalGames >= minPlayerGames) {
              score[index].validAvgPoint = score[index].avgPoint
            }
            if (score[index].totalGames === score[index].teamValidGameNum) {
              score[index].teamValidTotalPoint = score[index].totalPoint
            }
          }
        })
      })

      return _.orderBy(score, 'validAvgPoint', 'desc').map((s, i) => ({
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
              playerNum: playerScore[0].playerNum,
              avgPoint,
              stdAvgPoint,
              validAvgPoint: stdAvgPoint > 0 ? Math.max(avgPoint, stdAvgPoint) : 0,
              playerScore
            })
          }
        )
      }
      return _.orderBy(score, 'validAvgPoint', 'desc').map((s, i) => ({
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
