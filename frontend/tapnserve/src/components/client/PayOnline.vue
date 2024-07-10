<template>
  <div class="flex justify-center flex-col">
    <h1>Payment en ligne</h1>
    Intégration de stripe

    <p>
      Redirection dans {{ redirect }} secondes
    </p>
  </div>
  </template>
  
  <script>
  export default {
    name: "PayOnline",
    data() {
      return {
        redirect: 5,
        data: this.$route.query // data from query
      }
    },
    mounted() {
      const interval = setInterval(() => {
        this.redirect--
        if (this.redirect === 0) {
          clearInterval(interval)

          const decodedData = JSON.parse(atob(this.data.data))

          this.$store.dispatch('restaurant/sendCommand',
            {...decodedData}
          ).then((res) => {
            localStorage.setItem('currentCommande', res)
            localStorage.setItem('panier'+decodedData.restau.name, JSON.stringify([]))

            this.$router.push({name: 'commandStep', params: {uid: res}})
          })
        }
      }, 1000)
    }
  }
  </script>
  
  <style scoped>
  
  </style>