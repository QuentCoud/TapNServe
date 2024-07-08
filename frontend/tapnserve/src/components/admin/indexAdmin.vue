<template>
  <div>
    <nav>
      <router-link to="/admin/waiter" class="nav-link" :class="{ active: isActive('/admin/waiter') }">Serveur</router-link>
      <router-link to="/admin/kitchen" class="nav-link" :class="{ active: isActive('/admin/kitchen') }">Cuisine</router-link>
    </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #f8f9fa;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.nav-link {
  padding: 10px 20px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  color: black;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: transparent;
  bottom: -5px;
  left: 0;
  transition: background-color 0.3s;
}

.nav-link:hover::after {
  background-color: green;
}

.nav-link.active {
  color: green;
}

.content {
  padding: 20px;
}
</style>
