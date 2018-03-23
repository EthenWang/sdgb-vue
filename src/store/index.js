import Vue from 'vue'
import Vuex from 'vuex'
import * as _ from 'lodash'
import * as actions from './actions'
import { ajaxCall } from '../utils/ajax'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  state: {
    matchId: 0, // 0 means the match under way
    players: [
      {
        teamName: 't1',
        player: [
          {
            name: 't1_p1',
            webId: 't1_p1'
          },
          {
            name: 't1_p2',
            webId: 't1_p2'
          }
        ]
      },
      {
        teamName: 't2',
        player: [
          {
            name: 't2_p1',
            webId: 't2_p1'
          },
          {
            name: 't2_p2',
            webId: 't2_p2'
          }
        ]
      }
    ],
    games: [],
    Rule: {}
  },

  actions: {
    [actions.INIT_MATCH_STATE] ({ commit, state }) {
      ajaxCall({
        url: `api/match/${state.matchId}`
      }, function (response) {
        commit({
          type: actions.INIT_MATCH_STATE,
          data: response
        })
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
    teamScore: function () {

    },
    playerScore: function () {

    }
  }
})
