import router from './router'
import { userStore } from './stores/user'

const whiteList: string[] = ['/login', '/401', '/404']

router.beforeEach(async (to, from, next) => {
  const store = userStore()
  if (store.token !== '') {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.userInfo || store.buttonList.length <= 0 || store.menuList.length <= 0) {
        const res = await store.getUserInfo()
        if (res!.data) {
          next({ path: to.path, query: to.query })
        } else {
          next(`/login?redirect=${to.path}`)
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
