<template>
  <div class="img-card-container" :style="{ 'border-radius': type=== 'card' ? '8px': '' }" @click="imgPreview">
    <div class="img-contont">
      <img :src="imgUrlParser(imgItem.cover)" />
      <div class="img-icon">
        <van-icon name="photo" />
        {{ length }}
      </div>
    </div>
    <div v-if="type === 'card'" class="img-title">
      <span>{{imgItem.name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import { imgUrlParser } from '@/utils/Parser'
import api from '@/api'
export default defineComponent({
  data () {
    return {
      radius: '',
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
      default: () => {
        return {
          cover: '',
          name: '',
          content: ''
        }
      }
    }
  },
  computed: {
    length () {
      return this.imgItem.content ? this.imgItem.content.split(',').length : ''
    }
  },
  methods: {
    ...mapMutations(['openPreview']),
    async imgPreview () {
      const list = await api.getImgList({
        type: this.imgItem.code
      })
      this.openPreview(list)
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
