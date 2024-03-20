<script lang="ts" setup>
import { useCharts } from '@/hooks/useCharts'

let props = withDefaults(
  defineProps<{
    title?: string
    subtext?: string
    theme?: string
    bgColor?: string
    width?: string
    height?: string
    data: number
    xAxisData?: any[]
  }>(),
  {
    width: '100%',
    height: '380px'
    // data: () => [],
    // xAxisData: () => []
  }
)

// 气温仪表盘配置项
const option = {
  title: {
    text: props.title
  },
  series: [
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 60,
      splitNumber: 12,
      itemStyle: {
        color: '#FFAB91'
      },
      progress: {
        show: true,
        width: 30
      },
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 30
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#999'
        }
      },
      axisLabel: {
        distance: -20,
        color: '#999',
        fontSize: 20
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '-15%'],
        fontSize: 60,
        fontWeight: 'bolder',
        formatter: '{value} °C',
        color: 'inherit'
      },
      data: [
        {
          value: props.data
        }
      ]
    },
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 60,
      itemStyle: {
        color: '#FD7347'
      },
      progress: {
        show: true,
        width: 8
      },
      pointer: {
        show: true
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      },
      splitLine: {
        show: true
      },
      axisLabel: {
        show: true
      },
      detail: {
        show: true
      },
      data: [
        {
          value: 38
        }
      ]
    }
  ]
}

const { chartRef } = useCharts({
  props,
  option
})
</script>

<template>
  <el-card shadow="hover">
    <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
  </el-card>
</template>

<style lang="scss" scoped></style>
