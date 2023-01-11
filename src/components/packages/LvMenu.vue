<template>
  <div class="lv-menu-container">
    <div class="menu" v-for="(item,index) in menuList" :key="index" @click="entry(item)">
      <div class="menu-icon">
        <img :src="item.icon"/>
      </div>
      <div class="menu-name">{{item.name}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { lvDataParser, imgUrlParser } from '@/utils/Parser'
export default defineComponent({
  name: 'LvMenu',
  data () {
    return {
      dataInfo: {
        imgs: []
      },
      menuList: [
        {
          name: '进入族谱',
          icon: require('@/assets/icon/stacked.svg'),
          router: {
            name: 'familySvg'
          }
        },
        {
          name: '家族资讯',
          icon: require('@/assets/icon/book.svg'),
          router: {
            name: 'articlesList'
          }
        },
        {
          name: '家族相册',
          icon: require('@/assets/icon/image.svg'),
          router: {
            name: 'imgList'
          }
        },
        {
          name: '功德榜',
          icon: require('@/assets/icon/mark.svg')
        }
      ],
      imgUrlParser: imgUrlParser
    }
  },
  props: {
    prop: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  methods: {
    entry (item) {
      console.log(item)
      if (item.router) {
        this.$router.push(item.router)
      }
    }
  }
})
</script>

<style lang="less" scoped>
.lv-menu-container {
  position: relative;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  .menu{
    width: 60px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .menu-icon{
      width: 50px;
      height: 50px;
      img{
        width: 100%;
      }
    }
    .menu-name{
      margin-top: 2px;
      text-align: center;
      color: #969799;
      font-size: 14px;
    }
  }
}

</style>
