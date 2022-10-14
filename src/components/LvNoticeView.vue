<template>
  <div class="lv-text-container">
    <div class="lv-text_title">家族动态</div>
    <van-divider />
    <div class="lv-text_content">
      <ul class="lv-list">
        <li class="lv-item" v-for="item in list" :key="item">
          {{item}}
          <div>
            <van-icon name="arrow" />
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="lv-text_more" @click="showMore">
      <van-icon v-if="expanded" name="arrow-up" />
      <van-icon v-else name="arrow-down" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LvNoticeView',
  data () {
    return {
      list: ['黄氏家族族谱建立', '黄氏家族族谱建立'],
      expanded: false
    }
  },
  methods: {
    showMore () {
      this.expanded = !this.expanded
    }
  }
})
</script>

<style lang="less" scoped>
.lv-text-container {
  position: relative;
  background: #ffffff;
  padding: 12px 16px 16px;
  .lv-text_title {
    font-size: 16px;
    color: #323233;
    line-height: 24px;
  }
  .lv-text_content {
    padding: 0 4px;
    // margin-bottom: 10px;
    font-size: 14px;
    color: #969799;
    // line-height: 1.5;
    overflow: hidden;
    .lv-list{
      .lv-item{
        height: 38px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: #ebedf0 1px solid;
      }
    }
  }
  .lv-text_more {
    text-align: center;
  }
  .van-divider {
    margin: 10px 0;
  }
}
</style>
