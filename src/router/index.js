import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//import map1 from '@/components/map/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/map1',
      name: 'map1',
     component: resolve => require(['@/views/business/map1/index'], resolve),
  },
  {
    path: '/ceshi1',
    name: 'ceshi1',
    component: resolve => require(['@/views/business/ceshi1/index'], resolve),
},{
  path: '/gltest',
  name: 'gltest',
  component: resolve => require(['@/views/business/gltest/index'], resolve),
},
  {
  path: '/mapmain',
  name: 'mapmain',
  component: resolve => require(['@/views/business/mapmain/index'], resolve),
},
  ]
})
