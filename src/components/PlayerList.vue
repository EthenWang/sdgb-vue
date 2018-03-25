<style>
.expand-row {
  padding-bottom: 10px;
}

.expand-key {
  padding: 0 10px 0 0;
}
</style>

<template>
  <div class="player-list">
    <Table border stripe :columns="playerCols" :data="playerList"></Table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Vue from 'vue'
import { Row, Col } from 'iview'

const TeamPlayer = Vue.extend({
  props: {
    players: {
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
        {this.players.map((p, i) =>
          <Row class="expand-row">
            <Col span="8">
              <span class="expand-key">队员{i + 1}: </span>
              <span class="expand-value">{p.name}</span>
            </Col>
            <Col span="8">
              <span class="expand-key">网络Id:</span>
              <span class="expand-value">{p.webId}</span>
            </Col>
            <Col span="8">
              <span class="expand-key">已完成局数:</span>
              <span class="expand-value">{p.numGames || 0}</span>
            </Col>
          </Row>
        )}
      </div>
    )
  }
})

export default {
  name: 'PlayerList',
  components: {
    TeamPlayer
  },
  data: function () {
    return {
      playerCols: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(TeamPlayer, {
              props: {
                players: params.row.players
              }
            })
          }
        },
        {
          title: '队名',
          key: 'teamName'
        },
        {
          title: '队员数',
          key: 'playerNum'
        }
      ]
    }
  },
  computed: {
    ...mapState(['players']),
    ...mapGetters(['playerScore']),
    playerList: function () {
      return this.players.map(p => ({
        teamName: p.team.name,
        playerNum: p.players.length,
        players: p.players
      }))
    }
  }
}
</script>
