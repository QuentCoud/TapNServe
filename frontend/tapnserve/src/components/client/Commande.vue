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
  }
  </script>
  
  <style scoped>
  /* Votre style ici */
  </style>
  