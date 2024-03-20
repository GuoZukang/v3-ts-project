import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default {
  install(app: App) {
    // 注册icon图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(`ele-${key}`, component)
    }
    // 全局注册icon组件
    app.component('SvgIcon', SvgIcon)
  }
}
