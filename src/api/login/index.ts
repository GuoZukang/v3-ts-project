import request from '@/utils/request'
import type { loginType, userResType } from './types'

// 登录
export const loginApi = (data: loginType) => {
  return request<{ access_token: string }>('/auth/token', 'POST', data)
}
// 获取用户信息
export const getUserInfoApi = () => {
  return request<userResType>('/system/menu/user', 'GET')
}
