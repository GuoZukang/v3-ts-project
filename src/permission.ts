import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const whiteList: string[] = ['/login', '/404', '/401']

/**
 * 页面鉴权
 */
router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()
  const accessToken = store.accessToken
  if (accessToken) {
    if (to.path === '/login') {
      return next({ path: '/' })
    } else {
      if (!store.userInfo || store.menuList.length <= 0 || store.buttonList.length <= 0) {
        // 获取用户信息和权限信息
        const res = await store.getUserInfo()
        if (res!.data) {
          return next({ path: to.path, query: to.query })
        } else {
          return next(`/login?redirect=${to.path}`)
        }
        // next({ path: to.path, query: to.query })
        // next(to.path)
      } else {
        // 有用户信息和权限信息，则跳转到目标路由
        return next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      return next()
    } else {
      return next(`/login?redirect=${to.path}`)
    }
  }
})

// 当用户登录拿到token之后,还不能直接进入首页
// 当用户登录拿到token之后,判断有没有用户信息以及权限数据
// 如果有,则直接进入首页
// 如果没有,
//  1. 获取用户信息(调用接口)
//  2. 拿到用户信息之后,存储到pinia中
//  3. 这个时候, pinia中就会有用户信息、菜单数据、按钮权限的数据
//  4. 接下来要做的事情就是将菜单数据转化为路由表所需要的数据
//  5. 当菜单数据成功转化为路由表所需要的数据之后, 我们需要通过router.addRoute将转化之后的路由表数据动态的添加到路由中
