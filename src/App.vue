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
  <router-view />
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup () {
    const store = useStore()
    const route = useRoute()
    const onClickLeft = () => {
      store.commit('setSearchState', false)
      history.back()
    }
    const search = () => {
      store.commit('setSearchState', true)
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
  }
})
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
#app {
  position: relative;
  background: #f7f8fa;
}
.loading_overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
