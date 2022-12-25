<template>
  <div class="layout-cantainer">
    <van-nav-bar
      v-show="routeName !== 'Login'"
      class="vav-bar"
      title="宗信堂"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon
          v-show="routeName === 'familySvg'"
          name="search"
          size="18"
          @click="search"
        />
      </template>
    </van-nav-bar>
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Layout',
  data () {
    return {
      loading: false
    }
  },

  computed: {
    routeName () {
      return this.$route.name
    }
  },
  methods: {
    onClickLeft () {
      this.$store.commit('setSearchState', false)
      history.back()
    },
    search () {
      this.$router.push({ name: 'search' })
    }
  }
})
</script>

<style lang="less" scoped>
.layout-cantainer {
  height: 100%;
  .vav-bar {
    border-bottom: #f2f2f2 1px solid;
  }
  .layout-content {
    position: relative;
    height: calc(100% - 47px);
    overflow: hidden;
  }
}
</style>
