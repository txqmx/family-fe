<template>
  <div class="loading_overlay" v-if="loading">
    <div class="loading_content">
      <van-loading type="spinner" color="#ffffff" size="35"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  computed: {
    loading () {
      return this.$store.state.loading
    }
  }
})
</script>

<style lang="less" scoped>
.loading_overlay {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading_content{
    display: flex;
  align-items: center;
  justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.6);
  }
}

</style>
