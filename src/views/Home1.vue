<template>
  <div class="home">
      <div class="home_cord home_top">
        <div class="person">
          <div class="home_img">
            <img src="img/彭书金_副本.jpg">
          </div>
          <div class="home_msg">
            <p class="msg_title">彭公 彭书金</p>
            <p>生於 公元一九零一年八月廿八日吉时</p>
            <p>殁於 公元一九五七年冬月初一日吉时</p>
            <!-- <p>福地：广东省XX市XX市</p> -->
            <!-- <p>年龄：xxxx</p>
            <p>籍贯：xxxx</p>
            <p>住址：xxxx</p> -->
          </div>
        </div>
        <div class="person">
          <div class="home_img">
            <img src="img/李开英_副本.jpg">
          </div>
          <div class="home_msg">
            <p class="msg_title">彭母 李开英</p>
            <p>生於 公元一九零三年三月廿三日吉时</p>
            <p>殁於 公元一九七八年三月十八日吉时</p>
          </div>
        </div>
        <div class="background"></div>
        <div class="home_btn">
          <van-button round type="warning" size="mini" @click="enterTree">进入族谱</van-button>
        </div>
      </div>
      <div class="home_ad">
        <img src="img/3.jpg">
      </div>
      <div class="home_cord home_intro">
        <div class="into_title">简介</div>
        <div class="into_msg">
          <p>家住在湖南省湘西土家族苗族自治州永顺县灵溪镇古正街159号。老家住石堤区润雅乡五官村速启科组。</p>
          <p>
            前清时代我的曾祖父彭永惠老人一人从速启科徒步来到永顺县城，在民国书院联中学校找了一份工作。做总务工友工作，期间在宝塔村经人介绍找了个伴侣成家。生一子取名彭昌清，在曾父母去世后，祖父与姚本英祖母为夫妻。生下我父彭书金，在我父三岁时，祖父因病去世。祖母和父亲做米生意过生活。
          </p>
          <p>
            我父成年后经媒人介绍与连三坡的村民李开英结婚。父亲做起了卖南扎生意。从乡下进土特产．如桐油、茶叶等。原来交通不便走水路，用木船装桐油茶叶等物资下沅陵常德换盐、酱油、碱水日用品等回来卖，生意还可以母亲做豆腐，还请了长工做机器面买。经济有了发展。父亲在郊区原八师学校门外买了块地修房子。另外还买了一些田、地，在坡子街买了门面做生意．生下大哥彭述文，几年后生下大姐彭述玉，后生下三哥彭述云。又过几年后生下我彭述尧。我们全家人在东门外坡子街住为人和气，忠诚老实，关于社会上一些公德之事，父亲也很乐意去做，比如像原拱桥，（现在交通桥）、南门万缘桥、西门桥、北门花桥等，我父亲都参加投资交钱的。在每坐桥上都立桥碑、上面都刻有出钱人的名字，修原江西会馆房子我父亲也出钱的。我父在他有生之年，做了不少善事，在民国中期时还结识了老民医彭年全和四川的张继生老中医。学到了给人看病封刀结骨的绝技。平常给人看病不收钱，药费全免。我母亲为人善良．在坡子街一条街为人都很和气，每家在有红白喜事，都来请她帮忙，她很乐意去做，平常若碰上外乡来的难民都会给钱给米．平常父母教育我们四姐弟为人要平良心做事，要真正，害人之心不可有，防人之心不可无
          </p>

        </div>
      </div>
      <!-- <div class="home_ad">
        <img src="@/assets/44.png">
      </div>
      <div class="home_ad">
        <img src="@/assets/55.png">
      </div> -->
      <!-- <div class="home_cord home_page">
        <van-tabs v-model="homeActive">
          <van-tab title="谱文">
            <famliy-list></famliy-list>
          </van-tab>
          <van-tab title="行传">
            <family-acts></family-acts>
          </van-tab>
        </van-tabs>
      </div> -->
      <van-dialog  v-model:show="loginShow" title="请输入密码" show-cancel-button @confirm="login" @cancel="loginCancel" :beforeClose="beforeClose">
        <van-field ref="password" v-model="password" type="password" placeholder="请输入密码" autofocus/>
      </van-dialog>
      <!-- 数字键盘 -->
      <!-- <van-number-keyboard
        v-model="password"
        :show="loginShow"
        @blur="loginShow = false"
      /> -->
  </div>
</template>

<script lang="ts">
// import famliyList from '@/components/famliyList.vue'
import { defineComponent } from 'vue'
// import FamilyActs from '@/components/familyActs.vue'
import { mapMutations } from 'vuex'
export default defineComponent({
  // components: { famliyList, FamilyActs },
  name: 'Home',
  data () {
    return {
      homeActive: '0',
      loginShow1: true,
      loginShow: false,
      password: ''
    }
  },
  created () {
    document.onkeydown = (e) => {
      if (e && e.key === 'Enter') {
        this.login()
      }
    }
  },
  methods: {
    ...mapMutations(['setLoading']),
    enterTree () {
      this.loginShow = true
    },
    beforeClose () {
      return false
    },
    login () {
      this.$refs.password.focus()
      if (!this.password) {
        this.$toast('请输入密码')
        return
      }
      if (this.password === '123456') {
        this.$router.push({ name: 'Tree' })
        this.loginCancel()
      } else {
        this.$toast('密码错误')
      }
    },
    loginCancel () {
      this.password = ''
      this.loginShow = false
    }
  }

})
</script>

<style scoped lang="less">
.home{
  overflow: auto;
  height: calc(100% - 46px);
  .home_cord{
      background: #ffffff;
      margin-bottom: 15px;
      padding: 10px;
    }
    .home_top{
      position: relative;
      z-index: 1;
      // background: transparent;
      .background{
        position:absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -10;
        background: url('~@/assets/background.png') no-repeat transparent;
        background-size: 100% 100%;
        opacity: 0.5;
      }
      .person{
        display: flex;
        margin-bottom: 15px;
        .home_img{
        display: flex;
        align-items: center;
        width: 5em;
        height: 7em;
        margin-left: 6px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .home_msg{
        position: relative;
        flex: 1;
        font-size: 12px;
        margin-left: 20px;
        color: #696a6c;
        .msg_title{
          font-size: 15px;
          font-weight: 500;
          color: #000;
        }

      }
      }
      .home_btn{
        margin: -10px 10px 10px 0;
          text-align: right;
          .van-button{
            width: 90px;
            font-size: 13px;
          }
        }

    }
    .home_ad{
      // height: 100px;
      margin-bottom: 10px;
      img{
        width: 100%;
      }
    }
    .home_intro{
      .into_title{
          font-size: 15px;
          font-weight: 500;
          color: #000;
          margin-bottom: 10px;
      }
      .into_msg{
        font-size: 13px;
        color: #969799;
        line-height: 1.9;
        padding: 5px;
      }
    }
}

</style>
