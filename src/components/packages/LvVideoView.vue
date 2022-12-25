<template>
  <lv-card-container :title="title" @more="entryMore">
    <video-card v-if="dataInfo.videoItem" :img-item="dataInfo.videoItem" @handleClick="entryDetail"></video-card>
  </lv-card-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LvCardContainer from '@/components/layout/LvCardContainer.vue'
import VideoCard from '@/components/base/VideoCard.vue'
import { lvDataParser } from '@/utils/Parser'
import api from '@/api'
export default defineComponent({
  components: { LvCardContainer, VideoCard },
  name: 'LvVideoView',
  data () {
    return {
      title: '视频影像',
      dataInfo: {
        videoItem: ''
      }
    }
  },
  props: {
    prop: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  async created () {
    this.dataInfo = await lvDataParser(this.dataInfo, this.prop)
  },
  methods: {
    async getDetail () {
      this.datail = await api.getArticlesDetail({
        id: '16'
      })
    },
    entryMore () {
      this.$router.push({
        name: 'videoList'
      })
    },
    entryDetail (item) {
      this.$router.push({
        name: 'videoDetail',
        query: {
          id: item.id
        }
      })
    }
  }
})
</script>

<style lang="less" scoped>
.lv-video-container {
  position: relative;
  width: 100%;
}
</style>
