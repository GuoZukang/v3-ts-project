import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// 引入element-plus
import ElementPlus from 'element-plus'
// 引入icon
import useIcon from './utils/setGlobal'
// 引入element-plus 中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入自定义指令
import directive from './directive'

// 引入pinia
import pinia from './stores'

// 引入scss
import './styles/index.scss'

// 引入页面权限文件
import './permission'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})
app.use(useIcon)
app.use(router)
app.use(pinia)
app.use(directive)

app.mount('#app')
