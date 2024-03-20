// 自定义指令注册的入口文件

import type { App } from 'vue'
import AuthDirective from './auth'

export default {
  install(app: App) {
    app.use(AuthDirective)
  }
}
