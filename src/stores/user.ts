import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi, getUserInfoApi } from '@/api/login/index'
import type { loginType, userInfoType } from '@/api/login/types'
import type { MenuItemType } from '@/layout/layoutAside/types/verticalMenuType'
import type { RouteComponent } from 'vue-router'
import router, { dynamicRoutes, errorRouters } from '@/router'
export const userStore = defineStore(
  'user',
  () => {
    const token = ref<string>('')
    const userInfo = ref<userInfoType>()
    const buttonList = ref<string[]>([])
    const menuList = ref<MenuItemType[]>([])
    // 登录
    const login = async (form: loginType) => {
      try {
        const {
          data: { access_token }
        } = await loginApi(form)
        token.value = access_token
        return access_token
      } catch (error) {
        console.log(error)
      }
    }

    // 获取用户信息
    const getUserInfo = async () => {
      try {
        const res = await getUserInfoApi()
        userInfo.value = res.data.userInfo
        buttonList.value = res.data.buttonList
        menuList.value = res.data.menuList
        filterRouter()
        return res
      } catch (error) {
        console.log(error)
      }
    }

    // 过滤出当前所拥有的路有数据
    const filterRouter = () => {
      const viewsModules = parseRouteKey()
      const menus = dynamicImportComponent(menuList.value, viewsModules)
      console.log(menus)
      addRouter(menus)
    }

    // 动态添加路由
    const addRouter = (newRouter: any) => {
      dynamicRoutes[0].children = [...(newRouter || []), ...errorRouters]
      console.log('dynamicRoutes', dynamicRoutes)
      dynamicRoutes.forEach((item) => {
        router.addRoute(item)
      })
    }

    // 将后台返回的component转化为动态导入路由组件 component : '/home/index.vue' => conmponent = () => import()
    const dynamicImportComponent = (
      menuList: MenuItemType[],
      viewsModules: Record<string, RouteComponent>
    ) => {
      if (menuList.length <= 0) return []
      menuList.map((item: MenuItemType) => {
        const { component } = item
        if (component) {
          item.component = viewsModules[`${component}`] || viewsModules[`/${component}`]
        }
        item.children && dynamicImportComponent(item.children, viewsModules)
        return item
      })
      return menuList
    }
    // 处理导入组件的key值
    const parseRouteKey = () => {
      const modules = import.meta.glob(['@/views/**/index.vue', '!@/views/**/components'])
      console.log('modules=>', modules)
      const views: Record<string, RouteComponent> = Object.keys(modules).reduce(
        (pre, cur) => Object.assign(pre, { [cur.replace(/\/src\/views/, '')]: modules[cur] }),
        {}
      )
      return views
    }

    return {
      token,
      userInfo,
      buttonList,
      menuList,
      login,
      getUserInfo,
      filterRouter
    }
  },
  {
    persist: {
      paths: ['token']
    }
  }
)
