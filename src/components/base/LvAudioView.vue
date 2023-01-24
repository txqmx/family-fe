<template>
  <div class="lv-audio-container">
    <div id="lv-audio"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'xgplayer'
import Music from 'xgplayer-music'
import { imgUrlParser } from '@/utils/Parser'
export default defineComponent({
  name: 'LvAudioView',
  props: {
    source: {
      default: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const music = new Music({
        id: 'lv-audio',
        url: [{ src: imgUrlParser(this.source), name: '' }],
        mode: 'loop',
        status: 'off',
        // controls: false
        ignores: ['next', 'forward', 'backward', 'prev', 'cover', 'name', 'time']
      })
    }
  }
})
</script>

<style lang="less" scoped>
.lv-audio-container {
  width: 35px;
    height: 35px;
  // position: absolute;
  // right: 40px;
  // top: 32px;
  transform: scale(0.7);
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
