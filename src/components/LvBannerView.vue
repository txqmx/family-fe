/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div class="lv-banner-container">
    <div class="banner-left">
      <div class="familt-cover">
        <img :src="info.img">
      </div>
    </div>
    <div class="banner-right">
      <div class="family-title">{{info.title}}</div>
      <div class="family-address">地址：{{info.address}}</div>
      <div class="family-info">简介：{{info.info}}</div>
    </div>
    <div class="lv-banner-btn">
      <van-button round type="warning" size="mini" @click="enterTree"
        >进入族谱</van-button
      >
    </div>
    <div class="background"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LvBannerView',
  props: {
    info: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  methods: {
    enterTree () {
      this.$router.push({ name: 'familySvg' })
    }
  }
})
</script>

<style lang="less" scoped>
.lv-banner-container {
  position: relative;
  z-index: 1;
  height: 120px;
  padding: 16px 10px 10px;
  display: flex;
  .banner-left {
    height: 100%;
    width: 110px;
    .familt-cover {
      width: 5em;
      height: 7em;
      background: #444;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .banner-right {
    flex: 1;
    .family-title {
      font-size: 16px;
      font-weight: 500;
      color: #000;
      margin-bottom: 10px;
    }
    .family-address {
      font-size: 14px;
      color: #969799;
      margin-bottom: 5px;
    }
    .family-info {
      font-size: 14px;
      color: #969799;
      margin-bottom: 5px;
    }
  }
   .lv-banner-btn {
    position: absolute;
    bottom: 6px;
    right: 20px;

    .van-button {
      width: 100px;
      height: 26px;
      font-size: 14px;
    }
  }
  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -10;
    background: url("~@/assets/background.png") no-repeat transparent;
    background-size: 100% 100%;
    opacity: 0.5;
  }
}
</style>
