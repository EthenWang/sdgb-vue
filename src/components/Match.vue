<template>
  <Table border stripe :columns="teamScoreCols" :data="teamScore"></Table>
  <Table border stripe :columns="playerScoreCols" :data="playerScore"></Table>
</template>

<script>
import * as actions from '../store/actions'
import { mapActions } from 'vuex'

export default {
  name: 'Match',
  data: function () {
    return {
      teamScoreCols: [],
      playerScoreCols: []
    }
  },
  computed: {
    ...mapActions({
      created: actions.INIT_MATCH_STATE
    })
  }
}
</script>
