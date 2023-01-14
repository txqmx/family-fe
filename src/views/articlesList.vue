<template>
  <van-tabs v-model:active="currentType" @click-tab="onClickTab">
    <van-tab
      v-for="item in typeList"
      :key="item.id"
      :title="item.name"
      :name="item.code"
    ></van-tab>
  </van-tabs>
  <div class="article-list">
    <van-list
      v-if="list.length"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.id">
        <div class="article-item" @click="entryDetail(item)">
          <div class="article-msg">
            <div class="article-title">
              <van-tag color="#fef0f0" text-color="#f56c6c">
                {{typeMap[item.type]}}
              </van-tag>
              {{ item.name }}
            </div>
            <div class="article-author">{{ item.name }}</div>
          </div>
          <van-image class="article-img" :src="imgUrlParser(item.cover)">
          </van-image>
        </div>
      </van-cell>
    </van-list>
    <van-empty v-else description="暂无内容" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { imgUrlParser } from '@/utils/Parser'
import api from '@/api'
export default defineComponent({
  name: 'articlesList',
  data () {
    return {
      imgUrlParser: imgUrlParser,
      loading: true,
      finished: false,
      list: [],
      typeList: [],
      typeMap: {},
      currentType: ''
    }
  },
  created () {
    this.getTypeList()
  },
  activated () {
    if (this.$route.query.type) {
      this.currentType = this.$route.query.type
      this.getList()
    }
  },
  methods: {
    onClickTab (item) {
      this.getList()
    },
    onLoad () {
      this.loading = false
    },
    async getList () {
      this.$setLoading(true)
      this.list = await api.getArticlesList({
        type: this.currentType
      })
      this.$setLoading(false)
    },
    async getTypeList () {
      const typeList = await api.getResourceType({
        dataType: 'text'
      })
      const typeMap = {}
      typeList.forEach((item) => {
        typeMap[item.code] = item.name
      })
      this.typeList = typeList
      this.typeMap = typeMap
      if (this.$route.query.type) {
        this.currentType = this.$route.query.type
      } else {
        this.currentType = this.typeList[0].code
      }
      this.getList()
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
.article-list {
  background: #ffffff;
  height: calc(100% - 44px);
  overflow: auto;

  .article-item {
    display: flex;

    .article-msg {
      flex: 1;

      .article-title {
        display: flex;
        align-items: center;
        font-size: 16px;

        .van-tag {
          margin-right: 5px;
          border: 1px solid #fde2e2;
        }
      }

      .article-author {
        position: absolute;
        bottom: 0;
        font-size: 13px;
        color: #aeafb1;
      }
    }

    .article-img {
      width: 90px;
      height: 60px;
    }
  }
}
</style>
