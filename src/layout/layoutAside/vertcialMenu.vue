<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    :router="true"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    text-color="#fff"
  >
    <MenuItem :data="menuList"></MenuItem>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import type { MenuItemType } from '@/layout/layoutAside/types/verticalMenuType'

const MenuItem = defineAsyncComponent(() => import('./menuItem.vue'))
defineProps<{
  menuList: MenuItemType[]
}>()

const store = useLayoutConfigStore()

const isCollapse = computed(() => {
  return store.isCollapse
})
</script>

<style lang="scss" scoped></style>
