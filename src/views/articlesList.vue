<template>
  <div class="article-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.id">
        <div class="article-item" @click="entryDetail(item)">
          <div class="article-msg">
            <div class="article-title">
                <van-tag color="#fef0f0" text-color="#f56c6c">资讯动态</van-tag>
                {{ item.name }}
            </div>
            <div class="article-author">{{ item.name }}</div>
        </div>
        <van-image
            class="article-img"
              :src="item.cover"
            >
            </van-image>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import api from '@/api'
export default defineComponent({
  name: 'articlesList',
  data () {
    return {
      loading: true,
      finished: false,
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    onLoad () {
      this.loading = false
    },
    async getList () {
      this.$setLoading(true)
      this.list = await api.getArticlesList({
        type: 'zxdt'
      })
      this.$setLoading(false)
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
.article-list {
  background: #ffffff;
  height: calc(100% - 51px);
  overflow: auto;
  .article-item {
    display: flex;
    .article-msg {
      flex: 1;
      .article-title{
        display: flex;
        align-items: center;
        font-size: 16px;
        .van-tag{
            margin-right: 5px;
            border: 1px solid #fde2e2;
        }
      }
      .article-author{
        position: absolute;
        bottom: 0;
        font-size: 13px;
        color: #aeafb1;
      }
    }
    .article-img {

      width: 90px;
      height: 60px;
    }
  }
}
</style>
