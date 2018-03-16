import Vue from 'vue'
import Vuex from 'vuex'
import * as _ from 'lodash'
import * as actions from './actions'
import { ajaxCall } from '../utils/ajax'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matchId: 0, // 0 means the match under way
    teams: [
      {
        id: 1,
        name: 't1'
      },
      {
        id: 2,
        name: 't2'
      }
    ],
    players: [],
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
  }
})
