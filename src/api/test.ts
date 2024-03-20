import request from '@/utils/request'

type ListType = {
  current: number
  size: number
}

type ListResponseType = {
  total: number
  records: RecordsType[]
}

type RecordsType = {
  accountNonExpired: boolean
  accountNonLocked: boolean
  createTime: string
  credentialsNonExpired: boolean
  email: string
  id: number
  imageUrl: string
  mobile: string
  nickName: string
  password: string
  remark: string
  roleIds: number[]
  updateTime: string
  username: string
}

export const getList = (data: ListType) => {
  return request<ListResponseType>('/system/user/search', 'POST', data)
}
