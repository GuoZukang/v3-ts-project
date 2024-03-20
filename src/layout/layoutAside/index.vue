<template>
  <!--左侧菜单区域-->
  <el-aside
    :class="isCollapse ? 'layout-aside-menu-60' : 'layout-aside-menu-200'"
    class="layout-aside"
  >
    <!--logo-->
    <Logo></Logo>
    <!--menu-->
    <VerticalMenu :menuList="menuList"></VerticalMenu>
  </el-aside>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import { userStore } from '@/stores/user'
import type { MenuItemType } from './types/verticalMenuType'
const authStore = userStore()

const store = useLayoutConfigStore()

const Logo = defineAsyncComponent(() => import('./logo.vue'))
const VerticalMenu = defineAsyncComponent(() => import('./vertcialMenu.vue'))

const isCollapse = computed(() => {
  return store.isCollapse
})
const menuList = computed(() => {
  return filterMenuList(authStore.menuList)
})
const filterMenuList = (menuList: MenuItemType[]) => {
  const deepTree = (menuList: MenuItemType[]) => {
    const targetMenu = menuList.filter((item) => !item.meta.hidden)
    targetMenu.forEach((item) => {
      if (item.children && item.children.length > 0) {
        deepTree(item.children)
      }
    })
    return targetMenu
  }
  return deepTree(menuList)
}
</script>

<style lang="scss" scoped></style>
