<template>
  <div>
    <h2>AAA{{ restaurant.name }}</h2>
    <p>This is the about page.</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
