// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as utils from './utils'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueAxios, axios)
Vue.utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
