<template>
  <div class="home">
    <lv-banner-view :info="homeData.banner"></lv-banner-view>
    <lv-swiper :info="homeData.swiper"></lv-swiper>
    <lv-card-swiper></lv-card-swiper>
    <lv-text-view></lv-text-view>
    <lv-img-view></lv-img-view>
    <lv-notice-view></lv-notice-view>
    <lv-video-view></lv-video-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LvSwiper from '@/components/LvSwiper.vue'
import LvTextView from '@/components/LvTextView.vue'
import { mapMutations } from 'vuex'
import LvCardSwiper from '../components/LvCardSwiper.vue'
import LvImgView from '../components/LvImgView.vue'
import LvVideoView from '../components/LvVideoView.vue'
import LvBannerView from '../components/LvBannerView.vue'
import LvNoticeView from '@/components/LvNoticeView.vue'
export default defineComponent({
  components: { LvSwiper, LvTextView, LvCardSwiper, LvImgView, LvVideoView, LvBannerView, LvNoticeView },
  name: 'Home',
  data () {
    return {
      homeActive: '0',
      loginShow1: true,
      loginShow: false,
      password: '',
      homeData: {
        banner: {
          title: '黄氏家族江夏堂族谱',
          address: '湖南',
          info: 'xxxxxxxxx',
          img: 'img/book.jpeg'
        },
        swiper: {
          imgs: [
            'img/1.jpeg', 'img/2.jpeg', 'img/4.jpeg'
          ]
        }
      }
    }
  },

  methods: {
    ...mapMutations(['setLoading'])

  }

})
</script>

<style scoped lang="less">
.home{
  overflow: auto;
  height: calc(100% - 46px);
  padding-bottom: 20px;
  & > div{
    margin-bottom: 16px;
  }
}

</style>
