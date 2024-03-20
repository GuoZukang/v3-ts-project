import type { App } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  install(app: App) {
    app.directive('auth', {
      mounted(el, binding) {
        const store = useAuthStore()
        // 1. 获取到后台返回的按钮权限列表
        const btnList = store.buttonList
        // 2. 获取到当前按钮所绑定的自定义的指令
        const btnPer = binding.value || ''

        console.log('btnPer', btnPer)
        // 3. 判断当前按钮所绑定的指令是否存在于按钮权限列中
        if (!btnList.includes(btnPer)) {
          // 4. 如果不存在,则移除当前DOM节点
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    })
  }
}
