<template>
  <div>
    <div class="mt-40">
      Commande #{{uid}}
    </div>

    <div>
      <div v-if="getStatus < 4">
        Status: {{ getStatusCommand }}
      </div>

      <div class="mt-12">
        Merci pour votre commande !
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed} from "vue";

const uid = useRoute().params.uid

const getStatusCommand = computed(() => {
      const panier = localStorage.getItem('panier')
      const id = localStorage.getItem('currentCommande')

      const commande = JSON.parse(panier).find((val) => val.id === parseInt(id))

        switch (commande.status) {
          case 0:
            return 'en validation'
          case 1:
            return 'en attente de préparation'
          case 2:
            return 'en préparation'
          case 3:
            return 'va vous être servis'
          case 4:
            return ''
        }
})

const getStatus = computed(() => {
  const panier = localStorage.getItem('panier')
  const id = localStorage.getItem('currentCommande')

  const commande = JSON.parse(panier).find((val) => val.id === parseInt(id))

  return commande.status
})
</script>

<style scoped>

</style>