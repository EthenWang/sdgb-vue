<template>
  <div>
    <PostScoreItem
      v-for="index in [0, 1, 2, 3]"
      :key="index"
      :index="index"
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
import { Button } from 'iview'
import { mapState } from 'vuex'
import * as _ from 'lodash'
import PostScoreItem from './PostScoreItem'

export default {
  components: {
    PostScoreItem, Button
  },
  data: function () {
    return {
      colspan: 0
    }
  },
  computed: {
    ...mapState([
      'gameScore'
    ]),
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
