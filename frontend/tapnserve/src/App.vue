<template>
  <div id="app">
    <nav v-if="isAuthenticationComponent">
      <RouterLink to="/">CONNEXION</RouterLink><br>
      <RouterLink to="/client/"> CLIENT</RouterLink>
    </nav>
    <main>
      <div class="view-app">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticationComponent: false,
    };
  },
  beforeMount() {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.view-app {
  flex-grow: 1;
  margin: 0 2 rem;
}
</style>
