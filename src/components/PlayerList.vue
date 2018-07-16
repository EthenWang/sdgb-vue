<style lang="less">
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
        top: 0;
    }
  }
</style>

<template>
  <div class="player-list">
    <Row type="flex" justify="end">
      <Col span="1">
        <Tooltip content="编辑队员" placement="top">
          <a href="#" @click="onEditPlayer"><Icon type="edit" size="25"></Icon></a>
        </Tooltip>
      </Col>
      <Col span="1">
        <Tooltip content="添加队员" placement="top">
          <a href="#" @click="onAddPlayer"><Icon type="plus-round" size="30"></Icon></a>
        </Tooltip>
      </COl>
    </Row>
    <Table border stripe :columns="playerCols" :data="playerList"></Table>
    <EditPlayer ref="editPlayer" mode="edit"/>
    <EditPlayer ref="addPlayer" mode="add"/>
  </div>
</template>

<script>
import { Row, Col } from 'iview'
import EditPlayer from './EditPlayer'

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
    TeamPlayer, EditPlayer
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
    ...mapState(['players', 'rule']),
    ...mapGetters(['playerScore']),
    playerList: function () {
      return this.players.map(p => ({
        teamName: p.team.name,
        playerNum: p.players.length,
        players: p.players
      }))
    }
  },
  methods: {
    onEditPlayer: function () {
      this.$refs.editPlayer.show = true
    },
    onAddPlayer: function () {
      this.$refs.addPlayer.show = true
    }
  }
}
</script>
