<template>
  <lv-card-container :title="title" @entryMore="entryMore">
    <div class="lv-video-container">
    <div id="lv-video"></div>
  </div>
  </lv-card-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Player from 'xgplayer'
import LvCardContainer from '@/components/layout/LvCardContainer.vue'
export default defineComponent({
  components: { LvCardContainer },
  name: 'LvVideoView',
  data () {
    return {
      title: '视频影像'
    }
  },
  mounted () {
    const player = new Player({
      id: 'lv-video',
      url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
      fluid: true
    })
  },
  methods: {
    enterTree () {
      this.$router.push({ name: 'Tree' })
    },
    entryMore () {
      console.log(11)
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
