// 服务端返回的数据类型
export type DataType<T = any> = {
  code: number
  message: string
  data: T
}
