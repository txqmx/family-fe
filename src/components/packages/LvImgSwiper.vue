<template>
  <div class="lv-swiper-container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in dataInfo.imgs" :key="index">
        <van-image width="100%" height="100%" :src="imgUrlParser(item)"/>
        <!-- <img :src="imgUrlParser(item)" /> -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { lvDataParser, imgUrlParser } from '@/utils/Parser'
export default defineComponent({
  name: 'LvImgSwiper',
  data () {
    return {
      dataInfo: {
        imgs: []
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
  }
})
</script>

<style lang="less" scoped>
.lv-swiper-container {
  position: relative;
}

.my-swipe {
  height: 150px;
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
