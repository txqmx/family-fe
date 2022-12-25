<template>
  <lv-card-container :title="title" @more="entryMore">
    <img-card :imgs="dataInfo.imgs"></img-card>
  </lv-card-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { lvDataParser } from '@/utils/Parser'
import LvCardContainer from '@/components/layout/LvCardContainer.vue'
import ImgCard from '@/components/base/ImgCard.vue'
export default defineComponent({
  name: 'LvImgView',
  data () {
    return {
      title: '图集相册',
      dataInfo: {
        imgs: []
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
