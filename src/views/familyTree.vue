<!-- eslint-disable semi -->
<template>
  <!-- <van-notice-bar
    left-icon="volume-o"
    text="参天大树必有其根，怀山之水必有其源,参天大树必有其根，怀山之水必有其源"
  /> -->
  <div id="treeContent" class="family_content tree-content">
    <div id="treeData">
      <TreeChart id="treeChart" v-if="treeData" :json="treeData" @click-node="handleClick"></TreeChart>
    </div>

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
    <div class="family_btn">
      <van-button type="warning" icon="plus" @click="enlarge"></van-button>
      <van-button type="warning" icon="minus" @click="micrify"></van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import TreeChart from '@/components/treeChart.vue'
import api from '@/api'
export default defineComponent({
  data () {
    return {
      treeDom: '',
      treeData: '',
      currentItem: '',
      dialogVisible: false,
      active: 2,
      scale: 1

    }
  },
  components: {
    TreeChart
  },
  created () {
    this.getTreeData()
  },
  mounted () {
    this.treeDom = document.getElementById('treeData')
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
    },
    async handleClick (item: any, type) {
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
      console.log(this.currentItem)
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 放大
    enlarge () {
      if (!this.treeDom) return
      if (this.scale >= 2.9) {
        this.scale = 3
      } else {
        this.scale += 0.2
      }
      this.treeDom.style.transform = `scale(${this.scale})`
      // this.treeDom.style.zoom = this.scale
      this.treeDom.style.transformOrigin = '0px 0px 0px'
      // const treeContent = document.getElementById('treeContent')
      // console.log(this.treeDom.scrollHeight, treeContent.scrollWidth, treeContent.scrollHeight)
    },
    // 缩小
    micrify () {
      if (!this.treeDom) return
      if (this.scale < 0.5) {
        this.scale = 0.4
      } else {
        this.scale -= 0.2
      }
      this.treeDom.style.transform = `scale(${this.scale})`
      // treeData.style.zoom = this.scale
      this.treeDom.style.transformOrigin = '0px 0px 0px'
      // const treeContent = document.getElementById('treeContent')
      // console.log(this.treeDom.scrollHeight, treeContent.scrollWidth, treeContent.scrollHeight)
    },
    dateFormat (date) {
      if (!date) return '-'
      const newDate = new Date(date)
      var Y = newDate.getFullYear() + '-'
      var M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-'
      var D = (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()) + ' '
      return Y + M + D
    }
  }
})
</script>

<style lang="less" scoped>
.tree-content {
  // background: #ff98000a;
  overflow: auto;
  height: calc(100% - 46px);
  padding-top: 5px;
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
  width: 97.5px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: fixed;
  right: 15px;
  bottom: 15px;
}
</style>
