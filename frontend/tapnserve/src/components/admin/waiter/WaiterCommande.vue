<template>
  <div>
    <h1>Commandes</h1>
    <div class="tables-container">
      <div class="table-section">
        <h2>À valider</h2>
        <div class="table">
          <table>
            <tbody>
              <tr v-for="(item, index) in table1" :key="index" @click="openModal(item)">
                <td>#{{ index + 1 }}</td>
                <td>{{ item.tableNumber }}</td>
                <td>{{ item.price }}</td>
                <td><button @click.stop="moveToTable2(index)">Valider</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="table-section">
        <h2>À servir</h2>
        <div class="table">
          <table>
            <tbody>
              <tr v-for="(item, index) in table2" :key="index" @click="openModal(item)">
                <td>{{ index + 1 }}</td>
                <td>{{ item.tableNumber }}</td>
                <td>{{ item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ModalComponent v-if="isModalOpen" :item="selectedItem" @close="isModalOpen = false" @validate="validateItem" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import ModalComponent from './partials/OrderDetailsModal.vue';

const table1 = reactive([
  { tableNumber: '1', price: 20 },
  { tableNumber: '2', price: 30 },
  { tableNumber: '3', price: 40 }
]);

const table2 = reactive([]);

const isModalOpen = ref(false);
const selectedItem = ref(null);

const moveToTable2 = (index) => {
  const item = table1.splice(index, 1)[0];
  table2.push(item);
};

const openModal = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;
};

const validateItem = (item) => {
  const existsInTable2 = table2.some(i => i.tableNumber === item.tableNumber && i.price === item.price);
  if (!existsInTable2) {
    table2.push(item);
  }
  isModalOpen.value = false;
};
</script>

<style scoped>
.tables-container {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.table-section {
  width: 48%;
  display: flex;
  flex-direction: column;
}

.table {
  border-radius: 10px;
  border: 2.5px solid green;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

table {
  width: 100%;
  border-collapse: collapse;
  flex-grow: 1;
}

tbody {
  flex-grow: 1;
}

tr {
  height: 40px; /* Ajustez cette valeur selon vos besoins */
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f8f9fa;
}

button {
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: darkgreen;
}
</style>
