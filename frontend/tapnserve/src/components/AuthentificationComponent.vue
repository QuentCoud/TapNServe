<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Nom d'utilisateur ou Email</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <CustomButton :text="'Se connecter'" :width="'100%'" @click="handleSubmit" />
      </div>
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
      username: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      // Connexion vers la bonne page en fonction du rôle utilisateur.
      this.$router.push('/client');
    }
  }
};
</script>

