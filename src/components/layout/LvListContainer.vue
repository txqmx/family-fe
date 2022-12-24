<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
  <p>刷新次数: {{ count }}</p>
</van-pull-refresh>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LvListContainer',
  data () {
    return {
      loading: false
    }
  },
  props: {
    title: {
      default: ''
    },
    isExpanded: {
      default: false
    }
  },
  mounted () {
    if (this.isExpanded) {
      this.minHeight = '200px'
    }
  },
  computed: {
    minHeight () {
      if (this.isExpanded) {
        return this.expanded ? '' : '200px'
      } else {
        return ''
      }
    }
  },
  methods: {
    onRefresh () {
      console.log(11)
    }
  }
})
</script>

<style lang="less" scoped>
.lv-card-container {
  position: relative;
  background: #ffffff;
  padding: 12px 16px;

  .lv-card_title {
    font-size: 16px;
    color: #323233;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .more-btn {
      cursor: pointer;
      font-size: 13px;
      color: #aeafb1;
    }

  }

  .lv-card_content {
    padding: 0 4px;
    // margin-bottom: 10px;
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
    overflow: hidden;
  }

  .lv-text_more {
    padding-top: 10px;
    text-align: center;
  }

  .van-divider {
    margin: 10px 0 0 0;
  }

  .more-style {
    width: 16px;
    height: 16px
  }
}
</style>
