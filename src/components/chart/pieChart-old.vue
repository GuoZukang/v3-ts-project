<script lang="ts" setup>
import * as echarts from 'echarts'
import { nextTick, onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// 接受父组件传递的参数
let props = withDefaults(
  defineProps<{
    title?: string
    subtext?: string
    theme?: string
    bgColor?: string
    width?: string
    height?: string
    data: any[]
  }>(),
  {
    width: '100%',
    height: '380px',
    data: () => []
  }
)

// 监听父组件图标的数据一主题的切换,如果发生变化,则让图标重新渲染
watch(
  () => [props.data, props.theme],
  () => {
    nextTick(() => {
      init()
    })
  },
  {
    deep: true
  }
)

// 图标自适应
const echartsResizeFun = () => {
  chart.value && chart.value.resize()
}
onMounted(() => {
  init()
  // 监听浏览器的变化
  window.addEventListener('resize', echartsResizeFun)
})

// 当使用了keep-alive页面缓存组件时, 每次从缓存中重新插入时, 重置图表自适应
onActivated(() => {
  echartsResizeFun()
})

const nvll = ref(['', null, undefined])
const chartRef = ref<HTMLElement | null | undefined>() // dom
const chart = ref<any>() // echarts实例对象

// 初始化渲染图标
const init = () => {
  // 当echarts的实例对象已经创建过的话, 那么就销毁,echarts的实例对象
  // if (nvll.value.indexOf(chart.value) !== -1) chart.value.dispose()

  if (!nvll.value.includes(chart.value)) chart.value.dispose()

  // 2. 进行初始化
  chart.value = echarts.init(chartRef.value, props.theme)
  // 3. 定义图标的配置项
  const option = {
    backgroundColor: props.bgColor,
    title: {
      text: props.title,
      subtext: props.subtext,
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '单位:元',
        type: 'pie',
        radius: '60%',
        data: props.data,
        emphasis: {
          itemStyle: {
            // 图形阴影模糊的大小
            shadowBlur: 10,
            // 阴影水平方向偏移量
            shadowOffsetX: 0,
            // 阴影的颜色
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  // 4. 使用刚指定的配置项和数据显示图表
  option && chart.value.setOption(option)
}

// 监听组件的销毁
onBeforeUnmount(() => {
  window.removeEventListener('resize', echartsResizeFun)
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
})
</script>

<template>
  <el-card shadow="hover">
    <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
  </el-card>
</template>

<style lang="scss" scoped></style>
