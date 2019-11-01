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
  ]
})
