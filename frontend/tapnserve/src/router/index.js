import { createRouter, createWebHistory } from 'vue-router';

import AuthentificationComponent from '../components/AuthentificationComponent.vue';
import ClientCommande from '../components/client/ClientCommande.vue';
import IndexAdmin from '@/components/admin/indexAdmin.vue';
import IndexKitchen from '@/components/admin/kitchen/KitchenCommande.vue';
import PayOnline from '@/components/client/PayOnline.vue';
import IndexWaiter from '@/components/admin/waiter/WaiterCommande.vue';
import ErrorView from '@/components/client/Error.vue';
import StepView from '@/components/client/StepAttente.vue';
import store from '@/store';

const routes = [
    { path: '/', component: AuthentificationComponent, name: 'auth' },
    { path: '/order/error', component: ErrorView, name: 'error' },
    { path: '/order/command/:uid', component: StepView, name: 'commandStep' },
    { path: '/order/:uid/:table', component: ClientCommande, name: 'order' },
    { path: '/payOnline', component: PayOnline, name: 'payOnline' },
    {
        path: '/admin',
        component: IndexAdmin,
        name: 'admin',
        children: [
            {
                path: 'kitchen',
                component: IndexKitchen,
                name: 'kitchen',
            },
            {
                path: 'waiter',
                component: IndexWaiter,
                name: 'waiter'
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    if (to.fullPath.includes('admin')) {
        if (localStorage.getItem('online')) {
            store.dispatch('user/checkAuth').then((res) => {
                if (!res) {
                    router.push({name: 'kitchen'})
                }
            })
        } else {
            router.push({path: '/'})
        }
    } else if (to.fullPath.includes('order')) {
        // if (store.dispatch('user/isAuthenticated')) {
        //     router.push({path: '/'})
        // }
    }
});

export default router;
