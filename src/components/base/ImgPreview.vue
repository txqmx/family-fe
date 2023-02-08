<template>
  <div class="img-preview-container">
    <div class="img-preview-nav">
        <div class="img-back" @click="back">
          <van-icon name="cross" />
        </div>

    </div>
    <van-swipe class="my-swipe" @change="swiperChange">
      <van-swipe-item v-for="(item, index) in imgPreviewList" :key="index">
        <img :src="imgUrlParser(item.cover)" />
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
      </template>
    </van-swipe>
    <div class="img-info-container">
        <div class="img-title">
            {{currentItem.name}}
        </div>
        <div class="img-info">
            {{currentItem.info}}
        </div>
        <div class="img-data">
            {{currentItem.createTime}}
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import { imgUrlParser } from '@/utils/Parser'
export default defineComponent({
  data () {
    return {
      index: 0,
      imgUrlParser: imgUrlParser
    }
  },
  props: {
    imgs: {
      default: ''
    }
  },
  computed: {
    imgPreviewList () {
      return this.$store.state.imgPreviewList
    },
    currentItem () {
      return this.imgPreviewList[this.index]
    }
  },
  mounted () {
    window.history.pushState(null, null, window.location.hash)
    window.addEventListener('popstate', this.back, false)
  },
  unmounted () {
    window.removeEventListener('popstate', this.back, false)
  },
  methods: {
    ...mapMutations(['closePreview']),

    back (e) {
      if (!e || e.type !== 'popstate') {
        window.history.back()
      }
      this.index = 0
      this.closePreview()
    },
    swiperChange (index) {
      this.index = index
    }
  }
})
</script>

<style lang="less" scoped>
.img-preview-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background: #000;
  .img-preview-nav{
    position: absolute;
    top: 5px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 46px;
    background: #000;
    z-index: 1;
    .img-back{
        padding: 16px;
        font-size: 22px;
        color: #fff;
    }
  }

  .my-swipe {
    height: 100%;

    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
      display: flex;
  align-items: center;

      img {
        margin-top: -50px;
        width: 100%;
      }
    }

    .custom-indicator {
      position: absolute;
      right: 20px;
      top: 100px;
      padding: 2px 5px;
      font-size: 16px;
      height: 20px;
      padding: 2px 12px;
      border-radius: 14px;
      background: rgb(115, 115, 115);
      color: #fff;
    }
  }
  .img-info-container{
    color: #fff;
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 1;
    height: 120px;
    padding: 5px 10px;
    .img-title{
        font-size: 25px;
        margin-bottom: 10px;
    }
    .img-info{
        font-size: 16px;
        margin-bottom: 10px;
    }
    .img-data{
        color: rgb(163, 162, 162);
        font-size: 14px;
    }
  }
}
</style>
