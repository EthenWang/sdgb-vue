<style scoped>
.score-title {
  font-size: x-large;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.score-title-extra {
  font-size: smaller;
}
</style>

<template>
  <div>
    <div class="team-score">
      <p class="score-title">团体赛成绩</p>
      <Table border stripe :columns="teamScoreCols" :data="teamScore"></Table>
    </div>
    <div class="player-score">
      <div class="score-title">
        <span>个人赛成绩</span>
        <span class="score-title-extra">当前有效局数: {{ validGameNum }}</span>
      </div>
      <Table border stripe :columns="playerScoreCols" :data="playerScore"></Table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
          key: 'nickName',
          sortable: true
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
      'teamScore', 'playerScore', 'validGameNum'
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
          key: 'teamName',
          sortable: true
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
