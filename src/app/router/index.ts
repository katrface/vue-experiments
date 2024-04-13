import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/TodoList.vue')
    },
    {
      path: '/todo-list',
      component: () => import('@/pages/TodoList.vue'),
      children: [
        {
          path: '',
          name: 'todo-list',
          component: () => import('@/pages/TodoPage.vue')
        },
        {
          path: 'create',
          name: 'todo-list-create',
          component: () => import('@/pages/TodoDetails/TodoDetails.vue')
        },
        {
          path: ':id(\\d+)',
          name: 'todo-list-details',
          props: ({ params }) => ({ id: Number.parseInt(params.id as string) }),
          component: () => import('@/pages/TodoDetails/TodoDetails.vue')
        },
        {
          path: 'history',
          name: 'todo-list-history',
          component: () => import('@/pages/TodoPage.vue')
        },
        {
          path: 'settings',
          name: 'todo-list-settings',
          component: () => import('@/pages/TodoPage.vue')
        }
      ]
    },

    {
      path: '/email',
      name: 'email',
      component: () => import('@/pages/TodoPage.vue')
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('@/pages/TodoPage.vue')
    }
  ]
})
export default router
