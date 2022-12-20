<template>
  <lv-card-container :title="title" @more="entryMore">
    <img-card :imgs="imgs"></img-card>
  </lv-card-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LvCardContainer from '@/components/layout/LvCardContainer.vue'
import ImgCard from '@/components/base/ImgCard.vue'
export default defineComponent({
  name: 'LvImgView',
  data () {
    return {
      title: '图集相册'
    }
  },
  props: {
    info: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => { }
    }
  },
  components: { LvCardContainer, ImgCard },
  computed: {
    imgs () {
      return this.info.imgs
    }
  },
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
