<template>
  <div>
    <h1>{{message}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Error401',
  data () {
    return {
      message: '您没有权限'
    }
  }
}
</script>
<style scoped>

</style>
