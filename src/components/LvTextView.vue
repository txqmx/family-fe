<template>
  <div class="lv-text-container">
    <div class="lv-text_title">
      <span>家族简介</span>
      <!-- <lv-audio-view></lv-audio-view> -->
      </div>
    <van-divider />
    <div class="lv-text_content" :style="{height: (expanded? '': '200px')}">
      <div v-html="info.detail"></div>
    </div>
    <div class="lv-text_more" @click="showMore">
      <!-- <van-icon v-if="expanded" name="arrow-up" /> -->
      <!-- <van-icon v-else name="arrow-down" /> -->
      <img src="../assets/moreup.png"  v-if="expanded" name="arrow-up" class="more-style"/>
      <img src="../assets/moredown.png" v-else name="arrow-down" class="more-style" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import LvAudioView from './LvAudioView.vue'
export default defineComponent({
  name: 'LvTextView',
  data () {
    return {
      expanded: false
    }
  },
  props: {
    info: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  mounted () {
    console.log(this.info)
  },
  methods: {
    showMore () {
      this.expanded = !this.expanded
    }
  }
  // components: { LvAudioView }
})
</script>

<style lang="less" scoped>
.lv-text-container{
  position: relative;
  background: #ffffff;
  padding: 12px 16px;
  .lv-text_title{
    font-size: 16px;
    color: #323233;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .lv-text_content{
    padding: 0 4px;
    // margin-bottom: 10px;
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
    overflow: hidden;
  }
  .lv-text_more{
    padding-top:10px;
    text-align: center;
  }
  .van-divider{
    margin: 10px 0 0 0;
  }
  .more-style{
    width:16px;
    height:16px
  }
}
</style>
