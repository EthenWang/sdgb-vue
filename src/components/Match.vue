<template>
  <div>
    <div class="team-score">
      <Table border stripe :columns="teamScoreCols" :data="teamScore"></Table>
    </div>
    <div class="player-score">
      <Table border stripe :columns="playerScoreCols" :data="playerScore"></Table>
    </div>
  </div>
</template>

<script>
import * as actions from '../store/actions'
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import { Row, Col } from 'iview'

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
  data: function () {
    return {
      teamScoreCols: [
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
          key: 'ranking'
        },
        {
          title: '队名',
          key: 'teamName'
        },
        {
          title: '总局数',
          key: 'totalGames'
        },
        {
          title: '总均分',
          key: 'avgPoint'
        },
        {
          title: '有效均分',
          key: 'validAvgPoint'
        },
        {
          title: '前XXX局均分',
          key: 'stdAvgPoint'
        },
        {
          title: '总分',
          key: 'totalScore'
        },
        {
          title: '队员数',
          key: 'playerNum'
        }
      ],
      playerScoreCols: [
        {
          title: '排名',
          key: 'ranking'
        },
        {
          title: '昵称',
          key: 'nickName'
        },
        {
          title: '总局数',
          key: 'totalGames'
        },
        {
          title: '均分',
          key: 'avgPoint'
        },
        {
          title: '有效均分',
          key: 'validAvgPoint'
        },
        {
          title: '总分',
          key: 'totalScore'
        }
      ]
    }
  },
  created: function () {
    this.init()
  },
  computed: {
    ...mapGetters([
      'teamScore', 'playerScore'
    ])
  },
  methods: {
    ...mapActions({
      init: actions.INIT_MATCH_STATE
    })
  }
}
</script>
