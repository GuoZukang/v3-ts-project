<script lang="ts" setup>
import { ref } from 'vue'
// 引入全屏和主题切换组件方法
import { useDark, useFullscreen } from '@vueuse/core'
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const store = useLayoutConfigStore()

const active = ref<boolean>(false)
// isFullscreen 是否是全屏
// enter 进入全屏
// exit 退出全屏
// toggle 切换全屏
const { isFullscreen, toggle } = useFullscreen()

// 设置默认的主题
const isDark = useDark({
  initialValue: 'dark'
})

// switch开关方法
const changeDark = (value: boolean) => {
  store.isDark = value
}
</script>

<template>
  <div class="layout-header-user">
    <!-- 全屏切换-->
    <div class="layout-header-user-icon mr5">
      <svg-icon :name="isFullscreen ? 'ele-Aim' : 'ele-FullScreen'" @click="toggle"></svg-icon>
    </div>
    <!--主题切换-->
    <div class="layout-header-user-icon mr5">
      <el-switch
        v-model="isDark"
        active-icon="ele-Moon"
        inactive-icon="ele-Sunny"
        inline-prompt
        style="--el-switch-on-color: #333"
        @change="changeDark"
      ></el-switch>
    </div>
    <!--下拉菜单-->
    <el-dropdown>
      <span class="user-dropdown-link">
        <el-avatar
          :size="30"
          class="mr3"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        罗军

        <svg-icon class="ml3" name="ele-ArrowDown"></svg-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="$router.push('/')">首页</el-dropdown-item>
          <el-dropdown-item @click="$router.push('/404')">404</el-dropdown-item>
          <el-dropdown-item @click="$router.push('/401')">401</el-dropdown-item>
          <el-dropdown-item divided @click="authStore.logout()">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped></style>
