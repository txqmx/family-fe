<template>
  <div class="img-card-container" :style="{ 'border-radius': radius }" @click="imagePreview">
    <div class="img-contont">
      <img :src="imgUrlParser(imgInfo.cover)" />
      <div class="img-icon">
        <van-icon name="play-circle" />
      </div>
    </div>
    <div  class="img-title">
      <span>{{imgInfo.name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import { imgUrlParser } from '@/utils/Parser'
export default defineComponent({
  name: 'VideoCard',
  data () {
    return {
      radius: '',
      imgInfo: {
        cover: '',
        name: '',
        length: ''
      },
      imgUrlParser: imgUrlParser
    }
  },
  props: {
    type: {
      default: 'view' // view, card
    },
    imgs: { // 图片列表
      default: ''
    },
    imgItem: { // 图集卡片
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: ''
    }
  },
  mounted () {
    if (this.type === 'card') {
      this.radius = '8px'
    }
    if (this.imgs && Array.isArray(this.imgs)) {
      this.imgInfo = {
        cover: this.imgs[0],
        name: '',
        length: this.imgs.length
      }
    } else {
      this.imgInfo = this.imgItem
    }
  },
  methods: {
    ...mapMutations(['openPreview']),
    imagePreview () {
      if (this.imgs && Array.isArray(this.imgs)) {
        const list = []
        this.imgs.forEach(item => {
          list.push({
            content: item,
            name: '',
            info: '',
            createTime: ''
          })
        })
        this.openPreview(list)
      } else {
        this.$emit('handleClick', this.imgItem)
      }
    }
  }
})
</script>

<style lang="less" scoped>
.img-card-container {
  background: #fff;
  margin-bottom: 20px;
  overflow: hidden;
  width: 100%;
  position: relative;
  .img-contont {
    position: relative;
    height: 190px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      position: absolute;
      height: 100%;
      width: 100%;
    }

    .img-icon {
      color: rgba(255, 255, 255, 0.7);

      i {
        margin-right: 5px;
        font-size: 50px;
      }
    }
  }
  .img-title {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 5px 10px;
    font-size: 18px;
    line-height: 30px;
    color: #fff;
    background: rgba(22, 20, 20, 0.4);
  }
}
</style>
