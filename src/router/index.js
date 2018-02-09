import Vue from 'vue'
import Router from 'vue-router'
import singer from 'components/singer/singer'
import search from 'components/search/search'
import singerDetail from 'components/singerDetail/singerDetail'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/search'
    },
    {
      path: '/singer',
      component: singer,
      children: [{
        path: ':id',
        component: singerDetail
      }]
    },
    {
      path: '/search',
      component: search
    }
  ],
  linkActiveClass: 'active'
})
