<template>
  <div class="article-detail">
    <div id="lv-video"></div>
    <div class="video-title">
      <div class="article-detail-title">{{ datail.name }}</div>
    </div>
    <div class="video-comment">
      <div class="video-comment-header">
        <div class="title">评论</div>
        <div class="fabulous">0赞</div>
      </div>
      <div class="video-comment-contrnt">
        <van-empty description="" />
      </div>
    </div>
    <van-action-bar>
      <van-field v-model="value" placeholder="我要评论" />
      <van-action-bar-icon icon="chat-o" />
      <van-action-bar-icon icon="like-o" />
      <van-action-bar-icon icon="share-o" />
    </van-action-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Player from 'xgplayer'
import api from '@/api'
export default defineComponent({
  name: 'videoDetail',
  data () {
    return {
      loading: true,
      finished: false,
      datail: {}
    }
  },
  created () {
    this.getDetail()
  },
  activated () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      this.$setLoading(true)
      this.datail = await api.getArticlesDetail({
        id: this.$route.query.id
      })
      const player = new Player({
        id: 'lv-video',
        url: this.datail.content,
        fluid: true
      })
      this.$setLoading(false)
    }
  }
})
</script>

<style lang="less" scoped>
.article-detail {
  background: #ffffff;
  height: 100%;
  overflow: auto;
  // padding: 0 0 10px;
  .video-title {
    padding: 10px;
  }
  .video-comment {
    padding: 0 15px;
    .video-comment-header {
      display: flex;
      justify-content: space-between;
      .fabulous {
        font-size: 14px;
        color: #969799;
      }
    }
  }
  .article-cover {
    margin-bottom: 10px;
  }
  .article-detail-title {
    line-height: 1.4;
    font-size: 22px;
    margin-bottom: 14px;
  }
  .meta-content {
    margin-bottom: 22px;
    line-height: 20px;
    font-size: 15px;
    color: #0000004d;
    span {
      margin-right: 10px;
    }
  }
  .article-detail-info {
    margin: 0 0 16px;
    padding: 12px 16px;
    background-color: #f7f7f7;
    border-radius: 8px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    line-height: 20px;
  }
  .article-detail-content {
    // padding: 10px 15px;
    color: #222;
    font-size: 16px;
    line-height: 1.7;
    padding-bottom: 30px;
  }
}
.van-action-bar {
  border-top: #f2f2f2 1px solid;
  .van-field {
    padding: 5px 10px;
    line-height: 30px;
  }
  .van-cell:after {
    display: none;
  }
  /deep/ .van-field__control {
    padding: 0 20px;
    border: #f2f2f2 1px solid;
    border-radius: 20px;
  }
}
</style>
