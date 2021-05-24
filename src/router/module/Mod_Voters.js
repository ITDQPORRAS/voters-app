/** When your routing table is too long, you can split it into small modules**/
import Layout from 'layouts/MainLayout.vue';

const Mod_voters = {
    path: '/WareHouse',
    component: Layout,
    name: '/WareHouse',
    meta: {
        title: 'WareHouse',
        icon: 'museum',
        open: true
    },
    children: [{
            path: '/Transactions',
            component: () =>
                import ('@/pages/'),
            name: '/Transaction',
            meta: {
                title: 'Transactions',
                icon: 'local_mall',
                open: true
            },
            children: [

                {
                    path: '/Transactions/GroupSetup',
                    component: () =>
                        import ('pages/Transaction/GroupSetup'),
                    name: 'Group Setup',
                    meta: { title: 'Group Setup', icon: 'post_add', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Transactions/LeaderSetup',
                    component: () =>
                        import ('pages/Transaction/LeaderSetup'),
                    name: '/LeaderSetup',
                    meta: { title: 'Leader Setup', icon: 'rule', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Transactions/ConfirmMember',
                    component: () =>
                        import ('pages/Transaction/ConfirmMember'),
                    name: '/Confirm Member',
                    meta: { title: 'Confirm Member', icon: 'rule', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Transactions/Watchers',
                    component: () =>
                        import ('pages/Transaction/Watchers'),
                    name: '/Watchers',
                    meta: { title: 'Watchers', icon: 'rule', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Transactions/Counting',
                    component: () =>
                        import ('pages/Transaction/Counting'),
                    name: '/Counting',
                    meta: { title: 'Counting', icon: 'rule', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Transactions/Tally',
                    component: () =>
                        import ('pages/Transaction/Tally'),
                    name: '/Tally',
                    meta: { title: 'Tally', icon: 'rule', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Transactions/SMS',
                    component: () =>
                        import ('pages/Transaction/SMS'),
                    name: '/SMS',
                    meta: { title: 'SMS', icon: 'rule', requiresAuth: true, access: ['initiate'] },
                },
            ],
        },
        {
            path: '/Reports',
            component: () =>
                import ('@/pages/'),
            name: '/Reports',
            meta: { title: 'Reports', icon: 'receipt_long' },
            children: [{
                    path: '/Reports/voterList',
                    component: () =>
                        import ('pages/Reports/voterList'),
                    name: 'voterList',
                    meta: { title: 'Voter List ', icon: 'store', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Reports/affiliate',
                    component: () =>
                        import ('pages/Reports/affiliate'),
                    name: 'affiliate',
                    meta: { title: 'Affiliate', icon: 'list_alt', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Reports/leaderList',
                    component: () =>
                        import ('pages/Reports/leaderList'),
                    name: 'leaderList',
                    meta: { title: 'Leader List', icon: 'receipt_long', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Reports/LeaderCount',
                    component: () =>
                        import ('pages/Reports/LeaderCount'),
                    name: 'LeaderCount',
                    meta: { title: 'Leader Count', icon: 'receipt_long', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Reports/SummaryVoter',
                    component: () =>
                        import ('pages/Reports/SummaryVoter'),
                    name: 'Summary Voter',
                    meta: { title: 'Summary Voter', icon: 'receipt_long', requiresAuth: true, access: ['initiate'] },
                },
            ],
        },
        {
            path: '/Admin',
            component: () =>
                import ('@/pages/'),
            name: '/Admin',
            meta: { title: 'Settings', icon: 'miscellaneous_services' },
            children: [

                {
                    path: '/UserAccess',
                    component: () =>
                        import ('pages/Admin/UserAccess'),
                    name: '/UserAccess',
                    meta: { title: 'User Access', icon: 'lock', requiresAuth: true, access: ['initiate'] },
                },

                {
                    path: '/User',
                    component: () =>
                        import ('pages/Admin/User'),
                    name: '/User',
                    meta: { title: 'User', icon: 'how_to_reg', requiresAuth: true, access: ['initiate'] },
                },
            ],
        },
    ],
}
export default Mod_voters;