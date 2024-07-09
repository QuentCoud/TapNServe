<template>
  <div>
    <div class="mt-40">
      Commande #{{uid}}
    </div>

    <div>
      Status: {{ getStatusCommand }}
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
          case 4:
            return 'fini'
        }
})
</script>

<style scoped>

</style>