<template>
  <Form label-position="top">
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
  </Form>
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
  props: ['gameId'],
  data: function () {
    /* const teamRule = function (index) {
      const teamMatch = isTeamMatch(this.rule.matchType)
      return function (rule, value, callback) {
        if (index >= 1 && teamMatch) {
          _.each(this.getGameScore, (s, i) => {
            if (i < index && s.teamId === value) {
              callback(new Error(`与第${i + 1}同队`))
              return
            }
            callback()
          })
        }
      }
    } */
    return {
      colspan: 0,
      gameScore: buildGameScore()
    }
  },
  created: function () {
    this.getGameScore(this.gameId)
  },
  mounted: function () {
    console.dir(this.$refs)
    this.colspan = this.$refs['items'][0].colspan - 3 // submit button width 3
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
      for (let i = 0; i < 4; i++) {
        let playerId = this.gameScore[i].playerId
        if (!playerId || !this.playerObject[playerId]) {
          return false
        }
      }
      if (_.keys(_.groupBy(this.gameScore, 'teamId')).length !== 4) {
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
      if (this.validScore) {

      }
    },
    getGameScore: function (gameId) {
      this.gameScore = buildGameScore(this.$store, parseInt(gameId))
    }
  }
}
</script>
