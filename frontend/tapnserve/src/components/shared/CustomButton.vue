<template>
    <button class="custom-button" @click="handleClick" :style="{ width: computedWidth }">
      {{ text }}
    </button>
  </template>
  
  <script>
  export default {
    name: 'CustomButton',
    props: {
      text: {
        type: String,
        required: true
      },
      width: {
        type: String,
        default: 'auto'
      }
    },
    computed: {
      computedWidth() {
        return this.width;
      }
    },
    methods: {
      handleClick(event) {
        this.$emit('click', event);
      }
    }
  };
  </script>