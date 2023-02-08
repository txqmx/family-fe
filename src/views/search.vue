<template>
  <div class="search-container">
    <form action="javascript:;">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <van-list
      class="search-list"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        @click="handleClick(item)"
      />
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import api from '@/api'
import { Toast } from 'vant'
export default defineComponent({
  data () {
    return {
      value: '',
      loading: false,
      finished: true,
      list: []
    }
  },
  mounted () {
    document.onkeydown = null // 避免触发其他页面事件
    window.history.pushState(null, null, window.location.hash)
    window.addEventListener('popstate', this.onCancel, false)
  },
  unmounted () {
    console.log(111)
    window.removeEventListener('popstate', this.onCancel, false)
  },
  methods: {
    ...mapMutations(['setSearchState']),
    async getList () {
      this.loading = true
      const list = await api.getMemberList({
        // genealogyId: 1,
        name: this.value
      })
      this.loading = false
      this.list = list
    },
    onSearch (e) {
      this.getList()
    },
    handleClick (item) {
      this.$emit('searchSubmit', item)
      this.onCancel()
    },
    onCancel (e) {
      if (!e) {
        window.history.back()
      }
      this.setSearchState(false)
    }
  }
})
</script>

<style lang="less" scoped>
.search-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: #ffffff;
  .search-list {
    height: calc(100% - 51px);
    overflow: auto;
  }
}
</style>
