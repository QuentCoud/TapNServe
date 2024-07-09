<template>
  <div>
    <div>
      <nav>
        <router-link to="/admin/waiter" class="nav-link" :class="{ active: isActive('/admin/waiter') }">Serveur</router-link>
        <router-link to="/admin/kitchen" class="nav-link" :class="{ active: isActive('/admin/kitchen') }">Cuisine</router-link>

        <div class="absolute right-5 top-5 flex">
          <parameter-outlined class="hover:bg-gray-300 rounded-full p-1 w-8 h-8 mr-2 cursor-pointer" @click="showParameters=true" />
          <exit-outlined class="text-red-600 hover:bg-gray-300 rounded-full w-8 h-8 p-1 cursor-pointer" @click="logout" />
        </div>
      </nav>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router';
import {useStore} from "vuex";
import ExitOutlined from "@/components/components/icons/exitOutlined.vue";
import ParameterOutlined from "@/components/components/icons/parameterOutlined.vue";
import {ref} from "vue";

const route = useRoute();
const router = useRouter();
const user = useStore().getters['user/getUser']
const store = useStore();

const showParameters = ref(false);

function logout() {
  store.dispatch('user/logout').then((res) => {})

  router.push({name: 'auth'})
}

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
