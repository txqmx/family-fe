import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Home1 from '../views/Home1.vue'
import familyTree from '../views/familyTree.vue'
import Login from '../views/Login.vue'
import familySvg from '../views/familySvg.vue'
import search from '../views/search.vue'
import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/Login',
    name: 'Login',
    meta: {
      index: 1
    },
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      index: 1
    },
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
    path: '/familySvg',
    name: 'familySvg',
    meta: {
      index: 2
    },
    component: familySvg
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      index: 3
    },
    component: search
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
const setoRouteTransitionName = (to, from) => {
  let transitionName = ''
  if (to.meta.index > from.meta.index) {
    transitionName = 'slide-l' // 向左滑动
  } else if (to.meta.index < from.meta.index) {
    // 由次级到主级
    transitionName = 'slide-r'
  } else {
    transitionName = '' // 同级无过渡效果
  }
  store.commit('setTransitionName', transitionName)
}
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  if (to.name !== 'Login' && to.name !== 'familySvg' && !token) {
    next({ path: '/Login' })
  }
  setoRouteTransitionName(to, from)
  next()
})

export default router
