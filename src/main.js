// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './store'

import 'common/css/initial.css'
import 'common/css/icon.css'

// Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('common/img/logo.jpg')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
