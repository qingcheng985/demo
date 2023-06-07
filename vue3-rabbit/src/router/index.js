import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/Login/index.vue'
import Category from "@/views/Category/index.vue"
import Home from '@/views/Home/index.vue'
import Layout from '@/views/Layout/index.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/main',
            name: 'main',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Layout,
            children: [
                {
                    path: 'category',
                    component: Category
                },
                {
                    path: 'home',
                    component: Home
                }
            ]
        }
    ]
})

export default router
