import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 动态路由
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      // 如果isBreadcrumb 为 false 的话, 标识不会把根路由数据放到面包屑导航
      isBreadcrumb: false
    },
    children: []
  }
]

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/401',
    name: 'NoPermission',
    component: () => import('@/views/error/401.vue'),
    meta: {
      title: '401页面',
      icon: 'ele-Warning',
      cache: true,
      hidden: false
    }
  },
  {
    path: '/:path(.*)*', // 404匹配其他路由地址
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '未找到此页面',
      cache: true,
      hidden: true
    }
  }
]

// 静态路由
const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...dynamicRoutes]
})

export default router


// {
//   path: '/home',
//     name: 'Home',
//   component: () => import('@/views/home/index.vue'),
//   meta: {
//   title: '首页',
//     icon: 'ele-House',
//     cache: true,
//     hidden: false
// }
// },
// {
//   path: '/system',
//     name: 'System',
//   redirect: '/system/menu',
//   meta: {
//   title: '系统管理',
//     icon: 'ele-Setting'
// },
//   children: [
//     {
//       path: '/system/menu',
//       name: 'SystemMenu',
//       component: () => import('@/views/system/menu/index.vue'),
//       meta: {
//         title: '菜单管理',
//         icon: 'ele-Menu',
//         cache: true,
//         hidden: false
//       }
//     },
//     {
//       path: '/system/role',
//       name: 'SystemRole',
//       component: () => import('@/views/system/role/index.vue'),
//       meta: {
//         title: '角色管理',
//         icon: 'ele-IceCream',
//         cache: true,
//         hidden: false
//       }
//     },
//     {
//       path: '/system/user',
//       name: 'SystemUser',
//       component: () => import('@/views/system/user/index.vue'),
//       meta: {
//         title: '用户管理',
//         icon: 'ele-User',
//         cache: true,
//         hidden: false
//       }
//     }
//   ]
// },
// {
//   path: '/goods',
//     name: 'Goods',
//   redirect: '/goods/list',
//   meta: {
//   title: '商品管理',
//     icon: 'ele-Goods',
//     cache: true,
//     hidden: false
// },
//   children: [
//     {
//       path: '/goods/list',
//       name: 'GoodsList',
//       component: () => import('@/views/goods/list.vue'),
//       meta: {
//         title: '商品列表',
//         icon: 'ele-GoodsFilled',
//         cache: true,
//         hidden: false
//       }
//     },
//     {
//       path: '/goods/category',
//       name: 'GoodsCategory',
//       component: () => import('@/views/goods/category.vue'),
//       meta: {
//         title: '商品分类',
//         icon: 'ele-Operation',
//         cache: true,
//         hidden: false
//       }
//     }
//   ]
// },
// {
//   path: '/usian',
//     name: 'Usian',
//   component: () => import('@/views/link/index.vue'),
//   meta: {
//   title: '积云官网',
//     icon: 'ele-Link',
//     cache: false,
//     hidden: false,
//     linkTo: 'https://www.usian.com' // 外链跳转地址
// }
// }
