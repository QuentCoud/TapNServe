<template>
  <div>
    <div class="mt-40">
      Commande #{{uid}}
    </div>

    <div class="flex flex-col items-center justify-center mt-12">
      <div v-for="i in 4" class="flex flex-col items-center">
        {{i}}
        <div class="w-6 h-6 rounded-full" :class="[i-1 > commande.status ? 'bg-gray-300' : 'bg-green-300']"></div>
        <div class="h-12 w-0.5" :class="[i-1 >= commande.status ? 'bg-gray-300' : 'bg-green-300']"></div>
      </div>
      <img src="/rest.png" class="w-28 h-28 text-gray-400" alt="hein" />
    </div>

    <div class="mx-16 mt-2 button" @click="showCommande">
      Voir la commande
    </div>

    <modal-default v-model="shoowComm">
      <div class="w-[20rem] max-h-[40rem]">
        <div class="text-xl font-medium">
          Commande
        </div>

        <div class="divider" />

        <div class="mt-2 mb-12">
          <div class="mt-8 mx-8 p-2 rounded-2xl bg-gray-200 flex max-h-[27rem] overflow-auto thin-scroll flex-col gap-2">
            <div v-for="item in commande.panier" class="flex bg-gray-100 justify-center rounded p-1 thin-scroll">
              <div class="flex flex-col justify-start ml-4 mt-2">
                <div class="flex justify-between items-center font-bold text-xl mr-4">
                  <div>{{ item.name }}</div>
                  <div>{{ item.prix }}€</div>
                </div>

                <div class="text-start mt-2 text-xs">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal-default>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import ModalDefault from "@/components/components/modalDefault.vue";

const commande = ref({})
const shoowComm = ref(false)
const route = useRoute()
const router = useRouter()
const uid = ref(0)

onMounted(() => {
  uid.value = route.params.uid
  updateStatus()
  setInterval(updateStatus, 1000)
})

function showCommande() {
  shoowComm.value = true
}

function updateStatus() {
  const panier = localStorage.getItem('panier')
  const id = route.params.uid

  commande.value = JSON.parse(panier).find((val) => val.id === parseInt(id))

  if (!commande.value) router.push({name: 'error'})
}

const getStatusCommand = computed(() => {
        switch (commande.value.status) {
          case 0:
            return 'En attente de validation'
          case 1:
            return 'En attente de préparation'
          case 2:
            return 'En cours de préparation'
          case 3:
            return 'Votre commande est fini'
        }
})
</script>

<style scoped>

</style>