<template>
  <div class="family_content">
    <van-collapse v-model="activeNames">
        <van-collapse-item title="扉页" name="1">
            <ul class="family_ul">
                <li v-for="item in titlePages" :key="item.id">{{item.title}}</li>
            </ul>
        </van-collapse-item>
        <van-collapse-item title="序" name="2">
            <ul class="family_ul">
                <li v-for="item in preface" :key="item.id">{{item.title}}</li>
            </ul>
        </van-collapse-item>
        <van-collapse-item title="文献篇" name="3">
            <ul class="family_ul">
                <li v-for="item in document" :key="item.id">{{item.title}}</li>
            </ul>
        </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data () {
    return {
      activeNames: ['1', '2', '3'],
      titlePages: [
        { id: 1, title: '黄氏图腾' },
        { id: 2, title: '前言' },
        { id: 3, title: '黄氏评事公肖像' },
        { id: 4, title: '黄氏志法公肖像' },
        { id: 5, title: '黄氏凡例' }
      ],
      preface: [
        { id: 1, title: '九修谱牒序集(存档)' },
        { id: 2, title: '黄氏评事公位下联谱统班记' },
        { id: 3, title: '黄氏九修谱序' }
      ],
      document: [
        { id: 1, title: '文献篇存档' },
        { id: 2, title: '关于协助编好《中国家谱总目》的通知' },
        { id: 3, title: '要重视家族史的研究' },
        { id: 4, title: '名人论族谱' },
        { id: 5, title: '说谱' }
      ]
    }
  }
})
</script>

<style>
.family_ul li{
    line-height: 2.0;
    margin-left: 10px;
}
.van-collapse-item__title--expanded::after{
    display: none !important;
}
</style>
