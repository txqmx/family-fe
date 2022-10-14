<template>
  <van-nav-bar
    v-show="routeName !== 'Login'"
    title="宗信堂"
    left-arrow
    @click-left="onClickLeft"
  >
    <template #right>
      <van-icon v-show="routeName === 'familySvg'" name="search" size="18" @click="search"/>
    </template>
  </van-nav-bar>
  <div class="loading_overlay" v-if="state.loading">
    <van-loading type="spinner" />
  </div>
  <member-detail></member-detail>
  <router-view v-slot="{ Component }">
  <transition :name="state.transitionName">
    <component :is="Component" />
  </transition>
</router-view>

</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import MemberDetail from './components/MemberDetail.vue'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const onClickLeft = () => {
      store.commit('setSearchState', false)
      history.back()
    }
    const search = () => {
      router.push({ name: 'search' })
      // store.commit('setSearchState', true)
    }
    return {
      state: computed(() => {
        return store.state
      }),
      routeName: computed(() => {
        return route.name
      }),
      search,
      onClickLeft
    }
  },
  components: { MemberDetail }
})
</script>
<style lang="less">
//定义过度动画
.slide-l-enter-active,
.slide-l-leave-active,
.slide-r-enter-active,
.slide-r-leave-active {
  transition: all 0.6s;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  // top: 0;
}
//左滑过度
.slide-l-enter {
  opacity: 0;
  transform: translateX(100%);
}
.slide-l-enter-to,
.slide-l-leave {
  opacity: 1;
  transform: translateX(0);
}
.slide-l-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
//右滑过度
.slide-r-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-r-enter-to,
.slide-r-leave {
  opacity: 1;
  transform: translateX(0);
}
.slide-r-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

</style>
