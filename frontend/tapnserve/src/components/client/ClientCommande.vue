<template>
    <div>
      <h2>{{ restaurant.name }}</h2>
      <ProfileImage :path="'@/assets/logo.png'"/>
    </div>
  </template>
  
  <script>
  import ProfileImage from '../shared/ProfileImage.vue';
  export default {
    name: 'ClientCommande',
    components: {
      ProfileImage
    },
    data() {
    return {
      restaurant: {
        name: "BREW HOUSE"
      }
    };
  },
    beforeMount() {
      const id = this.$route
      console.log('ici', id)
    }
  }
  </script>
  
  <style scoped>
  /* Votre style ici */
  </style>
  