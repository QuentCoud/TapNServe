<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>Détails de la commande</h2>
      <div class="details">
        <p><strong>Numéro de Table:</strong> {{ item.tableNumber }}</p>
        <p><strong>Prix:</strong> {{ item.price }}</p>
      </div>
      <div class="modal-footer">
        <button @click="close">Fermer</button>
        <button @click="validate">Valider</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  item: Object
});

const emit = defineEmits(['close', 'validate']);

const close = () => {
  emit('close');
};

const validate = () => {
  emit('validate', props.item);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
}

.details {
  display: flex;
  justify-content: space-between;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}

button:nth-child(2) {
  background-color: green;
}

button:nth-child(2):hover {
  background-color: darkgreen;
}
</style>
