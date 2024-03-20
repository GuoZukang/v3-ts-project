import type { MenuItemType } from '@/layout/layoutAside/types/verticalMenuType'

// 登录
export type loginType = {
  username: string
  password: string
}
// 用户信息返回数据(res.data)
export type userResType = {
  buttonList: string[]
  menuList: MenuItemType[]
  userInfo: userInfoType
}
// 用户信息数据(userInfo)
export type userInfoType = {
  nickName: string
  username: string
  imageUrl: string
}
