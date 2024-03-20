<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const store = useLayoutConfigStore()

const Logo = defineAsyncComponent(() => import('./logo.vue'))
const VerticalMenu = defineAsyncComponent(() => import('./vertcialMenu.vue'))

const isCollapse = computed(() => {
  return store.isCollapse
})

// const list: MenuItemType[] = [
//   {
//     path: '/home',
//     name: 'Home',
//     redirect: null,
//     component: 'home/index.vue',
//     meta: {
//       title: '首页',
//       icon: 'ele-House',
//       cache: true,
//       hidden: false
//     },
//     children: []
//   },
//   {
//     path: '/system',
//     name: 'System',
//     redirect: '/system/menu',
//     meta: {
//       title: '系统管理',
//       icon: 'ele-Setting',
//       cache: true,
//       hidden: false
//     },
//     children: [
//       {
//         path: '/system/menu',
//         name: 'SystemMenu',
//         redirect: null,
//         component: 'system/menu/index.vue',
//         meta: {
//           title: '菜单管理',
//           icon: 'ele-Menu',
//           cache: false,
//           hidden: false
//         },
//         children: []
//       },
//       {
//         path: '/system/role',
//         name: 'SystemRole',
//         component: 'system/role/index.vue',
//         meta: {
//           title: '角色管理',
//           icon: 'ele-IceCream',
//           cache: true,
//           hidden: false
//         },
//         children: []
//       },
//       {
//         path: '/system/user',
//         name: 'SystemUser',
//         redirect: null,
//         component: 'system/user/index.vue',
//         meta: {
//           title: '用户管理',
//           icon: 'ele-User',
//           cache: true,
//           hidden: false
//         },
//         children: []
//       }
//     ]
//   },
//   {
//     path: '/goods',
//     name: 'Goods',
//     redirect: '/goods/list',
//     meta: {
//       title: '商品管理',
//       icon: 'ele-Goods',
//       cache: true,
//       hidden: false
//     },
//     children: [
//       {
//         path: '/goods/list',
//         name: 'GoodsList',
//         redirect: null,
//         component: 'goods/list.vue',
//         meta: {
//           title: '商品列表',
//           icon: 'ele-GoodsFilled',
//           cache: true,
//           hidden: false
//         },
//         children: []
//       },
//       {
//         path: '/goods/category',
//         name: 'GoodsCategory',
//         redirect: null,
//         component: 'goods/category.vue',
//         meta: {
//           title: '商品分类',
//           icon: 'ele-Operation',
//           cache: true,
//           hidden: false
//         },
//         children: []
//       }
//     ]
//   },
//   {
//     path: '/usian',
//     name: 'Usian',
//     redirect: null,
//     component: 'link/index.vue',
//     meta: {
//       title: '积云官网',
//       icon: 'ele-Link',
//       linkTo: 'https://www.usian.com',
//       cache: true,
//       hidden: false
//     },
//     children: []
//   },
//   {
//     path: '/401',
//     name: '401',
//     redirect: null,
//     component: 'error/401.vue',
//     meta: {
//       title: '401',
//       icon: 'ele-Link',
//       cache: true,
//       hidden: true
//     },
//     children: []
//   }
// ]

const menuList = computed(() => {
  // return filterMenuList(list)
  return filterMenuList(authStore.menuList)
  // return authStore.menuList
})

// 这个方法的作用主要是用来过滤出菜单中meta属性中hidden为false 的数据
const filterMenuList = (menuList) => {
  const deepTree = (menuList) => {
    const targetMenu = menuList.filter((item) => !item.meta?.hidden)
    targetMenu.forEach((item) => {
      if (item.children && item.children?.length > 0) {
        deepTree(item.children)
      }
    })
    return targetMenu
  }

  return deepTree(menuList)
}
</script>

<template>
  <!--左侧菜单区域-->
  <el-aside
    :class="isCollapse ? 'layout-aside-menu-60' : 'layout-aside-menu-200'"
    class="layout-aside"
  >
    <!--logo-->
    <Logo></Logo>
    <!--menu-->
    <VerticalMenu :data="menuList"></VerticalMenu>
  </el-aside>
</template>

<style lang="scss" scoped></style>
