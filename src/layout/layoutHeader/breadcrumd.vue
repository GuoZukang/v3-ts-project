<script lang="ts" setup>
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import { computed, onMounted, ref } from 'vue'
import {
  onBeforeRouteUpdate,
  type RouteLocationNormalized,
  type RouteRecordNormalized,
  useRoute
} from 'vue-router'

// 初始化store
const store = useLayoutConfigStore()
// 展开与收起方法
const handleCollapse = () => {
  store.isCollapse = !store.isCollapse
}

// 展开与收起的状态
const isCollapse = computed(() => {
  return store.isCollapse
})

// 初始化route
const route = useRoute()

// 保存面包屑导航的数据
const breadcrumbList = ref<RouteRecordNormalized[]>([])

// 获取当前路由的面包屑数据
const getBreadcrumb = (to: RouteLocationNormalized) => {
  const matched = to.matched.filter((item: RouteRecordNormalized) => {
    if (item.meta && item.meta.title && item.meta.isBreadcrumb !== false) {
      return item
    }
  })

  breadcrumbList.value = matched
}

onBeforeRouteUpdate((to: RouteLocationNormalized) => {
  getBreadcrumb(to)
})

onMounted(() => {
  getBreadcrumb(route)
})
</script>

<template>
  <div class="layout-header-breadcrumb">
    <svg-icon
      :name="isCollapse ? 'ele-Expand' : 'ele-Fold'"
      class="layout-header-expand-icon"
      @click="handleCollapse"
    ></svg-icon>

    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <template v-for="(item, index) in breadcrumbList" :key="index">
          <el-breadcrumb-item v-if="index === breadcrumbList.length - 1">
            <span class="flex-center">
              <svg-icon
                v-if="item.meta.icon"
                :name="item.meta.icon"
                :size="14"
                class="mr5"
              ></svg-icon>
              {{ item.meta.title }}
            </span>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-from {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
  z-index: -1;
}
</style>
