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
    this.gameScore = buildGameScore(this.$store, this.gameId)
  },
  computed: {
    validScore: function () {
      if (this.totalScore !== 0) {
        return false
      }
      /* to do score input validation ... */
      return true
    },
    totalScore: function () {
      return _.sumBy(this.gameScore, 'score')
    }
  },
  methods: {
    onSubmitScoreClick: function () {
      /* to do submit score */
    },
    onScoreItemMounted: function ({ colspan }) {
      this.colspan = colspan - 3 // submit button width 3
    }
  }
}
</script>
