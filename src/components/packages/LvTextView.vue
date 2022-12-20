<template>
  <lv-card-container :title="title" @more="entryMore" :isExpanded="true">
    <div v-html="info.detail"></div>
  </lv-card-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LvCardContainer from '@/components/layout/LvCardContainer.vue'
export default defineComponent({
  name: 'LvTextView',
  components: { LvCardContainer },
  data () {
    return {
      title: '家族简介',
      expanded: false
    }
  },
  props: {
    info: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  methods: {
    entryMore () {
      console.log(111)
    }
  }
})
</script>

<style lang="less" scoped></style>
