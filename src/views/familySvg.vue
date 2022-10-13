<!-- eslint-disable semi -->
<template>
  <div id="treeSvg">
    <div id="treeRoot"></div>
    <van-popup v-model:show="dialogVisible" position="bottom" closeable>
      <div class="tree_tab_content">
        <div class="tree_tab_item">
          <van-row>
            <van-col span="12">名字: {{ currentItem.name }}</van-col>
            <van-col span="12">性别: {{ currentItem.sex === 1 ? "女" : "男" }}</van-col>
          </van-row>
          <van-row>
            <van-col span="12">世数: {{ currentItem.level }}世</van-col>
            <van-col span="12">排行: </van-col>
          </van-row>
          <van-row>
            <van-col span="12">生年: {{ this.dateFormat(currentItem.birthDate) }}</van-col>
            <van-col v-if="currentItem.dieDate" span="12">卒年: {{ this.dateFormat(currentItem.dieDate) }}</van-col>
          </van-row>
          <van-row v-if="currentItem.mate">
            <van-col span="12"> 配偶: {{ currentItem.mate }} </van-col>
            <!-- <van-col span="12">父名: </van-col> -->
          </van-row>
          <van-row>
            <van-col span="24"> 子女: {{ currentItem.children }} </van-col>
          </van-row>
          <van-row>
            <van-col span="24">现居地: 中国</van-col>
          </van-row>
        </div>
        <div class="tree_tab_img">
          <!-- <img src="@/assets/1.png">
                <img src="@/assets/2.png"> -->
          <!-- <img v-if="currentItem.detail_img" :src="currentItem.detail_img" />
          <img v-else src="@/assets/3.png" /> -->
          <div v-html="currentItem.detail">

          </div>
        </div>
      </div>
    </van-popup>
    <div v-if="tree" class="family_btn">
      <van-button type="warning" size="small" @click="enlarge">全部展开</van-button>
      <van-button type="warning" size="small"  @click="micrify">全部收起</van-button>
      <van-button v-if="!isRoot" type="warning" size="small"  @click="goBackRoot">回到根节点</van-button>
    </div>
    <search v-if="searchShow" @searchSubmit="searchSubmit"></search>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import { StockTree } from './StockTree.js'
import api from '@/api'
import Search from './search.vue'
export default defineComponent({
  data () {
    return {
      treeData: {},
      tree: '',
      currentItem: '',
      dialogVisible: false
    }
  },
  mounted () {
    this.getTreeData()
  },
  computed: {
    isRoot () {
      return this.treeData.parentId === -1
    },
    searchShow () {
      return this.$store.state.searchState
    }
  },
  methods: {
    ...mapMutations(['setLoading', 'setSearchState']),
    searchSubmit (item) {
      if (this.treeData.id !== item.id) {
        this.getTreeData(item.parentId)
      }
      this.setSearchState(false)
    },
    goBackRoot () {
      this.getTreeData()
    },
    async getTreeData (parentId) {
      this.setLoading(true)
      const root = await api.getMemberList({
        genealogyId: 1,
        parentId: parentId || -1
      })
      if (root.length) {
        this.treeData = await api.getMemberTree({ id: root[0].id })
      }
      this.setLoading(false)
      this.tree = new StockTree({
        el: '#treeSvg',
        originTreeData: this.treeData,
        // 节点点击事件
        nodeClickEvent: (e, d, isMeta) => {
          console.log('当前节点的数据：', d, e)
          this.handleClick(d.data, isMeta)
        }
      })
      // this.tree.drawChart({
      //   type: parentId ? 'appoint' : 'fold',
      //   nodes: [1, 2, 3]
      // })
    },
    async handleClick (item, type) {
      const itemDetail = await api.getMemberDetail({
        id: type ? item.mateInfo.id : item.id,
        child: true,
        mate: true
      })
      const currentItem = {
        ...itemDetail,
        mate: itemDetail.mateInfo ? itemDetail.mateInfo.name : '',
        children: itemDetail.children.map(item => item.name).join()
      }
      this.currentItem = currentItem
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    dateFormat (date) {
      if (!date) { return '-' }
      const newDate = new Date(date)
      var Y = newDate.getFullYear() + '-'
      var M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-'
      var D = (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()) + ' '
      return Y + M + D
    },
    enlarge () {
      this.tree.expandAllNodes()
    },
    micrify () {
      this.tree.foldAllNodes()
    }
  },
  components: { Search }
})
</script>

<style lang="less">
#treeSvg {
  // background: #ff98000a;
  overflow: hidden;
  height: calc(100% - 51px);
  width: 100%;
  padding-top: 5px;
  .identity-msg{
    stroke: #fff;
    font-size: 12px;
    text-anchor: middle;
    stroke-width: 0.7;
    fill: #ffffff;
  }
  .name-msg{
    stroke: #000000;
    font-size: 12px;
    text-anchor: middle;
    stroke-width: 0.6;
    fill: #000000;
  }
}
.tree_tab_content {
  height: 60vh;
}
.tree_tab_item {
  font-size: 14px;
  padding: 10px;
  color: #969799;
  margin-top: 30px;
}

.van-row {
  line-height: 2;
  margin-left: 20px;
}

.tree_tab_img {
  img {
    margin: 5px 0;
    width: 100%;
  }
}
.family_btn{
  // width: 97.5px;
  height: 40px;
  // border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: fixed;
  right: 15px;
  bottom: 15px;
  .van-button{
    margin: 0 5px;
  }
}
</style>
