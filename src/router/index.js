import Vue from 'vue'
import Router from 'vue-router'
import singer from 'components/singer/singer'
import singerDetail from 'components/singerDetail/singerDetail'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/singer'
    },
    {
      path: '/singer',
      component: singer,
      children: [{
        path: ':id',
        component: singerDetail
      }]
    }
  ]
})
