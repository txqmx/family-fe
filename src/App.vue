<template>
  <member-detail></member-detail>
  <!-- loading -->
  <lv-loading />

  <!-- 图片查看器 -->
  <img-preview v-if="state.imgPreviewShow"></img-preview>

  <layout>
    <router-view v-slot="{ Component, route }">
      <transition :name="state.transitionName">
        <keep-alive :exclude="['Login']">
          <component :is="Component" :key="route.path" mode="out-in" />
        </keep-alive>
      </transition>
    </router-view>
  </layout>

</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import MemberDetail from '@/components/MemberDetail.vue'
import ImgPreview from '@/components/base/ImgPreview.vue'
import LvLoading from '@/components/base/LvLoading.vue'
import Layout from '@/components/layout/Layout.vue'
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
  components: { MemberDetail, ImgPreview, LvLoading, Layout }
})
</script>
<style lang="less"></style>
