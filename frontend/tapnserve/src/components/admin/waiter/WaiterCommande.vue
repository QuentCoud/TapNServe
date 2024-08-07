<template>
  <div>
    <h1>Commandes</h1>
    <div class="tables-container">
      <div class="table-section">
        <h2>À valider</h2>
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
                <td>#{{ item.id }}</td>
                <td>Table {{ item.table }}</td>
                <td>{{ item.total }}€</td>
                <td>
                  <button class="validate-button" @click.stop="validateCommande(item)">
                    <svg class="check-icon" viewBox="0 0 24 24">
                      <path :d="mdiCheck" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="table-section">
        <h2>À servir</h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: auto;">
              <col style="width: auto;">
              <col style="width: auto;">
              <col style="width: 20px;">
              <col style="width: 20px;">
            </colgroup>
            <tbody>
              <tr v-for="(item, index) in table2" :key="index" @click="openModal(item, index)" class="item-clickable">
                <td>#{{ item.id }}</td>
                <td>Table {{ item.table }}</td>
                <td>{{ item.total }}€</td>
                <td>
                  <button class="validate-button" @click.stop="finishCommande(item)">
                    <svg class="check-icon" viewBox="0 0 24 24">
                      <path :d="mdiCheck" />
                    </svg>
                  </button>
                </td>
                <td>
                  <button class="cancel-button" @click.stop="cancelCommande(item)">
                    <svg class="cancel-icon" viewBox="0 0 24 24">
                      <path :d="mdiClose" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ModalComponent v-if="isModalOpen" :item="selectedItem" :index="selectedIndex" @close="isModalOpen = false" @validate="validate" />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { mdiCheck, mdiClose } from '@mdi/js';
import {useStore} from "vuex";
import ModalComponent from '../../shared/OrderDetailsModal.vue';

const user = useStore().getters['user/getUser']

const table1 = reactive([]);
const table2 = reactive([]);

const isModalOpen = ref(false);
const selectedItem = ref(null);
const selectedIndex = ref(null);

const openModal = (item, index) => {
  selectedItem.value = item;
  selectedIndex.value = index;
  isModalOpen.value = true;
};

const validateCommande = (item) => {
  item.status = 1
  // Récupère les objets existants dans le localStorage
  const paniers = JSON.parse(localStorage.getItem('panier')) || [];

  // Met à jour l'objet dans le localStorage
  const updatedPaniers = paniers.map(panier => {
    if (panier.id === item.id) {
      return item;  // Mise à jour de l'objet
    }
    return panier;
  });

  // Sauvegarde les objets mis à jour dans le localStorage
  localStorage.setItem('panier', JSON.stringify(updatedPaniers));

  // Retire l'objet de table1
  const index = table1.findIndex(panier => panier.id === item.id);
  if (index !== -1) {
    table1.splice(index, 1);
  }
  isModalOpen.value = false;
};

const finishCommande = (item) => {
  item.status = 4;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('fr-FR');

  // Récupère les objets existants dans le localStorage
  const paniers = JSON.parse(localStorage.getItem('panier')) || [];

  // Met à jour l'objet dans le localStorage
  const updatedPaniers = paniers.map(panier => {
    if (panier.id === item.id) {
      return { ...panier, status: 4, dateFin: formattedDate }; // Mise à jour de l'objet avec le statut 2
    }
    return panier;
  });

  // Sauvegarde les objets mis à jour dans le localStorage
  localStorage.setItem('panier', JSON.stringify(updatedPaniers));

  // Retire l'objet de table1
  const index = table2.findIndex(panier => panier.id === item.id);
  if (index !== -1) {
    table2.splice(index, 1);
  }

  isModalOpen.value = false;
};

const cancelCommande = (item) => {
  item.status = 2;

  // Récupère les objets existants dans le localStorage
  const paniers = JSON.parse(localStorage.getItem('panier')) || [];

  // Met à jour l'objet dans le localStorage
  const updatedPaniers = paniers.map(panier => {
    if (panier.id === item.id) {
      return { ...panier, status: 2 }; // Mise à jour de l'objet avec le statut 2
    }
    return panier;
  });

  // Sauvegarde les objets mis à jour dans le localStorage
  localStorage.setItem('panier', JSON.stringify(updatedPaniers));

  // Retire l'objet de table2
  const index = table2.findIndex(panier => panier.id === item.id);
  if (index !== -1) {
    table2.splice(index, 1);
  }

  isModalOpen.value = false;
};

const validate = (item) => {
  if (item.status === 0) {
    validateCommande(item);
  } else {
    finishCommande(item);
  }
}

onMounted(() => {
  const paniers = localStorage.getItem('panier');
  if (paniers) {
    try {
      const items = JSON.parse(paniers);
      if (Array.isArray(items)) {
        const filteredItemsTab1 = items.filter(item => item.status === 0 && item.restau === user.restau);
        filteredItemsTab1.forEach(item => {
          table1.push(item);
        });
        const filteredItemsTab2 = items.filter(item => item.status === 3 && item.restau === user.restau);
        filteredItemsTab2.forEach(item => {
          table2.push(item);
        });
      }
    } catch (e) {
      console.error('Error parsing panier from localStorage', e);
    }
  }
});
</script>

<style scoped>
.tables-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.table-section {
  width: 48%;
  display: flex;
  flex-direction: column;
}

.table {
  border-radius: 10px;
  border: 2.5px solid green;
  padding: 10px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
}

table {
  width: 100%;
  border-collapse: collapse;
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

.validate-button {
  background-color: green;
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

.check-icon {
  width: 24px;
  height: 24px;
  fill: white;
}

.validate-button:hover {
  background-color: darkgreen;
}

.cancel-button {
  background-color: red;
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

.cancel-icon {
  width: 24px;
  height: 24px;
  fill: white;
}

.cancel-button:hover {
  background-color: darkred;
}

.item-clickable {
  cursor: pointer;
  background-color: #d3d3d3;
  border-radius: 10px;
  border: 1px solid #a0a0a0;
}

.item-clickable:hover {
  background-color: #a0a0a0;
}

</style>
