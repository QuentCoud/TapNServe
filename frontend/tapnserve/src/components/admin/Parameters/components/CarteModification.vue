<template>
  <div>
    <div class="text-3xl font-medium text-center w-full mt-4">
      Modification de la carte
    </div>

    <div class="divider"></div>

    <div>
      <div class="flex justify-center items-center gap-x-4">
        <div v-for="categ in Object.keys(carte?.carte ?? {})"
             class="border rounded border-solid border-gray-200 p-2 hover:bg-gray-100 cursor-pointer relative"
             :class="{'bg-gray-100': currCateg === categ}"
             @click="currCateg=categ"
        >
          <div class="absolute w-4 h-4 bg-red-500 text-white rounded-full right-0 -mt-4 cursor-pointer flex items-center justify-center"
               @click="deleteCateg(categ)"
          >
            -
          </div>
          {{categ}}
        </div>

        <plus-circle-outlined class="w-9 hover:bg-gray-100 rounded-full p-0.5 cursor-pointer" @click="openAddCatgeg" />
      </div>
    </div>

    <div class="divider"></div>

    <div class="w-fit mx-auto flex flex-col gap-y-4 max-h-[33rem] overflow-auto thin-scroll">
      <div v-for="(item) in getItem" class="flex bg-gray-100 justify-center rounded-xl p-1 relative ">
        <div class="absolute w-4 h-4 bg-red-500 text-white rounded-full right-0 -mt-2 cursor-pointer flex items-center justify-center"
          @click="deletePlat(item)"
        >
          -
        </div>
        <img :src="'/' + item.image" alt="image plat" class="w-32 rounded-xl" />

        <div class="flex flex-col justify-start ml-4 mt-2">
          <div class="flex justify-between items-center font-bold text-xl mr-4">
            <div>{{ item.name }}</div>
            <div>{{ item.prix }}€</div>
          </div>

          <div class="text-start mt-2 text-xs">{{ item.description }}</div>
        </div>
      </div>
    </div>

    <div>
      <div class="button w-[10rem] mx-auto mt-4" @click="openAddPlat">ajouter</div>
    </div>

    <modal-default v-model="showAddCateg">
      <div class="w-[30rem] p-6">
        <div class="text-xl font-medium">Ajout d'une catégorie</div>

        <div class="divider"></div>

        <div class="flex flex-col ml-8 mt-4 items-start">
          <div class="text-xs text-gray-500 text-start">Nom de la catégorie</div>

          <input v-model="categName" class="input"/>
        </div>


        <div class="button w-[10rem] mx-auto mt-6" @click="addCateg">Valider</div>
      </div>
    </modal-default>

    <modal-default v-model="showAddPlat">
      <div class="w-[30rem] p-6">
        <div class="text-xl font-medium">Ajout d'un plat à {{currCateg}}</div>

        <div class="divider"></div>

        <div class="flex flex-col ml-8 mt-4 items-start">
          <div class="text-xs text-gray-400 text-start">Nom du plat</div>
          <input v-model="plat.name" class="input"/>

          <div class="text-xs text-gray-400 text-start mt-4">Prix du plat</div>
          <input v-model="plat.prix" type="number" class="input"/>

          <div class="text-xs text-gray-400 text-start mt-4">Image du plat</div>
          <input type="file" accept="image/png, image/jpeg" class="input" @change="onFileChange"/>

          <div class="text-xs text-gray-400 text-start mt-4">Description du plat</div>
          <textarea v-model="plat.description" class="input w-full "/>
        </div>

        <div class="mt-6">
          <div class="text-red-500 text-xs" v-if="error">Vous devez remplir tout les champs</div>

          <div class="button w-[10rem] mx-auto" @click="addPlat">Valider</div>
        </div>
      </div>
    </modal-default>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import PlusOutlined from "@/components/components/icons/plusOutlined.vue";
import PlusCircleOutlined from "@/components/components/icons/plusCircleOutlined.vue";
import ModalDefault from "@/components/components/modalDefault.vue";
import MinusOutlined from "@/components/components/icons/minusOutlined.vue";

const carte = ref([])
const currCateg = ref('')
const categName = ref('')
const showAddCateg = ref(false );
const showAddPlat = ref(false );
const error = ref(false );
const plat = ref({
  name: '',
  description: '',
  prix: 0,
  image: ''
})

const store = useStore();
const restau = ref("")

onMounted(() => {
  restau.value = store.getters['user/getUser'].restau

  const carteTemp = localStorage.getItem('carte'+restau.value)

  if (carteTemp) {
    carte.value = JSON.parse(carteTemp)

    if (Object.keys(carte.value.carte).length > 0) {
      currCateg.value = Object.keys(carte.value.carte)[0]
    }
  }
})

function onFileChange(event) {
  const file = event.target.files[0];
  plat.value.image = file.name;
}

function openAddCatgeg() {
  showAddCateg.value = true
}

function openAddPlat() {
  showAddPlat.value = true
}

function addPlat()  {
  if (plat.value.name !== '' &&
      plat.value.description !== '' &&
      plat.value.prix !== 0 && plat.value.prix !== "" &&
      plat.value.image !== '') {

    plat.value.id = Math.round(Math.random() * 10000)
    carte.value.carte[currCateg.value].push(plat.value)

    plat.value = {
      name: '',
      prix: 0,
      description: '',
      image: ''
    }

    showAddPlat.value = false;
    error.value = false;
  } else {
    error.value = true
  }
}

function deletePlat(plat) {
  carte.value.carte[currCateg.value] = carte.value.carte[currCateg.value].filter((val) => val.id !== plat.id)
}

function deleteCateg(categ) {
  delete carte.value.carte[categ]
}

function addCateg() {
  if (categName.value !== '') {
    carte.value.carte[categName.value] = []
    showAddCateg.value = false
    error.value = false
    categName.value = '';
  } else {
    error.value = true
  }
}

const getItem = computed(() => {
  if (currCateg.value !== '') {
    return carte?.value?.carte[currCateg.value] ?? []
  }
  return []
})

watch(carte, () => {
  localStorage.setItem('carte'+restau.value, JSON.stringify(carte.value))
}, {deep: true})
</script>

<style scoped>

</style>