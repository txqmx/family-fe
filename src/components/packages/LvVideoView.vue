<template>
  <lv-card-container :title="title" @more="entryMore">
    <video-card v-if="datail" :img-item="datail" @handleClick="entryDetail"></video-card>
  </lv-card-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LvCardContainer from '@/components/layout/LvCardContainer.vue'
import VideoCard from '@/components/base/VideoCard.vue'
import api from '@/api'
export default defineComponent({
  components: { LvCardContainer, VideoCard },
  name: 'LvVideoView',
  data () {
    return {
      title: '视频影像',
      datail: ''
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      this.datail = await api.getArticlesDetail({
        id: '16'
      })
    },
    enterTree () {
      this.$router.push({ name: 'Tree' })
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
