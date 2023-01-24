<template>
  <div class="article-detail">
    <div class="article-detail-title">
      <span>{{ datail.name }}</span>
      <lv-audio-view v-if="datail.enclosure && showAudio" :source="datail.enclosure"></lv-audio-view>
    </div>
    <div class="meta-content">
      <span>宗信堂</span>
      <span>{{ datail.createTime }}</span>
    </div>
    <div v-if="datail.info" class="article-detail-info">{{ datail.info }}</div>
    <div v-if="datail.cover" class="article-cover">
      <van-image height="12rem" width="100%" :src="imgUrlParser(datail.cover)">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <div class="article-detail-content" >
      <div v-html="datail.content">

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
import api from '@/api'
import { imgUrlParser } from '@/utils/Parser'
import LvAudioView from '@/components/base/LvAudioView.vue'
export default defineComponent({
  components: { LvAudioView },
  name: 'articlesDetail',
  data () {
    return {
      loading: true,
      finished: false,
      datail: {},
      showAudio: true,
      imgUrlParser: imgUrlParser
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
      this.showAudio = false
      this.$nextTick(() => {
        this.showAudio = true
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
  padding: 20px 20px 51px 20px;
  box-sizing: border-box;
  .article-cover {
    margin-bottom: 10px;
  }
  .article-detail-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    padding-bottom: 10px;
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
