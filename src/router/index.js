import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页' }
    },
    {
        path: '/category/:cate',
        name: 'category',
        component: () => import('../views/Home.vue'),
        meta: { title: '分类', params: 'cate' }
    },
    {
        path: '/search/:words',
        name: 'search',
        component: () => import('../views/Home.vue'),
        meta: { title: '搜索', params: 'words' }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue'),
        meta: { title: '关于' }
    },
    {
        path: '/friend',
        name: 'friend',
        component: () => import('../views/Friend.vue'),
        meta: { title: '友链' }
    },
    {
        path: '/article/:id',
        name: 'article',
        component: () => import('../views/Articles.vue'),
        meta: { title: '文章' }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: { title: '登录' },
        props: true
    },
    {
        path: '/edit',
        name: 'edit',
        component: () => import('../views/Edit.vue'),
        meta: { title: '编辑', requireAuth: true }
    }
]

const router = new VueRouter({
    mode: 'history',
    // 根据运行环境获取base
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    let title = 'Gblog'
    // 标题上显示
    // if (to.meta.params) {
    //     // 分类
    //     title = `${to.meta.title}:${to.params[to.meta.params] || ''} - ${title}`
    // } else {

    // }
    // 标题
    title = `${to.meta.title} - ${title}`
    document.title = title
    // 页面跳转过渡动画 ======================= *
    // if (to.path !== from.path) {
    //     store.dispatch('setLoading', true);
    // }
    if (to.meta.requireAuth) {
        if (window.sessionStorage.getItem('login')) {
            store.state.login = window.sessionStorage.getItem('login')
            next()
        } else {
            next({
                path: '/'
            })
        }
    } else {
        next();
    }
})
// 关闭页面跳转过渡动画 ======================= *
// router.afterEach((to, from) => {
//     // 最多延迟 关闭 loading
//     setTimeout(() => {
//         store.dispatch('setLoading', false);
//     }, 1500)
// })
export default router
