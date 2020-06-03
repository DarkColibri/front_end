import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/associations',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/associations/Associations.page.vue') }]
  },
  {
    path: '/associations/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/associations/Associations.Add.page.vue') }]
  },
  {
    path: '/associations/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/associations/Associations.Add.page.vue') }]
  },
  {
    path: '/categories',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/categories/Categories.page.vue') }]
  },
  {
    path: '/categories/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/categories/Categories.Add.page.vue') }]
  },
  {
    path: '/categories/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/categories/Categories.Add.page.vue') }]
  },
  {
    path: '/threads',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/threads/Threads.page.vue') }]
  },
  {
    path: '/threads/add/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/threads/Threads.Add.page.vue') }]
  },
  {
    path: '/posts/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/posts/Index.vue') }]
  },
  {
    path: '/videos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/videos/Index.vue') }]
  },
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/users/Users.vue') }]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/authentication/LoginUser.vue') }]
  },
  {
    path: '/chat',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/chat/Chat.vue') }]
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/profile/Profile.vue') }]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
