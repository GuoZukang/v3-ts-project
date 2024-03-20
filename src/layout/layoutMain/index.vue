<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const store = useAuthStore()
const cacheNames = computed(() => {
  return store.cacheName
})
</script>

<template>
  <!--右侧主区域-->
  <el-main class="layout-main">
    <el-scrollbar>
      <div class="layout-main-warp">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade-transform">
            <keep-alive :include="cacheNames">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<style lang="scss" scoped>
::v-deep(.el-scrollbar__view) {
  height: 100%;
}
</style>
