<template>
  <lv-card-container :title="title" @more="entryMore">
    <div class="lv-text_content">
      <ul class="lv-list">
        <li  v-for="item in dataInfo.dataList" :key="item">
          <div class="lv-item" @click="entryDetail(item)">
            {{item.name}}
          <div>
            <van-icon name="arrow" />
          </div></div>

        </li>
      </ul>
    </div>
  </lv-card-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LvCardContainer from '@/components/layout/LvCardContainer.vue'
import { lvDataParser } from '@/utils/Parser'
export default defineComponent({
  name: 'LvNoticeView',
  components: { LvCardContainer },
  data () {
    return {
      title: '家族动态',
      dataInfo: {
        dataList: []
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
      this.$router.push({
        name: 'articlesList',
        query: {
          type: 'zxdt'
        }
      })
    },
    entryDetail (item) {
      this.$router.push({
        name: 'articlesDetail',
        query: {
          id: item.id
        }
      })
    }
  }
})
</script>

<style lang="less" scoped>
 .lv-text_content {
    padding: 0 4px;
    // margin-bottom: 10px;
    font-size: 14px;
    color: #969799;
    // line-height: 1.5;
    overflow: hidden;
    .lv-list{
      .lv-item{
        height: 38px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: #ebedf0 1px solid;
      }
    }
  }
</style>
