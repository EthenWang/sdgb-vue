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
