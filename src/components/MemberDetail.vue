<template>
  <van-popup  v-model:show="dialogVisible" position="bottom" closeable round teleport="body">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
export default defineComponent({
  components: { },
  name: 'MemberDetail',
  data () {
    return {
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.$store.state.memberDetailShow
      },
      set (val) {
        if (!val) {
          this.handleClose()
        }
      }
    },
    currentItem () {
      return this.$store.state.memberDetail
    }
  },
  watch: {
    dialogVisible (val) {
      if (val) {
        window.history.pushState(null, null, window.location.hash)
        window.addEventListener('popstate', this.handleClose, false)
      } else {
        window.removeEventListener('popstate', this.handleClose, false)
      }
    }
  },
  methods: {
    ...mapMutations(['setMemberDetailShow', 'setMemberDetail']),
    handleClose (e) {
      if (!e || e.type !== 'popstate') {
        window.history.back()
      }
      this.setMemberDetail('')
      this.setMemberDetailShow(false)
    },
    dateFormat (date) {
      if (!date) { return '-' }
      const newDate = new Date(date)
      var Y = newDate.getFullYear() + '-'
      var M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-'
      var D = (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()) + ' '
      return Y + M + D
    }
  }

})
</script>

<style scoped lang="less">
.home{
  overflow: auto;
  height: calc(100% - 46px);
  padding-bottom: 20px;
  & > div{
    margin-bottom: 16px;
  }
}

</style>
