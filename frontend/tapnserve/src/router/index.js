import { createRouter, createWebHistory } from 'vue-router'

import AuthentificationComponent from '../components/AuthentificationComponent.vue'
import ClientCommande from '../components/client/Commande.vue'

const routes = [
    { path: '/', component: AuthentificationComponent },
    { path: '/client', component: ClientCommande },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
