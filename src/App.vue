<template>
  <van-nav-bar v-show="routeName !== 'Login'" class="vav-bar" title="宗信堂" left-arrow @click-left="onClickLeft">
    <template #right>
      <van-icon v-show="routeName === 'familySvg'" name="search" size="18" @click="search" />
    </template>
  </van-nav-bar>
  <lv-loading/>
  <member-detail></member-detail>
  <img-preview v-if="state.imgPreviewShow"></img-preview>
  <router-view v-slot="{ Component,route }">
    <transition :name="state.transitionName">
      <component :is="Component" :key="route.path" mode="out-in" />
    </transition>
  </router-view>

</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import MemberDetail from './components/MemberDetail.vue'
import ImgPreview from '@/components/base/ImgPreview.vue'
import LvLoading from '@/components/base/LvLoading.vue'
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
  components: { MemberDetail, ImgPreview, LvLoading }
})
</script>
<style lang="less">
.vav-bar {
  border-bottom: #f2f2f2 1px solid;
}
</style>
