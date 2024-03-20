<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import type { MenuItemType } from '@/layout/layoutAside/types/verticalMenuType'

const MenuItem = defineAsyncComponent(() => import('./menuItem.vue'))

const store = useLayoutConfigStore()

const isCollapse = computed(() => {
  return store.isCollapse
})

defineProps<{
  data: MenuItemType[]
}>()
</script>

<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    :router="true"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    text-color="#fff"
  >
    <MenuItem :data="data"></MenuItem>
  </el-menu>
</template>

<style lang="scss" scoped></style>
