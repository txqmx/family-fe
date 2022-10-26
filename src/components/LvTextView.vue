<template>
  <div class="lv-text-container">
    <div class="lv-text_title">
      <span>家族简介</span>
      <lv-audio-view></lv-audio-view>
      </div>
    <van-divider />
    <div class="lv-text_content">
      <p>关于黄姓的起源，还有一种说法是出身于少昊之后。这一支黄人，是颛顼时从河南黄水西迁到山西汾水下游的，所建的黄国，于春秋早期为晋国所灭，这也是黄氏姓源之一。</p>
      <p >
        在历史上多次民族大融合中，黄氏有一些人融入壮、瑶、侗、水、布依等少数民族。亡国后的黄氏遗民，有的逃至今河南中部，大批被迁到今湖北境内，有的在楚国做了官。据说今黄冈、黄陂、黄梅等地，都是因为黄人迁来而得名的。
      </p>
      <p v-if="expanded">汉代以后，黄氏因任官等原因分别向大江南北迁徙，南至广西、湖南、江西、四川等地，北至河南固始、南阳。江夏黄元方字彦丰又名黄允入居福建，黄积入居新安江、黄苾入居浙江金华，始于晋代。宋元之际，黄氏称盛于浙赣闽粤，至明末清初，开始移居到台湾，后又有不少人移至海外，黄姓在台湾人中更为常见，与郑姓共同享有"黄郑排满街"之美誉。黄姓为当今中国第7大姓。</p>
    </div>
    <div class="lv-text_more" @click="showMore">
      <!-- <van-icon v-if="expanded" name="arrow-up" /> -->
      <!-- <van-icon v-else name="arrow-down" /> -->
      <img src="../assets/moreup.png"  v-if="expanded" name="arrow-up" class="more-style"/>
      <img src="../assets/moredown.png" v-else name="arrow-down" class="more-style" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LvAudioView from './LvAudioView.vue'
export default defineComponent({
  name: 'LvTextView',
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    showMore () {
      this.expanded = !this.expanded
    }
  },
  components: { LvAudioView }
})
</script>

<style lang="less" scoped>
.lv-text-container{
  position: relative;
  background: #ffffff;
  padding: 12px 16px;
  .lv-text_title{
    font-size: 16px;
    color: #323233;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .lv-text_content{
    padding: 0 4px;
    // margin-bottom: 10px;
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
    overflow: hidden;
  }
  .lv-text_more{
    text-align: center;
  }
  .van-divider{
    margin: 10px 0 0 0;
  }
  .more-style{
    width:16px;
    height:16px
  }
}
</style>
