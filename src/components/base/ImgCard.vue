<template>
  <div class="img-card-container" :style="{ 'border-radius': radius }" @click="imagePreview">
    <div class="img-contont">
      <img :src="imgCover" />
      <div class="img-icon">
        <van-icon name="photo" />
        {{ imgLength }}
      </div>
    </div>
    <div v-if="type === 'card'" class="img-title">
      <span>{{imgName}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ImagePreview } from 'vant'
export default defineComponent({
  data () {
    return {
      radius: ''
    }
  },
  props: {
    type: {
      default: 'view'
    },
    imgs: {
      default: () => []
    },
    imgItem: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: ''
    }
  },
  computed: {
    imgCover () {
      return this.imgItem ? this.imgItem.cover : this.imgs[0]
    },
    imgName () {
      return this.imgItem ? this.imgItem.name : ''
    },
    imgLength () {
      return this.imgItem ? this.imgItem.length : this.imgs.length
    }
  },
  mounted () {
    if (this.type === 'card') {
      this.radius = '8px'
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
.img-card-container {
  background: #fff;
  margin-bottom: 20px;
  padding-bottom: 5px;
  overflow: hidden;
  width: 100%;
  .img-contont {
    position: relative;
    height: 150px;
    img {
      height: 100%;
      width: 100%;
    }

    .img-icon {
      display: flex;
      align-items: center;
      font-size: 16px;
      position: absolute;
      bottom: 10px;
      right: 15px;
      color: #fff;

      i {
        margin-right: 5px;
        font-size: 23px;
      }
    }
  }
  .img-title {
    padding: 5px 10px;
    font-size: 18px;
    line-height: 30px;
  }
}
</style>
