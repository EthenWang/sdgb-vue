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
import { mapGetters } from 'vuex'
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
      ]
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
          key: 'playerNum',
          sortable: true
        }
      ]
    }
  }
}
</script>
