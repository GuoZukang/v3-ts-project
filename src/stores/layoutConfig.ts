import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutConfigStore = defineStore(
  'layoutConfig',
  () => {
    // 控制菜单展开与收起的状态
    const isCollapse = ref<boolean>(false)
    // 控制主题切换的状态
    const isDark = ref<boolean>(false)
    return {
      isCollapse,
      isDark
    }
  },
  {
    // 开启数据持久化
    persist: true
  }
)
