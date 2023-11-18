import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
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
    },

    // 博客阅读页
    {
        path: '/blog/read',
        name: 'blogRead',
        component: () => import(/* webpackChunkName: "about" */ '../pages/blogReadPage.vue')
    },
    // 博客阅读页
    {
        path: '/blog/read/:id',
        name: 'blogRead1',
        component: () => import(/* webpackChunkName: "about" */ '../pages/blogReadPage.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
