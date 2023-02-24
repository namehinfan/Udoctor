import { createRouter, createWebHistory } from 'vue-router'
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", component: () => import("@/views/Login/index.vue") },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: "/home",
      children: [
        { path: "/home", component: () => import("@/views/Home/index.vue") },
        {
          path: "/article",
          component: () => import("@/views/Article/index.vue"),
        },
        { path: "/notify", component: () => import("@/views/Notify/index.vue") },
        { path: "/user", component: () => import("@/views/User/index.vue") },
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    },
    
    
  ]
})

router.beforeEach(() => {
  // 💥 注意开启后，不会自动关闭
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done();
})

NProgress.configure({
  showSpinner: false,
})


export default router
