import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: 'recommend',
        },
        {
            path: '/recommend',
            component: () => import('@/views/Recommend.vue'),
        },
        {
            path: '/top-list',
            component: () => import('@/views/TopList.vue'),
        },
        {
            path: '/singer',
            component: () => import('@/views/Singer.vue'),
            children: [
                {
                    // 路径参数
                    path: ':id',
                    component: () => import('@/views/SingerDetail.vue'),
                },
            ],
        },
        {
            path: '/search',
            component: () => import('@/views/Search.vue'),
        },
    ],
})

export default router
