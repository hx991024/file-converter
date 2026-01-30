import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/image-converter',
      },
      {
        path: 'image-converter',
        name: 'ImageConverter',
        component: () => import('@/views/image-converter/index.vue'),
        meta: {
          title: '图片转换',
        },
      },
      {
        path: 'json-converter',
        name: 'JsonConverter',
        component: () => import('@/views/json-converter/index.vue'),
        meta: {
          title: 'JSON转换',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
