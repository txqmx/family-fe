<!-- eslint-disable semi -->
<template>
  <!-- <van-notice-bar
    left-icon="volume-o"
    text="参天大树必有其根，怀山之水必有其源,参天大树必有其根，怀山之水必有其源"
  /> -->
  <div class="family_content tree-content">
    <TreeChart v-if="treeData" :json="treeData" @click-node="handleClick"></TreeChart>
    <van-popup v-model:show="dialogVisible" position="bottom" closeable>
      <div class="tree_tab_content">
        <!-- <van-tabs v-model="active" shrink>
            <van-tab title="行传">
              <div class="tree_tab_item">
                <van-row>
                  <van-col span="12">名字: {{item.name}}</van-col>
                  <van-col span="12">常用名: </van-col>
                </van-row>
                <van-row>
                  <van-col span="12">性别: 男</van-col>
                  <van-col span="12">世数: 2世</van-col>
                </van-row>
                <van-row>
                  <van-col span="12">别名: </van-col>
                  <van-col span="12">排行: </van-col>
                </van-row>
                <van-row>
                  <van-col span="12">配偶: 氏</van-col>
                  <van-col span="12">父名: xxx</van-col>
                </van-row>
                <van-row>
                  <van-col span="24">子女: xxx</van-col>

                </van-row>
                <van-row>
                  <van-col span="24">现居地: 中国</van-col>
                </van-row>
              </div>
              <div class="tree_tab_img">
                <img src="@/assets/1.png">
                <img src="@/assets/2.png">
                <img src="@/assets/3.png">
              </div>
            </van-tab>
             <van-tab title="帖子">
              <van-empty description="暂无数据" />
            </van-tab>
            <van-tab title="文章">
              <van-empty description="暂无数据" />
            </van-tab> -->
        <!-- </van-tabs> -->
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
          <img v-if="currentItem.detail_img" :src="currentItem.detail_img" />
          <img v-else src="@/assets/3.png" />
        </div>
      </div>
    </van-popup>
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
      treeData: '',
      currentItem: '',
      dialogVisible: false,
      active: 2,
      displacement: {
        scale: 1
      }

    }
  },
  components: {
    TreeChart
  },
  created () {
    this.getTreeData()
  },

  methods: {
    ...mapMutations(['setLoading']),
    getTreeData () {
      this.setLoading(true)
      setTimeout(async () => {
        const root = await api.getMemberList({
          genealogyId: 1,
          parentId: -1
        })
        if (root.length) {
          this.treeData = await api.getMemberTree({ id: root[0].id })
          console.log(this.treeData)
        }

        this.setLoading(false)
      }, 300)
    },
    async handleClick (item: any, type) {
      const itemDetail = await api.getMemberDetail({
        id: item.id,
        child: true,
        mate: true
      })
      const currentItem = {
        ...itemDetail,
        mate: itemDetail.mate ? itemDetail.mate.name : '',
        children: itemDetail.children.map(item => item.name).join()
      }
      this.currentItem = currentItem
      console.log(this.currentItem)
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
})
</script>

<style lang="less">
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
</style>
