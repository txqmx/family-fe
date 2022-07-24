<template>
  <div class="lv-img-container" @click="imagePreview">
    <img :src="images[0]">
    <div class="img-icon">
      <van-icon name="photo" />
      2
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ImagePreview } from 'vant'
export default defineComponent({
  name: 'LvImgView',
  data () {
    return {
      images: [
        'img/5.jpeg',
        'img/6.jpeg'
      ]
    }
  },
  methods: {
    imagePreview () {
      ImagePreview({
        images: this.images,
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
