<template>
  <div class="article-list">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="article-item" v-for="item in list" :key="item.id">
        <img-card :img-item="item" :type="'card'"></img-card>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ImgCard from '@/components/base/ImgCard.vue'
import api from '@/api'
export default defineComponent({
  name: 'imgList',
  components: { ImgCard },
  data () {
    return {
      loading: true,
      finished: false,
      list: [],
      imgs: ['http://localhost:8080/img/5.jpeg']
    }
  },
  created () {
    this.getList()
  },
  activated () {
    this.getList()
  },
  methods: {
    onLoad () {
      this.loading = false
    },
    async getList () {
      this.$setLoading(true)
      this.list = await api.getPhptpList()
      this.$setLoading(false)
    }
  }
})
</script>

<style lang="less" scoped>
.article-list {
  height: 100%;
  overflow: auto;
  padding: 10px 15px;
  .article-item {
    display: flex;

    .article-msg {
      flex: 1;

      .article-title {
        display: flex;
        align-items: center;
        font-size: 16px;

        .van-tag {
          margin-right: 5px;
          border: 1px solid #fde2e2;
        }
      }

      .article-author {
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
