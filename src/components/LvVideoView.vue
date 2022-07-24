<template>
  <div class="lv-video-container">
    <div id="lv-video"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Player from 'xgplayer'
export default defineComponent({
  name: 'LvVideoView',
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
