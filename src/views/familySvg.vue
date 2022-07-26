<!-- eslint-disable semi -->
<template>
  <div id="treeSvg">
    <div id="treeRoot"></div>
    <div v-if="tree" class="family_btn">
      <van-button type="warning" size="small" @click="show=true">{{fieldValue}}</van-button>
      <van-button type="warning" size="small" @click="enlarge">全部展开</van-button>
      <van-button type="warning" size="small" @click="micrify">全部收起</van-button>
      <van-button v-if="!isRoot" type="warning" size="small" @click="goBackRoot">回到根节点</van-button>
    </div>
    <search v-if="searchShow" @searchSubmit="searchSubmit"></search>
    <van-popup v-model:show="show" round position="bottom">
      <van-cascader v-model="cascaderValue" title="请选择" :options="options" @close="show = false" @change="onChange"
        @finish="onFinish" />
    </van-popup>
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
      params: '',
      show: false,
      cascaderValue: '',
      fieldValue: '指定层级',
      options: []
    }
  },

  mounted () {
    this.queryMaxLevel()
    if (this.$route.params.id) {
      this.searchSubmit(this.$route.params)
    } else {
      this.getTreeData()
    }
  },
  computed: {
    isRoot () {
      return this.treeData.parentId === -1
    },
    searchShow () {
      return this.$store.state.searchState
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.params = to.params

  //   // 通过 `vm` 访问组件实例
  //   })
  // },
  methods: {
    ...mapMutations(['setLoading', 'setSearchState', 'setMemberDetailShow', 'setMemberDetail']),
    searchSubmit (item) {
      if (this.treeData.id !== item.id) {
        this.getTreeData(item)
      }
      this.setSearchState(false)
    },
    goBackRoot () {
      this.getTreeData()
    },
    // 获取最大层级
    async queryMaxLevel () {
      const res = await api.queryMaxLevel()
      if (res.length) {
        const option = []
        for (let i = 1; i <= res[0].level_max; i++) {
          option.push({
            text: `第${i}世`,
            value: i,
            children: []
          })
        }
        this.options = option
      }
    },
    async getTreeData (row) {
      this.setLoading(true)
      if (row) {
        this.treeData = await api.getMemberTree({ id: row.parentId === -1 ? row.id : row.parentId })
        this.cascaderValue = [
          { text: `第${row.level}世`, value: row.level, children: [] },
          { text: row.name, value: row.id, parentId: row.parentId }
        ]
        if (this.cascaderValue.length === 2) {
          this.fieldValue = this.cascaderValue.map((option) => option.text).join('/')
        }
      } else {
        const root = await api.getMemberList({
          // genealogyId: 1,
          parentId: -1
        })
        if (root.length) {
          const item = root[0]
          this.treeData = await api.getMemberTree({ id: root[0].id })
          this.cascaderValue = [
            { text: `第${item.level}世`, value: item.level, children: [] },
            { text: item.name, value: item.id, parentId: item.parentId }
          ]
          if (this.cascaderValue.length === 2) {
            this.fieldValue = this.cascaderValue.map((option) => option.text).join('/')
          }
        }
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
      this.setMemberDetail(currentItem)
      this.setMemberDetailShow(true)
    },

    enlarge () {
      this.tree.expandAllNodes()
    },
    micrify () {
      this.tree.foldAllNodes()
    },
    async onChange (row) {
      const list = await api.getMemberList({
        // genealogyId: 1,
        level: row.value
      })
      const optionItem = this.options.find(item => item.value === row.value)
      optionItem.children = list.filter(item => !item.isMate).map(item => {
        return {
          text: item.name,
          value: item.id,
          ...item
        }
      })
    },
    onFinish ({ selectedOptions }) {
      this.getTreeData(selectedOptions[1])
      this.show = false
    }

  },
  components: { Search }
})
</script>

<style lang="less">
#treeSvg {
  overflow: hidden;
  height: calc(100% - 51px);
  width: 100%;
  padding-top: 5px;

  .identity-msg {
    stroke: #fff;
    font-size: 12px;
    text-anchor: middle;
    stroke-width: 0.7;
    fill: #ffffff;
  }

  .name-msg {
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

.family_btn {
  // width: 97.5px;
  height: 40px;
  // border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: fixed;
  right: 15px;
  bottom: 15px;

  .van-button {
    margin: 0 5px;
  }
}
</style>
