<template>
  <lv-card-container :title="title" @more="entryMore" :isExpanded="true">
    <div v-html="dataInfo.detail"></div>
  </lv-card-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { lvDataParser } from '@/utils/Parser'
import LvCardContainer from '@/components/layout/LvCardContainer.vue'
export default defineComponent({
  name: 'LvTextView',
  components: { LvCardContainer },
  data () {
    return {
      title: '家族简介',
      expanded: false,
      dataInfo: {
        detail: '',
        moreEntry: ''
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
  methods: {
    entryMore () {
      if (this.prop.detail.moreEntry) {
        this.$router.push(this.prop.detail.moreEntry)
      }
    }
  }
})
</script>

<style lang="less" scoped></style>
