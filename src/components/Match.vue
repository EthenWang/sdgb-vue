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

export default {
  name: 'Match',
  data: function () {
    return {
      teamScoreCols: [
        {
          title: '排名',
          key: 'ranking'
        },
        {
          title: '队名',
          key: 'name'
        },
        {
          title: '总局数',
          key: 'totalGames'
        },
        {
          title: '总局分',
          key: 'totalPoints'
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
          key: 'playerNumber'
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
          title: '总局分',
          key: 'totalPoints'
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
  computed: {
    ...mapActions({
      created: actions.INIT_MATCH_STATE
    }),
    ...mapGetters([
      'teamScore', 'playerScore'
    ])
  }
}
</script>
