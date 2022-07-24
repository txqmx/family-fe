<template>
  <van-nav-bar
    title="宗信堂"
    left-arrow
    @click-left="onClickLeft"
    />
  <div class="loading_overlay" v-if="loading">
    <van-loading type="spinner" />
  </div>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const onClickLeft = () => {
      history.back()
    }
    return {
      loading: computed(() => store.state.loading),
      onClickLeft
    }
  }
})
</script>
<style lang="less">
html, body, #app{
  height: 100%;
  overflow: hidden;
}
#app{
  position: relative;
  background: #f7f8fa;
}
.loading_overlay{
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
