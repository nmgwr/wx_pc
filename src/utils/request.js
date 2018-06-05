import Ajax from './AxiosConfig'

export default {
  data () {
    return {

    }
  },
  methods: {
    // 普通的post请求加请求头从缓存中获取
    $post (path, params) {
      let token = localStorage.getItem('token')
      return Ajax.request({
        url: path,
        method: 'post',
        data: params,
        headers: {'Authorization': token}
      })
    },
    // 登陆不加请求头、成功后把返回的token和用户信息放入localStorage
    $login (path, params) {
      return Ajax.request({
        url: path,
        method: 'post',
        data: params
      }).then((response) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('userInfo', JSON.stringify(response.userInfo))
        return response
      })
    }
  }
}
