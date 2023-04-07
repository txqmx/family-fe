<template>
  <div class="lv-card-swiper">
    <div class="lv-card-left">功德榜</div>
    <div class="lv-card-right">
      <swiper
        ref="mySwiper"
        slidesPerView="auto"
        :spaceBetween="30"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="(item, index) in dataInfo.dataList" :key="index">
          <div class="avat" @click="handleClick(item)">
            <img :src="getAvatar(item)" />
            <div class="msg">{{ item.name }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Autoplay, Pagination, Navigation } from 'swiper'
import { lvDataParser, imgUrlParser } from '@/utils/Parser'
import api from '@/api'
import 'swiper/swiper-bundle.min.css'
export default defineComponent({
  name: 'LvMemberSwiper',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      modules: [Autoplay, Pagination, Navigation],
      dataInfo: {
        dataList: []
      }
    }
  },
  props: {
    prop: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  async created () {
    this.dataInfo = await lvDataParser(this.dataInfo, this.prop)
  },
  methods: {
    ...mapMutations(['setSearchState', 'setMemberDetailShow', 'setMemberDetail']),
    getAvatar (item) {
      let avatar = ''
      if (!item.avatar) {
        avatar =
            item.sex === 0
              ? require('@/assets/111.jpeg')
              : require('@/assets/222.jpeg')
      } else {
        avatar = imgUrlParser(item.avatar)
      }
      return avatar
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
    }
  }

})
</script>

<style lang="less" scoped>
@person_width: 4.5em;
@person_height: @person_width / 5 * 7;
.lv-card-swiper {
  display: flex;
  height: @person_height;
  width: 100%;
  .lv-card-left {
    display: flex;
    align-items: center;
    width: 22px;
    background: #ff976a;
    color: #fff;
    font-size: 16px;
    text-align: center;
    padding: 6px;
    line-height: 26px;
  }
  .lv-card-right {
    flex: 1;
    position: relative;
    overflow: hidden;
    .avat{
      display: block;
        position: relative;
        height: 100%;
        width: 100%;
        img {
          width: 100%;
          height: 100%;
        }
        .msg {
          font-size: 14px;
          display: inline-block;
          position: absolute;
          width: 100%;
          bottom: 0;
          right: 0;
          left: 0;
          color: #fff;
          background: rgba(22, 20, 20, 0.19);
        }
    }
  }
}

.swiper {
  width: 100%;
  height: 100%;
}

/deep/ .swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  width: @person_width;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

// /deep/ .swiper-wrapper {
//  -webkit-transition-timing-function: linear !important; /*之前是ease-out*/
//   -moz-transition-timing-function: linear !important;
//   -ms-transition-timing-function: linear !important;
//   -o-transition-timing-function: linear !important;
//   transition-timing-function: linear !important;
//   margin: 0 auto;
// }

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
