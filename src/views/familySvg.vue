<!-- eslint-disable semi -->
<template>
  <div id="treeSvg">
    <div id="treeRoot"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import { StockTree } from './StockTree.js'
import api from '@/api'
export default defineComponent({
  data () {
    return {

    }
  },
  mounted () {
    this.getTreeData()
  },
  computed: {

  },
  methods: {
    ...mapMutations(['setLoading']),

    async getTreeData () {
      this.setLoading(true)
      const root = await api.getMemberList({
        genealogyId: 1,
        parentId: -1
      })
      if (root.length) {
        this.treeData = await api.getMemberTree({ id: root[0].id })
      }
      this.setLoading(false)
      const tree = new StockTree({
        el: '#treeSvg',
        originTreeData: this.treeData,
        // 节点点击事件
        nodeClickEvent: function (e, d) {
          console.log('当前节点的数据：', d)
        }
      })
    }

  }
})
</script>

<style lang="less">
#treeSvg {
  // background: #ff98000a;
  overflow: hidden;
  height: calc(100% - 51px);
  width: 100%;
  padding-top: 5px;
  // position: relative;
  .identity-msg{
    stroke: #fff;
    font-size: 12px;
    text-anchor: middle;
    dominant-baseline: middle;
  }
  .name-msg{
    stroke: #000000;
    font-size: 12px;
    text-anchor: middle;
    dominant-baseline: middle;
  }
}
</style>
