import Vue from 'vue';
import VueRouter from 'vue-router'
// import Layout from '@/layouts/MainLayout';
Vue.use(VueRouter);


// import Mod_QR from './module/Mod_QR';
import Mod_Voters from './module/Mod_Voters';


export const constantRoutes = [

    {
        path: '/',
        name: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
            path: '/',
            component: () =>
                import ('layouts/home')
        }, ],
        hidden: true,
    },
    {
        path: '/authcallback',
        name: '/authcallback',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
            path: '/',
            component: () =>
                import ('layouts/home')
        }, ],
        hidden: true,
    },

    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
            path: '/home',
            component: () =>
                import ('layouts/home')
        }, ],
        hidden: true,
    },
    {
        path: '/login',
        title: 'login',
        name: 'Login',
        component: () =>
            import ('layouts/login'),

        hidden: true,
    },
    {
        path: '/profile',
        title: 'profile',
        name: 'profile',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
            path: '/',
            component: () =>
                import ('layouts/profile')
        }]
    },
    {
        path: '/reset-password',
        title: 'Reset Password',
        name: 'reset-password-form',
        component: () =>
            import ('layouts/reset'),

        hidden: true,
        props: true
    },

    {
        path: '/redirect',
        title: 'redirect',
        component: () =>
            import ('layouts/blank'),
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () =>
                import ('layouts/redirect'),
        }, ],
    },
    {
        path: '*',
        component: () =>
            import ('pages/Error404.vue'),
        hidden: true,
    }
];

export const asyncRoutes = [
    Mod_Voters
];

export default function() {
    asyncRoutes.forEach(element => {
        constantRoutes.push(element)
    });
    const Router = new VueRouter({
        scrollBehavior: () => ({ x: 0, y: 0 }),
        routes: constantRoutes,
        // Leave these as they are and change in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        mode: process.env.VUE_ROUTER_MODE,
        base: process.env.VUE_ROUTER_BASE
    })

    return Router
}