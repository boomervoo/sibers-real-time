import { createRouter, createWebHistory } from 'vue-router'
import { RouteName } from '../utils/type/enum.type'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: RouteName.AUTH,
      component: () => import('@/views/auth.vue'),
    },
    {
      path: '/chats',
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: '/chats',
          name: RouteName.CHATS,
          component: () => import('@/views/index.vue'),
        },
        {
          name: RouteName.CHAT,
          path: '/chat/:id',
          component: () => import('@/views/Chat.vue'),
          props: true,
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')

  if (!username && to.path !== '/auth') {
    next(RouteName.AUTH)
  } else if (username && to.path === '/auth') {
    next(RouteName.CHATS)
  } else {
    next()
  }
})

export default router
