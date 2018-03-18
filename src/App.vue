<template>
  <div>
    <div id="app">
      <img src="./assets/logo.png">
      <router-view/>
    </div>
    <PostScore />
    <Match />
    <PlayerList />
  </div>
</template>

<script>
import PostScore from './components/PostScore'
import Match from './components/Match'
import PlayerList from './components/PlayerList'

export default {
  name: 'App',
  components: {
    PostScore, Match, PlayerList
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
