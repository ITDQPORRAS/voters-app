const routes = [{
        path: '/',
        name: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [
            { path: '/', component: () =>
                    import ('layouts/home') },
        ],
        hidden: true,
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [
            { path: '/home', component: () =>
                    import ('layouts/home') },
        ],
        hidden: true,
    },
    {
        path: '/login',
        title: 'login',
        name: 'Login',
        component: () =>
            import ('layouts/login'),
        // children: [
        //   { path: '/login', component: () => import('layouts/login') },
        // ],
        hidden: true,
    },
    {
        path: '/reset-password',
        title: 'Reset Password',
        name: 'reset-password-form',
        component: () =>
            import ('layouts/reset'),
        // children: [
        //   { path: '/login', component: () => import('layouts/login') },
        // ],
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
]
export default routes