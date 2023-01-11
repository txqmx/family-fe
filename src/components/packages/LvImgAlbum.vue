<template>
  <lv-card-container :title="title" @more="entryMore">
    <img-card :img-item="dataInfo.imgItem"></img-card>
  </lv-card-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { lvDataParser } from '@/utils/Parser'
import LvCardContainer from '@/components/layout/LvCardContainer.vue'
import ImgCard from '@/components/base/ImgCard.vue'
export default defineComponent({
  name: 'LvImgAlbum',
  data () {
    return {
      title: '家族相册',
      dataInfo: {
        imgItem: {}
      }
    }
  },
  props: {
    prop: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  async created () {
    this.dataInfo = await lvDataParser(this.dataInfo, this.prop)
  },
  components: { LvCardContainer, ImgCard },
  methods: {
    entryMore () {
      this.$router.push({
        name: 'imgList'
      })
    }
  }
})
</script>

<style lang="less" scoped>

</style>
