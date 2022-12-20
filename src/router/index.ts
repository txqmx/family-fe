import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import familySvg from '../views/familySvg.vue'
import search from '../views/search.vue'
import articlesList from '../views/articlesList.vue'
import articlesDetail from '../views/articlesDetail.vue'
import imgList from '../views/imgList.vue'
import imgDetail from '../views/imgDetail.vue'
// import articlesList from '../views/articlesList.vue'
// import articlesDetail from '../views/articlesDetail.vue'
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
  },
  {
    path: '/articlesList',
    name: 'articlesList',

    component: articlesList
  },
  {
    path: '/articlesDetail',
    name: 'articlesDetail',

    component: articlesDetail
  },
  {
    path: '/imgList',
    name: 'imgList',

    component: imgList
  },
  {
    path: '/imgDetail',
    name: 'imgDetail',

    component: imgDetail
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
