import axios from 'axios'
import { Message } from 'element-ui'

// 定义全局变量
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})
// 请求拦截器，暂时不做配置
service.interceptors.request.use(
  (config) => {
    return config
  }
)
// 返回拦截器，统一处理异常
service.interceptors.response.use(
  (response) => {
    if (response.data.code === '0000') {
      return response.data.data
    } else if (response.data.code === '-999') {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      let errMessage = '请求接口【' + response.config.url + '】发生异常【' + response.data.code + '】:【' + response.data.desc + '】'
      this.$router.push('/')
      throw (errMessage)
    } else {
      Message({
        message: '异常【' + response.data.code + '】:【' + response.data.desc + '】',
        type: 'error',
        duration: 5000
      })
      let errMessage = '请求接口【' + response.config.url + '】发生异常【' + response.data.code + '】:【' + response.data.desc + '】'
      throw (errMessage)
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5000
    })
  }
)

export default service
