<script lang="ts" setup>
import type { MenuItemType } from '@/layout/layoutAside/types/verticalMenuType'

defineProps<{
  data: MenuItemType[]
}>()
</script>

<template>
  <template v-for="(item, index) in data">
    <el-menu-item :key="index" v-if="!item.children || !item.children.length" :index="item.path">
      <svg-icon :name="item.meta.icon"></svg-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
    <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
      <template #title>
        <svg-icon :name="item.meta.icon"></svg-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <MenuItem :data="item.children"></MenuItem>
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped></style>
