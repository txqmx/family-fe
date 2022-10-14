<template>
  <div class="lv-audio-container">
    <div id="lv-audio"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'xgplayer'
import Music from 'xgplayer-music'
export default defineComponent({
  name: 'LvAudioView',
  mounted () {
    const music = new Music({
      id: 'lv-audio',
      url: [{ src: 'madia/1234567.mp3', name: '' }],
      mode: 'loop',
      status: 'off',
      // controls: false
      ignores: ['next', 'forward', 'backward', 'prev', 'cover', 'name', 'time']
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
.lv-audio-container {
  position: absolute;
  right: 40px;
  top: 32px;
  transform: scale(0.6);
  #lv-audio{
    width: 100% !important;
    height: 100% !important;
    background: none;
  }
  /deep/ .xgplayer-skin-default.xgplayer-music .xgplayer-controls{
    background: #ff976a;
    // background-image: linear-gradient(to right, #ff976a , #fbd8c8);
    width: 35px;
    height: 35px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    .xgplayer-play{
      margin: -4px 0px 0px -1px ;
    }
    .xgplayer-progress{
      display: none;
    }
  }
}
</style>
