// 封装 axios
import axios from 'axios'
// 引入ant组件库提示组件
import { Toast } from 'antd-mobile'

// 后台接口的基础地址
// const BASE_URL = 'https://api-haoke-dev.itheima.net';
const BASE_URL = 'https://api-haoke-web.itheima.net' // 项目部署不支持跨域，换了这个基地址
// 创建axios的实例
const instance = axios.create({
  baseURL: BASE_URL
});

// 注册拦截器（request和response）

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 开启加载提示
  Toast.loading('加载中',0)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  let ress= {
    status:response.data.status,
    description:response.data.description,
    data:response.data.body
  }

  // 关闭加载提示
  Toast.hide()
  return ress;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export { BASE_URL }
export default instance