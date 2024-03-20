<script lang="ts" setup>
import { h, resolveComponent } from 'vue'

// <!--  <el-icon :color="color" :size="size">-->
// <!--    <ele-Share />-->
// <!--  </el-icon>-->
// 设置defineprops的默认值
const props = withDefaults(
  defineProps<{
    // 图标颜色
    color?: string
    // 图标大小
    size?: string | number
    // 图标名称
    name?: string
  }>(),
  {
    name: '',
    size: 18
  }
)

const render = () => {
  if (props.name && props.name?.startsWith('ele-')) {
    // return h(resolveComponent('el-icon'), { color: props.color, size: props.size }, [
    //   h(resolveComponent(props.name))
    // ])
    return h(resolveComponent('el-icon'), { color: props.color, size: props.size }, () => {
      return h(resolveComponent(props.name))
    })
  } else {
    return h('i')
  }
}
</script>

<template>
  <render />
</template>

<style lang="scss" scoped></style>
