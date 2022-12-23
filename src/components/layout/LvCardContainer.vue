<template>
  <div class="lv-card-container">
    <div class="lv-card_title">
      <span>{{ title }}</span>
      <span class="more-btn" @click="entryMore">
        更多
        <van-icon name="arrow" />
      </span>
    </div>
    <van-divider />
    <div>
      <div class="lv-card_content" :style="{ height: minHeight }">
        <slot></slot>
      </div>
      <div v-if="isExpanded" class="lv-text_more" @click="showMore">
        <!-- <van-icon v-if="expanded" name="arrow-up" /> -->
        <!-- <van-icon v-else name="arrow-down" /> -->
        <img src="../../assets/moreup.png" v-if="expanded" name="arrow-up" class="more-style" />
        <img src="../../assets/moredown.png" v-else name="arrow-down" class="more-style" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LvCardContainer',
  data () {
    return {
      expanded: false
    }
  },
  props: {
    title: {
      default: ''
    },
    isExpanded: {
      default: false
    }
  },
  mounted () {
    if (this.isExpanded) {
      this.minHeight = '200px'
    }
  },
  computed: {
    minHeight () {
      if (this.isExpanded) {
        return this.expanded ? '' : '200px'
      } else {
        return ''
      }
    }
  },
  methods: {
    showMore () {
      this.expanded = !this.expanded
    },
    entryMore () {
      this.$emit('more')
    }
  }
})
</script>

<style lang="less" scoped>
.lv-card-container {
  position: relative;
  background: #ffffff;
  padding: 12px 16px;

  .lv-card_title {
    font-size: 16px;
    color: #323233;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .more-btn {
      cursor: pointer;
      font-size: 13px;
      color: #aeafb1;
    }

  }

  .lv-card_content {
    padding: 0 4px;
    // margin-bottom: 10px;
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
    overflow: hidden;
  }

  .lv-text_more {
    padding-top: 10px;
    text-align: center;
  }

  .van-divider {
    margin: 10px 0 0 0;
  }

  .more-style {
    width: 16px;
    height: 16px
  }
}
</style>
