<template>
  <div class="lv-img-container" @click="imagePreview">
    <img :src="imgs[0]">
    <div class="img-icon">
      <van-icon name="photo" />
      {{imgs.length}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ImagePreview } from 'vant'
export default defineComponent({
  name: 'LvImgView',
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
    imagePreview () {
      ImagePreview({
        images: this.imgs,
        closeable: true
      })
    }
  }
})
</script>

<style lang="less" scoped>
.lv-img-container {
  position: relative;
  height: 150px;
  img{
    height: 100%;
    width: 100%;
  }
  .img-icon{
    display: flex;
    align-items: center;
    font-size: 16px;
    position: absolute;
    bottom: 10px;
    right: 15px;
    color: #fff;
    i{
      margin-right: 5px;
      font-size: 23px;
    }
  }
}
</style>
