<template>
  <div>
    <div class="bg">
      <el-form class="loginForm" :model="loginForm">
        <el-form-item style="width: 35vw;margin-top: 15vh;margin-left: 7vw;">
          <el-row>
            <el-col :span="12" style="font-size: 2.5vh;width: 10vw;font-weight: 700;color: #fff;text-align:right">用户名：</el-col>
            <el-col :span="12">
              <el-input v-model="loginForm.loginName" placeholder="请输入用户名" clearable></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="width: 35vw;margin-top: 1vh;margin-left: 7vw;">
          <el-row>
            <el-col :span="12" style="font-size: 2.5vh;width: 10vw;font-weight: 700;color: #fff;text-align:right">密&nbsp;&nbsp;&nbsp;码：</el-col>
            <el-col :span="12">
              <el-input v-model="loginForm.passwd" @keyup.enter.native="login()" placeholder="请输入密码" clearable></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="text-align:right">
          <el-button type="" @click="login()" round style="width:17.5vw;color:red"  :disabled="loginForm.loginName == '' || loginForm.passwd == ''">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        loginName: '',
        passwd: ''
      }
    }
  },
  methods: {
    login () {
      if (!this.loginForm.loginName) {
        Message({
          message: '请输入用户名',
          type: 'error',
          duration: 1000
        })
        return
      }
      if (!this.loginForm.passwd) {
        Message({
          message: '请输入密码',
          type: 'error',
          duration: 1000
        })
        return
      }
      this.$login('login', this.loginForm).then(respose => {
        // this.$router.push('/index')  //通过url字符串跳转
        // this.$router.push({ path: '/index' })  //通过地址
        this.$router.push({name: 'Index', params: {}}) // 通过路由文件中得name跳转params为参数
      })
    }
  },
  created () {
    // let that = this
    // 监听回车事件
    // document.onkeyup = function (ev) {
    //   if (ev.keyCode === 13) {
    //     that.login()
    //   }
    // }
    let token = localStorage.getItem('token')
    let userInfo = localStorage.getItem('userInfo')
    if (token && userInfo) {
      this.$router.push({name: 'Index', params: {}})
    }
  }
}
</script>
<style scoped lang="scss" type="text/css">
.bg{
  background:url(../../assets/img/login-bg.png);
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
}
.loginForm{
  width: 34.5vw;
  height: 50vh;
  position: absolute;
  margin-top: 20vh;
  margin-left: 25vw;
}
</style>
