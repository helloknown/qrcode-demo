import type { RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/decode',
    name: 'Decode',
    component: () => import('@/views/decode/index.vue'),
    meta: {
      title: '二维码解码'
    }
  },
]

export default constantRoutes
