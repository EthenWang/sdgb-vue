<template>
  <div>
    <div id="app">
      <img src="./assets/logo.png">
      <router-view/>
    </div>
    <PostScore />
  </div>
</template>

<script>
import PostScore from './components/PostScore'

export default {
  name: 'App',
  components: {
    PostScore
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
