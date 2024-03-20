import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type Method
} from 'axios'
import type { DataType } from '@/utils/types'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

// axios实例对象
const service: AxiosInstance = axios.create({
  // baseURL: '/dev-api',
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 20000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = useAuthStore()
    // 发送token
    if (store.accessToken) {
      config.headers.Authorization = 'Bearer ' + store.accessToken
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 请求成功,将response.data返回出去
    if (response.status === 200 && response.data.code === 20000) {
      return response.data
    }
    // 非正常弹出错误信息
    ElMessage.error(response.data.message || 'Error')
  },
  (error: AxiosError) => {
    const { message, response } = error
    if (message.indexOf('timeout') != -1) {
      ElMessage.error('网络超时！')
    } else if (message == 'Network Error') {
      ElMessage.error('网络连接错误！')
    } else {
      if (response!.data) {
        ElMessage.error(response!.statusText)
      } else {
        ElMessage.error('接口路径找不到')
      }
    }
    return Promise.reject(error)
  }
)

// 状态码的处理 http status code 200 300 400 500
// 业务码的处理 code !=== 20000
// 响应拦截: 成功(200)  失败(!200)

const request = <T = any>(
  url: string,
  method: Method = 'GET',
  data?: Object,
  options?: InternalAxiosRequestConfig
) => {
  return service.request<T, DataType<T>>({
    url,
    method,
    [method === 'GET' ? 'params' : 'data']: data,
    ...options
  })
}

export const get = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'GET', data)
}

export const post = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'POST', data)
}

export const put = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'PUT', data)
}

export const del = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'DELETE', data)
}

export default request


// 开发环境 请求的代理 /api http://www.baidu.com

// 生产环境 请求代理 /pro http://www.jd.com

// 测试环境 请求代理 /test http://test.com

// 预发布   请求代理 /stage http://stage.com
