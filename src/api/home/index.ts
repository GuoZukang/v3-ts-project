import request from '@/utils/request'
import type { CategoryResType, StatisticsResType, TopResType } from '@/api/home/types'

// 营业数据统计
export const getStatisticsApi = () => {
  return request<StatisticsResType>('/home/statistics', 'GET')
}

// 分类销售统计数据
export const getCategorySalesApi = () => {
  return request<CategoryResType[]>('/home/categoryData', 'GET')
}

// 获取会员消费top数据
export const getTopApi = () => {
  return request<TopResType[]>('/home/member/top10', 'GET')
}
