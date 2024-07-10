<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <div class="modal-footer">
          <button @click="close">Fermer</button>
          <button v-if="!isDetails" @click="validate">Valider</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    item: Object,
    index: Number,
    isDetails: Boolean
  });
  
  const emit = defineEmits(['close', 'validate']);
  
  const close = () => {
    emit('close');
  };
  
  const validate = () => {
    emit('validate', props.item);
  };
  
  const getImagePath = (imageName) => {
    return require(`@/assets/plat/${imageName}`);
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
    max-width: 35%;
    width: 100%;
  }
  
  
  .modal-footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  button {
    background-color: #a9a9a9;
    color: black;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 25px;
    margin: 0 10px;
    font-weight: bold;
  }
  
  button:hover {
    color: white;
  }
  
  button:first-child:hover {
    background-color: red;
  }
  
  button:nth-child(2):hover {
    background-color: green;
  }
  </style>
  