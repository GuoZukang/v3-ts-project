import { markRaw, nextTick, onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

export interface ParamsType {
  props: any
  option: any
}

export const useCharts = (params: ParamsType) => {
  const { props, option } = params

  // 图表ref
  const chartRef = ref<HTMLElement | null | undefined>() // dom

  const nvll = ref(['', null, undefined])

  const chart = ref<any>() // echarts实例对象

  onMounted(() => {
    // init()
    // 监听浏览器的变化
    window.addEventListener('resize', echartsResizeFun)
  })

  // 当使用了keep-alive页面缓存组件时, 每次从缓存中重新插入时, 重置图表自适应
  onActivated(() => {
    chart.value && echartsResizeFun()
  })

  // 监听父组件图标的数据一主题的切换,如果发生变化,则让图标重新渲染
  watch(
    () => [props.data, props.theme],
    () => {
      nextTick(() => {
        init()
      })
    },
    {
      deep: true,
      immediate: true
    }
  )

  // 初始化渲染图标
  const init = () => {
    // 当echarts的实例对象已经创建过的话, 那么就销毁,echarts的实例对象
    // if (nvll.value.indexOf(chart.value) !== -1) chart.value.dispose()

    if (!nvll.value.includes(chart.value)) chart.value.dispose()

    // 2. 进行初始化

    chart.value = markRaw(echarts.init(chartRef.value, props.theme))
    // 3. 定义图标的配置项

    // 4. 使用刚指定的配置项和数据显示图表
    chart.value.setOption(option)
  }

  // 图标自适应
  const echartsResizeFun = () => {
    chart.value && chart.value.resize()
  }

  // 监听组件的销毁
  onBeforeUnmount(() => {
    window.removeEventListener('resize', echartsResizeFun)
    if (chart.value) {
      chart.value.dispose()
      chart.value = null
    }
  })

  return {
    chartRef,
    echartsResizeFun,
    chart,
    init
  }
}
