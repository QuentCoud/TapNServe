<template>
  <div class="flex h-screen pt-12">
    <div v-if="onSmartphone" class="flex flex-col items-center">
      <h2 class="flex justify-center">zae</h2>
      <ProfileImage :path="'@/assets/logo.png'" @click="showValidation = false;"/>
      <horizontal-menu :items="Object.keys(restau.carte ?? {})" v-model="menuItem" />

      <div class="mt-8 mx-8 p-2 rounded-2xl bg-gray-200 flex flex-col gap-y-2 overflow-auto mb-24 thin-scroll">
        <div v-for="item in restau.carte[menuItem]" class="flex bg-gray-100 justify-center rounded p-1">
          <img :src="'/' + item.image" alt="image plat" class="w-32 rounded-xl" />

          <div class="flex flex-col justify-start ml-4 mt-2">
            <div class="flex justify-between items-center font-bold text-xl mr-4">
              <div>{{ item.name }}</div>
              <div>{{ item.prix }}€</div>
            </div>

            <div class="text-start mt-2 text-xs">{{ item.description }}</div>

            <div class="flex gap-x-4 mt-2 ml-auto mr-4">
              <minus-outlined @click="minItem(item)" class="w-7 h-7 bg-gray-200 rounded-full p-1" />
              <div>{{ nbrItem(item.id) }}</div>
              <plus-outlined @click="addItem(item)" class="w-7 h-7 bg-gray-200 rounded-full p-1" />
            </div>
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div class="absolute w-full bottom-8 flex justify-center" v-if="!showValidation">
          <div class="bg-[#497E7B] text-white px-24 py-3 rounded-3xl whitespace-nowrap cursor-pointer" @click="openValidation">
            Payement ({{ Math.round(getTotalPrice * 100) / 100 }}€)
          </div>
        </div>
      </Transition>

      <Transition name="slide-up">
        <div v-if="showValidation" class="absolute top-0 left-0 right-0 bottom-0 z-20 overflow-hidden" @click.self="showValidation=false;">
          <div class="bg-white absolute bottom-0 w-full h-[40rem] rounded-t-2xl z-30">
            <div class="mt-12">
              <div>
                Commande
              </div>

              <div class="text-xs">
                total: ({{ Math.round(getTotalPrice * 100) / 100 }}€)
              </div>
            </div>

            <div class="h-0.5 bg-gray-300 mx-12 mt-2"></div>

            <div v-if="panier.length > 0" >
              <div class="mt-8 mx-8 p-2 rounded-2xl bg-gray-200 flex max-h-[27rem] overflow-auto thin-scroll flex-col gap-y-2">
                <div v-for="item in panier" class="flex bg-gray-100 justify-center rounded p-1 thin-scroll">
                  <img :src="'/' + item.image" alt="image plat" class="w-32 rounded-xl" />

                  <div class="flex flex-col justify-start ml-4 mt-2">
                    <div class="flex justify-between items-center font-bold text-xl mr-4">
                      <div>{{ item.name }}</div>
                      <div>{{ item.prix }}€</div>
                    </div>

                    <div class="text-start mt-2 text-xs">{{ item.description }}</div>

                    <div class="flex gap-x-4 mt-2 ml-auto mr-4">
                      <minus-outlined @click="minItem(item)" class="w-7 h-7 bg-gray-200 rounded-full p-1" />
                      <div>{{ nbrItem(item.id) }}</div>
                      <plus-outlined @click="addItem(item)" class="w-7 h-7 bg-gray-200 rounded-full p-1" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-[#497E7B] text-white px-8 py-2 rounded-3xl whitespace-nowrap cursor-pointer mx-24 mt-2" @click="validate">
                Valider
              </div>
            </div>

            <div v-else class="text-center mt-24">
              Panier vide
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div v-else>
      <div class="w-screen text-bold text-base text-gray-400 text-center my-auto">
        You need to be on smartphone
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import ProfileImage from '../shared/ProfileImage.vue';
  import HorizontalMenu from "@/components/components/HorizontalMenu.vue";
  import PlusOutlined from "@/components/components/icons/plusOutlined.vue";
  import MinusOutlined from "@/components/components/icons/minusOutlined.vue";
  export default {
    name: 'ClientCommande',
    components: {
      MinusOutlined,
      PlusOutlined,
      HorizontalMenu,
      ProfileImage
    },
    data() {
      return {
        loading: true,
        restau: {},
        panier: [],
        onSmartphone: false,
        menuItem: "",
        showValidation: false
      };
    },
    computed: {
      getTotalPrice() {
        return this.panier?.reduce((acc, val) => (val.prix * val.amount) + acc, 0) ?? 0
      },
    },
    methods: {
      initPanier() {
        const val = localStorage.getItem('panier'+this.restau.name)

        if (val) {
          this.panier = JSON.parse(val)
        }
      },
      openValidation() {
        this.showValidation = true
      },
      smartphoneTest() {
        this.onSmartphone = window.innerWidth < 575
      },
      nbrItem(id) {
        return this.panier?.find((val) => val.id === id)?.amount ?? 0
      },
      savePanier() {
        localStorage.setItem('panier'+this.restau.name, JSON.stringify(this.panier))
      },
      addItem(item) {
        const pan = this.panier.find((val) => val.id === item.id)

        if (pan) {
          pan.amount += 1
        } else {
          this.panier.push({...item, amount: 1})
        }

        this.savePanier();
      },
      minItem(item) {
        const pan = this.panier.find((val) => val.id === item.id)

        if (pan && pan.amount > 1) {
          pan.amount -= 1
        } else {
          this.panier.splice(this.panier.indexOf((val) => val.id === item.id), 1)
        }

        this.savePanier();
      },
      validate() {
        this.showValidation = false;
        this.$store.dispatch('restaurant/sendCommand', {panier: this.panier, restau: this.$route.params.uid}).then((res) => {
          localStorage.setItem('currentCommande', res)
          localStorage.setItem('panier'+this.restau.name, JSON.stringify([]))

          setTimeout(() => {
            this.$router.push({name: 'commandStep', params: {uid: res}})
          }, 1000)
        })

      }
    },
    mounted() {
      const id = this.$route.params.uid
      this.$store.dispatch('restaurant/getRestaurant', {id: id}).then((res) => {
        if (res) {
          this.restau = res
          setInterval(this.smartphoneTest, 100);
          this.initPanier()
        } else {
          this.$router.push({name: 'error'})
        }
      })
    }
  }
  </script>
  
  <style scoped>

  </style>
  