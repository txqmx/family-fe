<template>
  <div class="home">
    <template v-for="(item, index) in homeConfig" :key="index">
      <component :is="item.type" :info="item.data"></component>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import api from '@/api'
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
      homeConfig: []
    }
  },
  created () {
    this.getPageDetail()
  },

  methods: {
    ...mapMutations(['setLoading']),
    async getPageDetail () {
      const data = await api.getPageDetail({
        id: 1
      })
      const homeConfig = data.detail
      // 暂时兼容
      for (let i = 0; i < homeConfig.length; i++) {
        for (const j in homeConfig[i].data) {
          homeConfig[i].data[j] = homeConfig[i].data[j].value
        }
      }
      this.homeConfig = homeConfig
      console.log(this.homeConfig)
    }
  }

})
</script>

<style scoped lang="less">
.home{
  width: 100%;
  overflow: auto;
  height: calc(100% - 46px);
  padding-bottom: 20px;
  & > div{
    margin-bottom: 16px;
    border-radius: 10px;
  }
}

</style>
