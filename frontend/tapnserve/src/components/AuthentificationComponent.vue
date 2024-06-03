
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
        <input type="submit" value="Se connecter">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AuthentificationComponent",
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

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.login-container {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.login-container h2 {
  margin-bottom: 20px;
  text-align: center;
}

.login-container .form-group {
  margin-bottom: 15px;
}

.login-container .form-group label {
  display: block;
  margin-bottom: 5px;
}

.login-container .form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.login-container .form-group input[type="submit"] {
  background-color: #497E7B;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.login-container .form-group input[type="submit"]:hover {
  background-color: #497E7B;
}
</style>