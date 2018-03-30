<template>
  <div>
    <PostScoreItem
      v-for="index in [0, 1, 2, 3]"
      :key="index"
      :index="index"
      :playerScore="gameScore[index]"
      @scoreItemMounted="onScoreItemMounted"
    />
    <Row type="flex" justify="center" :gutter="20">
      <Col span="3" :offset="colspan">
        <Button
          :type="validScore ? 'success' : 'error'"
          @click="onSubmitScoreClick"
        >
          报分 ({{totalScore}})
        </Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as _ from 'lodash'
import PostScoreItem from './PostScoreItem'
import { buildGameScore } from '../utils'
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    PostScoreItem
  },
  props: {
    gameId: {
      type: Number
    }
  },
  data: function () {
    return {
      colspan: 0,
      gameScore: buildGameScore()
    }
  },
  created: function () {
    if (this.gameId) {
      this.gameScore = buildGameScore(this.$store, this.gameId)
    }
  },
  computed: {
    ...mapState(['rule']),
    ...mapGetters(['teams', 'playerObject']),
    validScore: function () {
      if (this.totalScore !== 0) {
        return false
      }
      for (let i = 0; i < 4; i++) {
        let playerId = this.gameScore[i].playerId
        if (!playerId || !this.playerObject[playerId]) {
          return false
        }
      }
      if (_.groupBy(this.gameScore, 'teamId').length !== 4) {
        return false
      }
      return true
    },
    totalScore: function () {
      let sum = _.sumBy(this.gameScore, 'score')
      if (this.rule.breakPunish) {
        sum += _.sumBy(this.gameScore, 'break') * this.rule.punishPoint
      }
      return sum
    }
  },
  methods: {
    onSubmitScoreClick: function () {
      /* to do submit score */
      if (this.validScore) {

      }
    },
    onScoreItemMounted: function ({ colspan }) {
      this.colspan = colspan - 3 // submit button width 3
    }
  }
}
</script>
