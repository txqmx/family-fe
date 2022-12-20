<template>
  <div class="lv-text-container">
    <div class="lv-text_title">
      <span>家族动态</span>
      <span class="more-btn" @click="entryMore">
        更多
        <van-icon name="arrow" />
      </span>

    </div>
    <van-divider />
    <div class="lv-text_content">
      <ul class="lv-list">
        <li  v-for="item in list" :key="item">
          <div class="lv-item" @click="entryDetail(item)">
            {{item.name}}
          <div>
            <van-icon name="arrow" />
          </div></div>

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
import api from '@/api'
export default defineComponent({
  name: 'LvNoticeView',
  data () {
    return {
      list: ['杜氏家族族谱建立', '杜氏家族族谱建立'],
      expanded: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      this.list = await api.getArticlesList({
        id: '1,2,3',
        type: 'zxdt'
      })
    },
    showMore () {
      this.expanded = !this.expanded
    },
    entryMore () {
      this.$router.push({
        name: 'articlesList',
        query: {
          type: 'zxdt'
        }
      })
    },
    entryDetail (item) {
      this.$router.push({
        name: 'articlesDetail',
        query: {
          id: item.id
        }
      })
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
    display: flex;
    justify-content: space-between;
    .more-btn{
      cursor: pointer;
      font-size: 13px;
      color: #aeafb1;
    }
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
    margin: 10px 0 0 0;
  }
}
</style>
