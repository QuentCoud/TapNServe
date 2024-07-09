<template>
  <div>
    <h1>Historique</h1>
    <div class="table-section">
      <div class="table">
        <table>
          <colgroup>
              <col style="width: auto;">
              <col style="width: auto;">
              <col style="width: auto;">
              <col style="width: 20px;">
            </colgroup>
          <tbody>
            <tr v-for="(item, index) in table1" :key="index" @click="openModal(item, index)" class="item-clickable">
              <td>#{{ index + 1 }}</td>
              <td>Table {{ item.table }}</td>
              <td>{{ item.total }}€</td>
              <td>
                <button class="validate-button" @click.stop="openModal(item)">
                  <svg class="search-icon" viewBox="0 0 24 24">
                    <path d="M21.71,20.29,17.1,15.69a9,9,0,1,0-1.41,1.41l4.6,4.6a1,1,0,1,0,1.41-1.41ZM11,18A7,7,0,1,1,18,11,7,7,0,0,1,11,18Z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ModalComponent v-if="isModalOpen" :isDetails="true" :item="selectedItem" :index="selectedIndex" @close="isModalOpen = false" @validate="validate" />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { mdiCheck } from '@mdi/js';
import {useStore} from "vuex";
import ModalComponent from '../../../shared/OrderDetailsModal.vue';

const user = useStore().getters['user/getUser']

const table1 = reactive([]);

const isModalOpen = ref(false);
const selectedItem = ref(null);
const selectedIndex = ref(null);

const openModal = (item, index) => {
  selectedItem.value = item;
  selectedIndex.value = index;
  isModalOpen.value = true;
};

onMounted(() => {
  const paniers = localStorage.getItem('panier');
  if (paniers) {
    try {
      const items = JSON.parse(paniers);
      if (Array.isArray(items)) {
        const filteredItemsTab1 = items.filter(item => item.status === 4 && item.restau === user.restau);
        filteredItemsTab1.forEach(item => {
          table1.push(item);
        });
      }
    } catch (e) {
      console.error('Error parsing panier from localStorage', e);
    }
  }
});
</script>

<style scoped>
.table-section {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.table {
  border-radius: 10px;
  border: 2.5px solid green;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-height: 100px;
}

table {
  width: 100%;
  border-collapse: collapse;
  flex-grow: 1;
}

tbody {
  flex-grow: 1;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f8f9fa;
}

.item-clickable {
  cursor: pointer;
  max-height: 20px;
  background-color: #d3d3d3;
  border-radius: 10px;
  border: 1px solid #a0a0a0;
}

.item-clickable:hover {
  border-radius: 10px;
  background-color: #a0a0a0;
}

.validate-button {
  background-color: #a9a9a9;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-icon {
  width: 24px;
  height: 24px;
  fill: black;
}

.validate-button:hover {
  background-color: #d3d3d3;
}

</style>