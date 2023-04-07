/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div class="lv-banner-container">
    <div class="banner-left">
      <div class="familt-cover">
        <van-image width="100%" height="100%" :src="imgUrlParser(dataInfo.img)"/>
      </div>
    </div>
    <div class="banner-right">
      <div class="family-title">{{ dataInfo.title }}</div>
      <div class="family-address">地址：{{ dataInfo.address }}</div>
      <div class="family-info">
        <span class="info-title">简介：</span>
        <span class="info-content">{{ dataInfo.info }}</span>
      </div>
    </div>
    <!-- <div class="lv-banner-btn">
      <van-button round type="warning" size="mini" @click="enterTree"
        >进入族谱</van-button
      >
    </div> -->
    <div class="background"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { lvDataParser, imgUrlParser } from '@/utils/Parser'
export default defineComponent({
  name: 'LvBannerView',
  data () {
    return {
      dataInfo: {
        title: '',
        address: '',
        info: '',
        img: ''
      },
      imgUrlParser: imgUrlParser
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
    console.log(this.dataInfo)
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
  height: 110px;
  padding: 16px 10px 10px;
  display: flex;
  background: #ffffff2e;
  .banner-left {
    height: 100%;
    width: 95px;
    .familt-cover {
      width: 80px;
      height: 103px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
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
      display: flex;
      .info-title {
        display: inline-block;
        // width: 46px;
      }
      .info-content{
        flex: 1;
      }
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
    opacity: 0.7;
  }
}
</style>
