<template>
  <div>
    <div class="bg">
      <el-input
        placeholder="请输入用户名"
        v-model="loginName"
        clearable>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginName: ''
    }
  }
}
</script>
<style scoped>
.bg{
  background:url(../../assets/img/login-bg.png);
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
}
</style>
