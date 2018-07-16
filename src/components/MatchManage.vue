<template>
  <div>
    <Tabs>
      <TabPane label="比赛规则" name="rule">
        <Rule :model="rule" />
      </TabPane>
      <TabPane label="参赛人员管理" name="playerManage">
        <PlayerList />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import PlayerList from './PlayerList'
import Rule from './Rule'

export default {
  name: 'MatchManage',
  components: {
    Rule, PlayerList
  },
  data: function () {
    return {
      rule: {
        matchType: '',
        minTeamPlayers: 0,
        maxTeamPlayers: 0,
        minTeamGames: 0,
        minPlayerGames: 0,
        maxPlayerGames: 0,
        globalRanking: false,
        points: [0, 0, 0, 0],
        breakPunish: false,
        punishPoint: 0
      }
    }
  },
  mounted: function () {
    if (this.$store.state.rule) {
      this.rule = _.cloneDeep(this.$store.state.rule)
    }
  }
}
</script>
