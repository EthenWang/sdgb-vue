<template>
  <Layout>
    <div id="app">
      <img src="./assets/logo.png">
    </div>
    <router-view />
    <p slot="footer">
      2001 - {{ new Date().getFullYear() }} 盛殿国标麻将运动协会
    </p>
  </Layout>
</template>

<script>
import * as actions from './store/actions'
import Layout from './components/Layout'

export default {
  name: 'App',
  components: {
    Layout
  },
  created: function () {
    this.init()
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
