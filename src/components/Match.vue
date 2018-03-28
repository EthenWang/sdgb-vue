<template>
  <div>
    <div class="team-score">
      <Table border stripe :columns="teamScoreCols" :data="teamScore"></Table>
    </div>
    <div class="player-score">
      <Table border stripe :columns="playerScoreCols" :data="playerScore"></Table>
    </div>
    <div>
      <Rule :model="rule" />
    </div>
  </div>
</template>

<script>
import * as actions from '../store/actions'
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import { Row, Col } from 'iview'
import Rule from './Rule'
import * as _ from 'lodash'

const TeamPlayer = Vue.extend({
  props: {
    playerScore: {
      type: Array,
      required: true
    }
  },
  components: {
    Row, Col
  },
  render: function (h) { // Why "h" must be here?
    return (
      <div>
        {this.playerScore.map((p, i) =>
          <Row class="expand-row">
            <Col span="4">
              <span class="expand-key">队员{i + 1}: </span>
              <span class="expand-value">{p.nickName}</span>
            </Col>
            <Col span="4">
              <span class="expand-key">排名:</span>
              <span class="expand-value">{p.ranking}</span>
            </Col>
            <Col span="4">
              <span class="expand-key">总局数:</span>
              <span class="expand-value">{p.totalGames}</span>
            </Col>
            <Col span="4">
              <span class="expand-key">均分: </span>
              <span class="expand-value">{p.avgPoint}</span>
            </Col>
            <Col span="4">
              <span class="expand-key">有效均分:</span>
              <span class="expand-value">{p.validAvgPoint}</span>
            </Col>
            <Col span="4">
              <span class="expand-key">总分:</span>
              <span class="expand-value">{p.totalScore}</span>
            </Col>
          </Row>
        )}
      </div>
    )
  }
})

export default {
  name: 'Match',
  components: {
    Rule
  },
  data: function () {
    return {
      playerScoreCols: [
        {
          title: '排名',
          key: 'ranking',
          sortable: true
        },
        {
          title: '昵称',
          key: 'nickName'
        },
        {
          title: '总局数',
          key: 'totalGames',
          sortable: true
        },
        {
          title: '均分',
          key: 'avgPoint',
          sortable: true
        },
        {
          title: '有效均分',
          key: 'validAvgPoint',
          sortable: true
        },
        {
          title: '总分',
          key: 'totalScore',
          sortable: true
        }
      ],
      rule: {
        matchType: '',
        minTeamPlayers: 0,
        maxTeamPlayers: 0,
        minTeamGames: 0,
        minPlayerGames: 0,
        maxPlayerGames: 0,
        globalRanking: false,
        points: [0, 0, 0, 0],
        breakPunish: false,
        punishPoint: 0
      }
    }
  },
  created: async function () {
    await this.init()
    const gameRule = _.cloneDeep(this.$store.state.rule)
    if (gameRule) {
      this.rule = gameRule
    }
  },
  computed: {
    ...mapGetters([
      'teamScore', 'playerScore'
    ]),
    teamScoreCols: function () {
      const { minTeamGames } = this.$store.state.rule
      return [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(TeamPlayer, {
              props: {
                playerScore: params.row.playerScore
              }
            })
          }
        },
        {
          title: '排名',
          key: 'ranking',
          sortable: true
        },
        {
          title: '队名',
          key: 'teamName'
        },
        {
          title: '总局数',
          key: 'totalGames',
          sortable: true
        },
        {
          title: '总均分',
          key: 'avgPoint',
          sortable: true
        },
        {
          title: '有效均分',
          key: 'validAvgPoint',
          sortable: true
        },
        {
          title: `前${minTeamGames}局均分`,
          key: 'stdAvgPoint',
          sortable: true
        },
        {
          title: '总分',
          key: 'totalScore',
          sortable: true
        },
        {
          title: '队员数',
          key: 'playerNum'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      init: actions.INIT_MATCH_STATE
    })
  }
}
</script>
