import axios from 'axios'
//https://piaofang.maoyan.com/dashboard-ajax?orderType=0&uuid=17b80afb06213-0c3b708cac77ee-34647600-13c680-17b80afb063c8
const service = axios.create({
   baseURL: '',
   withCredentials: false, // 表示跨域请求时是否需要使用凭证,default
   timeout: 30000
})

service.interceptors.request.use(config => {
   config.headers = {
      "Cache-Control": 'no-cache',
      "Pragma": 'no-cache'
   }
   return config

}, error => {
   return Promise.reject(error)
})

service.interceptors.response.use(response => {
   const { status } = response
   if (status !== 200) {
      return Promise.reject(status + '&&' + response.statusText)
   }
   return response
}, error => {
   return Promise.reject(error)
})

export const GET = (url, params) => { return service.get(url, { params }).then(res => res.data) }

export const POST = (url, data) => { return service.post(url, data).then(res => res.data) }

export const POST_PARAMS = (url, data, params) => { return service.post(url, data, { params }).then(res => res.data) }