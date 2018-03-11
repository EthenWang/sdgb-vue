<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <PostScoreItem
      :playerScore="playerScore"
      :allTeams="allTeams"
      :teamPlayers="teamPlayers"
    />
  </div>
</template>

<script>
import PostScoreItem from './components/PostScoreItem'
export default {
  name: 'App',
  components: { PostScoreItem },
  data: function () {
    return {
      allTeams: [],
      teamPlayers: [],
      playerScore: {
        teamId: 0,
        playerId: 0,
        score: 0,
        break: 0
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
