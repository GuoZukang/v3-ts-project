import type { MenuItemType } from '@/layout/layoutAside/types/verticalMenuType'

export type LoginParamsType = {
  username: string
  password: string
}

export type UserResType = {
  buttonList: string[]
  menuList: MenuItemType[]
  userInfo: userInfoType
}

export type userInfoType = {
  imageUrl: string
  nickName: string
  username: string
}
