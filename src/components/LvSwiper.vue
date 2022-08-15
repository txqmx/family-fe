/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div class="lv-banner-container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in imgs" :key="index">
        <img :src="item">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LvSwiper',
  props: {
    info: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  computed: {
    imgs () {
      return JSON.parse(this.info.imgs)
    }
  },
  methods: {

  }
})
</script>

<style lang="less" scoped>
.lv-banner-container {
  position: relative;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
