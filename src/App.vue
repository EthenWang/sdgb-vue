<template>
  <div>
    <div id="app">
      <img src="./assets/logo.png">
      <router-view/>
    </div>
    <PostScore :gameId="100" />
    <Match />
    <PlayerList />
  </div>
</template>

<script>
import PostScore from './components/PostScore'
import Match from './components/Match'
import PlayerList from './components/PlayerList'
import * as actions from './store/actions'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PostScore, Match, PlayerList
  },
  created: async function () {
    /* Mot 100% sure if needing to make it as an async method. 'init' will fire INIT_MATCH_STATE action which will load data from server.
       I just want to make sure that 'created' in child components won't be executed until its parent 'created' executing finishes */
    await this.init()
  },
  methods: {
    ...mapActions({
      init: actions.INIT_MATCH_STATE
    })
  }
}
</script>

<style>
@import './assets/sdgb.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
