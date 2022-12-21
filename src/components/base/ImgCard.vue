<template>
  <div class="img-card-container" :style="{ 'border-radius': radius }" @click="imagePreview">
    <div class="img-contont">
      <img :src="imgInfo.cover" />
      <div class="img-icon">
        <van-icon name="photo" />
        {{ imgInfo.length }}
      </div>
    </div>
    <div v-if="type === 'card'" class="img-title">
      <span>{{imgInfo.name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
export default defineComponent({
  data () {
    return {
      radius: '',
      imgInfo: {
        cover: '',
        name: '',
        length: ''
      }
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
