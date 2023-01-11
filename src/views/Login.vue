<template>
  <div class="login">
    <div class="login-container">
      <div class="login-title">
        宗信堂族谱系统
      </div>
      <div class="login-form">
        <van-form action="javascript:;" @submit="login">
          <van-cell-group inset>
            <van-field v-model="username" name="用户名" label="用户名" placeholder="请输入用户名" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="请输入密码" />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="warning" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import api from '@/api'
export default defineComponent({
  name: 'Login',
  data () {
    return {
      homeActive: '0',
      loginShow1: true,
      loginShow: false,
      username: '黄氏家族江夏堂族谱',
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
  beforeUnmount () {
    document.onkeydown = null
  },
  methods: {
    ...mapMutations(['setLoading']),
    async login () {
      if (!this.password) {
        this.$notify({
          type: 'warning',
          message: '请输入密码'
        })
        return
      }
      this.$setLoading(true)
      api.login({
        username: this.username,
        password: this.password
      }).then(res => {
        this.$setLoading(false)
        window.sessionStorage.setItem('token', res.token)
        this.$notify({
          type: 'success',
          message: '登录成功',
          duration: 1000
        })
        this.$router.replace({ path: '/' })
      }).catch((e) => {
        this.$setLoading(false)
        this.$notify({
          type: 'warning',
          message: e.errMsg
        })
      })
    }
  }

})
</script>

<style scoped lang="less">
.login {
  overflow: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-container {
    position: absolute;
    top: 18%;

    .login-title {
      font-size: 25px;
      font-weight: bold;
      color: #323233;
      text-align: center;
      margin-bottom: 60px;
    }

    .login-form {
      padding: 10px;
      background: #ffff;
      border-radius: 18px;
      box-shadow: 0 0 25px rgba(0, 0, 0, .2);
    }
  }

}
</style>
