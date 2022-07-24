<template>
  <div class="family_content">
      <div class="family_card" v-for="(item, index) in 10" :key="index">
          <div class="title">
              <van-tag type="warning" size="medium">{{index+1}}世</van-tag>
              评事
          </div>
          <div class="content">
              评事，字评事五郎，江西人
          </div>
          <div class="mate">
              <div class="mate_title">
                  配钱氏
              </div>
              <div class="mate_content content">
                  钱氏，生子三平事，生殁葬未祥
              </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style>
.family_card{
    margin-bottom: 20px;
    border-bottom: 1px solid #9e9e9e33;
}
.title{
    font-size: 16px;
    margin: 10px;
}
.content{
    font-size: 13px;
    color: #969799;
    margin: 10px 30px;
}
.mate{
    margin: 10px 30px;
}
.mate_title{
    font-size: 14px
}
</style>
