import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import familySvg from '../views/familySvg.vue'
// import { miniProgramNavigateTo } from '../utils/Weixin.js'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/Login',
    name: 'Login',
    meta: {
      index: 1
    },
    component: () => import('../views/Login.vue')
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
    component: () => import('../views/search.vue')
  },
  {
    path: '/articlesList',
    name: 'articlesList',
    meta: {
      index: 2
    },
    component: () => import('../views/articlesList.vue')
  },
  {
    path: '/articlesDetail',
    name: 'articlesDetail',
    meta: {
      index: 3
    },
    component: () => import('../views/articlesDetail.vue')
  },
  {
    path: '/imgList',
    name: 'imgList',
    meta: {
      index: 2
    },
    component: () => import('../views/imgList.vue')

  },
  {
    path: '/videoList',
    name: 'videoList',
    meta: {
      index: 2
    },
    component: () => import('../views/videoList.vue')
  },
  {
    path: '/videoDetail',
    name: 'videoDetail',
    meta: {
      index: 3
    },
    component: () => import('../views/videoDetail.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
const setoRouteTransitionName = (to, from) => {
  let transitionName = ''
  console.log(to.meta.index, from.meta.index)
  if (to.meta.index > from.meta.index) {
    transitionName = 'slide' // 向左滑动
  } else if (to.meta.index < from.meta.index) {
    // 由次级到主级
    transitionName = 'return'
  } else {
    transitionName = 'border' // 同级无过渡效果
  }
  store.commit('setTransitionName', transitionName)
}
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  console.log(222, to, from)
  if (store.state.onMiniPrograms) {
    const url = 'http://192.168.0.104:8080/#' + to.path
    // miniProgramNavigateTo(url)
    console.log(url, to.name)
    if (from.name) {
      window.uniWebview.navigateTo({
        url: `/pages/component/web-view/web-view?url=${decodeURIComponent(url)}`
      })
    } else {
      next()
    }
  } else {
    // if (to.name !== 'Login' && !token) {
    //   next({ path: '/Login' })
    // }
    setoRouteTransitionName(to, from)
    next()
  }
})

export default router
