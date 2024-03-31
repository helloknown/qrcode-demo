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
      title: '解码'
    }
  },
  {
    path: '/document',
    name: 'Document',
    component: () => import('@/views/document/index.vue'),
    meta: {
      title: 'QR码知识'
    }
  },
]

export default constantRoutes
