import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Input from '@/components/input'
import Bindone from '@/components/bindone'
import Computed from '@/components/computed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/computed',
      name: 'Computed',
      component: Computed
    },
    {
      path: '/input',
      name: 'Input',
      component: Input
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/bindone',
      name: 'Bindone',
      component: Bindone
    },
  ]
})
