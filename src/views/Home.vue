<template>
  <div class="home">
    <template v-for="(item, index) in homeConfig" :key="index">
      <component :is="item.type" :info="item.data"></component>
    </template>

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
      homeConfig: [
        {
          type: 'LvBannerView',
          data: {
            title: '黄氏家族江夏堂族谱',
            address: '湖南',
            info: 'xxxxxxxxx',
            img: 'img/book.jpeg'
          }
        },
        {
          type: 'LvSwiper',
          data: {
            imgs: ['img/1.jpeg', 'img/2.jpeg', 'img/4.jpeg']
          }
        },
        {
          type: 'LvCardSwiper',
          data: {
            ids: '1,2,3,4'
          }
        },
        {
          type: 'LvTextView'
        },
        {
          type: 'LvImgView',
          data: {
            imgs: [
              'img/5.jpeg',
              'img/6.jpeg'
            ]
          }
        },
        {
          type: 'LvNoticeView'
        },
        {
          type: 'LvVideoView'
        }
      ]
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
