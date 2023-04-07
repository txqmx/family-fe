<template>
  <div class="article-list">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="article-item" v-for="item in list" :key="item.id">
        <video-card :img-item="item" :type="'card'" @handleClick="entryDetail"></video-card>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import VideoCard from '@/components/base/VideoCard.vue'
import api from '@/api'
export default defineComponent({
  name: 'videoList',
  components: { VideoCard },
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
    ...mapMutations(['openPreview']),
    onLoad () {
      this.loading = false
    },
    async getList () {
      this.$setLoading(true)
      this.list = await api.getVideoList()
      this.$setLoading(false)
    },
    entryDetail (item) {
      this.$router.push({
        name: 'videoDetail',
        query: {
          id: item.id
        }
      })
    },
    async imgPreview (item) {
      const list = await api.getImgList({
        id: item.content
      })
      this.openPreview(list)
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
