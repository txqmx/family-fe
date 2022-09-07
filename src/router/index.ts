import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Home1 from '../views/Home1.vue'
import familyTree from '../views/familyTree.vue'
import MemberDetail from '../views/MemberDetail.vue'
import Login from '../views/Login.vue'
import familySvg from '../views/familySvg.vue'
import liu from '../views/1.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
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
  },
  {
    path: '/familySvg',
    name: 'familySvg',
    component: familySvg
  },
  {
    path: '/liu',
    name: 'liu',
    component: liu
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const token = window.sessionStorage.getItem('token')
//   if (to.name !== 'Login' && !token) {
//     next({ path: '/Login' })
//   }
//   next()
// })

export default router
