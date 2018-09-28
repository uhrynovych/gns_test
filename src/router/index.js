import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Table from '@/components/table'
import View from '@/components/item'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/items',
      name: 'table_page',
      component: Table
    },
    {
      path: '/item',
      redirect: {name: 'table_page'},
      component: View,
      children: [
        {
          path: ':id',
          name: 'itemView',
          component: View
        }
      ]
    }
  ]
})
