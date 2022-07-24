import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Home1 from '../views/Home1.vue'
import familyTree from '../views/familyTree.vue'
import MemberDetail from '../views/MemberDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home1',
    name: 'Home1',
    component: Home1
  },
  {
    path: '/familyTree',
    name: 'Tree',
    component: familyTree
  },
  {
    path: '/MemberDetail',
    name: 'MemberDetail',
    component: MemberDetail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
