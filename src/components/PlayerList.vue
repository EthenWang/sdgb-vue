<template>
  <div class="player-list">
    <Table border stripe :columns="playerCols" :data="playerList"></Table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from 'iview'
// import { copyArray } from '../utils'

export default {
  name: 'PlayerList',
  components: {
    Icon
  },
  data: function () {
    return {
      playerCols: [
        {
          title: '队名',
          key: 'teamName'
        },
        {
          title: '队员',
          key: 'players',
          render: function (h, params) {
            return h(
              'div',
              [
                params.row.name,
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'edit'
                    }
                  }),
                  h('Icon', {
                    props: {
                      type: 'minus-circled'
                    }
                  })
                ])
              ]
            )
          }
        },
        {
          title: '网络Id',
          key: 'webId'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['playerScore', 'playerList']) /* ,
    players: function () {
      let playerList = this.playerList
      let teamName = playerList[0].teamName
      playerList.forEach(player => {
        if (player.teamName === teamName) {
          teamName = player.teamName
          player.rowspan = 2
        }
      })
      return playerList
    } */
  }
}
</script>
