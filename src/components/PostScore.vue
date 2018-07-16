<template>
  <div>
    <PostScoreItem
      v-for="index in [0, 1, 2, 3]"
      :key="index"
      :index="index"
      :playerScore="gameScore[index]"
      ref="items"
    />
    <Row type="flex" justify="center" :gutter="20">
      <Col span="3" :offset="colspan">
        <Button
          :type="submitButtonState"
          @click="onSubmitScoreClick"
        >
          报分 ({{totalScore}})
        </Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import PostScoreItem from './PostScoreItem'
import { buildGameScore, isTeamMatch } from '../utils'
import { POST_GAME_SCORE } from '../store/actions'

export default {
  components: {
    PostScoreItem
  },
  props: ['gameId'],
  data: function () {
    return {
      colspan: 0,
      gameScore: buildGameScore()
    }
  },
  created: function () {
    this.getGameScore(this.gameId)
  },
  mounted: function () {
    this.colspan = this.$refs.items[0].colspan - 3 // submit button width 3
  },
  beforeRouteUpdate (to, from, next) {
    this.getGameScore(to.params.gameId)
    next()
  },
  computed: {
    ...mapState(['rule']),
    ...mapGetters(['teams', 'playerObject']),
    validScore: function () {
      if (this.totalScore !== 0) {
        return false
      }

      let allZero = true
      for (let i = 0; i < 4; i++) {
        if (this.gameScore[i].score !== 0) {
          allZero = false
        }
        let playerId = this.gameScore[i].playerId
        if (!playerId || !this.playerObject[playerId]) {
          return false
        }
      }
      if (allZero) {
        return false
      }

      if (isTeamMatch(this.rule.matchType) && _.keys(_.groupBy(this.gameScore, 'teamId')).length !== 4) {
        return false
      }
      return true
    },
    submitButtonState: function () {
      return this.validScore ? 'success' : 'error'
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
      let valid = true
      for (let i = 0; i < this.$refs.items.length; i++) {
        if (!this.$refs.items[i].validateInputs()) {
          valid = false
        }
      }
      if (this.validScore && valid) {
        this.$store.dispatch({
          type: POST_GAME_SCORE,
          score: this.gameScore
        })
      }
    },
    getGameScore: function (gameId) {
      this.gameScore = buildGameScore(this.$store, parseInt(gameId))
    }
  }
}
</script>
