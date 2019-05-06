import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/common/Home'
import GlobalUtil from '../utils/globalUtil';

Vue.use(Router)
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            redirect: '/dashboard',
            children:[
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('../views/page/dashboard/dashboard.vue')
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/page/Login.vue')
        },
        {
            path: '/404',
            name: '404',
            component: () => import('../views/page/404.vue')
        },
        {
            path: '/403',
            name: '403',
            component: () => import('../views/page/403.vue')
        }
    ]
})
