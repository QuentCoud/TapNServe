<template>
  <div class="mt-40 w-1/3 mx-auto">
    <h1>Connexion</h1>
    <form class="login-container mt-8" @submit.prevent="handleSubmit">
      <template v-if="!loading">
        <div class="form-group">
          <label for="username">Nom d'utilisateur ou Email</label>
          <input type="text" id="username" v-model="user.name" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="user.password" required>
        </div>

        <div class="form-group mt-12">
          <CustomButton :text="'Se connecter'" :width="'100%'" @click="handleSubmit" />
        </div>

        <div v-if="error" class="error">
          Une erreur est survenue
        </div>
      </template>

    </form>
  </div>
</template>

<script>
// Importation du composant bouton
import CustomButton from './shared/CustomButton.vue';

export default {
  name: "AuthentificationComponent",
  components: {
    CustomButton
  },
  data() {
    return {
      loading: false,
      error: false,
      user: {
        name: '',
        password: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;

      this.$store.dispatch('user/login', this.user).then((res) => {
        if (res) {
          this.$router.push({name: 'waiter'})
        } else {
          this.error = true
        }
      }).finally(() => {
        this.loading = false;
      })
    }
  },
};
</script>

<style scoped lang="scss">
  .error {
    width: 100%;
    text-align: center;
    color: red;
    margin: 1rem 0;
  }
  input {
    background-color: #E8F0FE;
  }
</style>

