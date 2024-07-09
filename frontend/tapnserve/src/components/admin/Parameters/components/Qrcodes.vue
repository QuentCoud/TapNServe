<template>
  <div class="h-full">
    <div class="h-full p-6 flex flex-col">
      <div class="h-[98%]">
        <div class="flex gap-2 flex-wrap">
          <div v-for="qr in qrs">
            <div class="border border-solid border-gray-200 w-fit px-12 py-4 cursor-pointer hover:bg-gray-100 rounded"
                 @click="openQr(qr)"
            >
              {{qr.name}}
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#497E7B] text-white cursor-pointer ripple mt-4 py-2 w-fit px-8 rounded-2xl mx-auto"
           @click="showmodal=true"
      >
        Ajouter une table
      </div>
    </div>

    <modal-default v-model='showmodal'>
      <div class="m-4 w-[20rem] flex items-start flex-col justify-start">
        <div class="text-center w-full text-2xl font-medium">Ajout d'une table</div>

        <div class="divider"></div>

        <div class=" mt-2 ml-4">
          <div class="text-xs text-start text-gray-500">Entrer le nom de la table</div>
          <input v-model="name" class="border border-gray-600 border-1 border-solid mt-1">
        </div>

        <div class="bg-[#497E7B] text-white cursor-pointer ripple mt-7 py-1 w-full px-4 rounded-2xl mx-auto"
             @click="sendNewTable"
        >
          Valider
        </div>
      </div>
    </modal-default>

    <modal-default v-model='showQr'>
      <div class="m-4 w-[50rem] flex items-start flex-col justify-start">
        <div class="text-center w-full text-2xl font-medium">Table #{{this.qr.name}}</div>
        <div class="divider"></div>
        <div class="w-full flex justify-center mt-2">
          <qrcode-vue :value="qr.url" level="L" :size="300" ></qrcode-vue>
        </div>

        <div class="bg-[#497E7B] text-white cursor-pointer ripple mt-4 py-1 w-1/2 px-4 rounded-2xl mx-auto"
             @click="visit"
        >
          Visiter
        </div>
      </div>
    </modal-default>
  </div>
</template>

<script>
import ModalDefault from "@/components/components/modalDefault.vue";
import QrcodeVue from 'qrcode.vue'

export default {
  name: "Qrcodes",
  components: {ModalDefault, QrcodeVue},
  data() {
    return {
      qrs: [],
      showmodal: false,
      name: "",
      restau: null,
      qr: {},
      showQr: false
    }
  },
  mounted() {
    this.restau = this.$store.getters['user/getUser'].restau

    if (this.restau) {
      this.getTable()
    }
  },
  methods: {
    getTable() {
      if (localStorage.getItem('table' +this.restau)) {
        this.qrs = JSON.parse(localStorage.getItem('table' +this.restau))
      }
    },
    sendNewTable() {
      const id = Math.round(Math.random() * 10000)

      const table = {
        url:'http://localhost:8080/order/'+this.restau+'/'+id,
        name: this.name,
        id:id
      }

      this.qrs.push(table)

      localStorage.setItem('table' +this.restau, JSON.stringify(this.qrs))
      this.showmodal = false;
      this.name = ''
    },
    openQr(val) {
      this.showQr = true;
      this.qr = val
    },
    visit() {
      this.$router.push({name: 'order', params: {uid: this.restau, table: this.qr.id}})
    }
  }
}
</script>

<style scoped>

</style>