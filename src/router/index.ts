import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import IndexPage from "../pages/IndexPage.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: IndexPage
  },
  {
    path: '/:category',
    component: IndexPage
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
