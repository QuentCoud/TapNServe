import { createRouter, createWebHistory } from 'vue-router'

import AuthentificationComponent from '../components/AuthentificationComponent.vue'
import ClientCommande from '../components/client/ClientCommande.vue'
import ErrorView from '../components/client/Error.vue'
import IndexAdmin from '@/components/admin/indexAdmin.vue'
import IndexKitchen from '@/components/admin/kitchen/KitchenCommande.vue'
import IndexWaiter from '@/components/admin/waiter/WaiterCommande.vue'
import store from '@/store';

const routes = [
    { path: '/', component: AuthentificationComponent },
    { path: '/order/error', component: ErrorView, name: 'error' },
    { path: '/order/:uid', component: ClientCommande },
    {
        path: '/admin',
        component: IndexAdmin,
        name: 'admin'
    },
    {
        path: '/admin/kitchen',
        component: IndexKitchen,
        name: 'kitchen'
    },
    {
        path: '/admin/waiter',
        component: IndexWaiter,
        name: 'waiter'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    if (to.fullPath.includes('admin')) {
        if (!store.getters['user/isAuthenticated']) {
            // router.push({path: '/'})
        }
    } else if (to.fullPath.includes('order')) {
        // if (store.dispatch('user/isAuthenticated')) {
        //     router.push({path: '/'})
        // }
    }
});

export default router
