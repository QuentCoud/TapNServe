<template>
  <div class="absolute top-0 left-0 h-screen w-screen bg-gray-400/30 flex items-center justify-center"
       @click.self="close"
       v-if="modelValue"
  >
    <div class="bg-white rounded-3xl min-w-[10rem] min-h-[5rem] flex items-center justify-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalDefault",
  props: {
    modelValue: {}
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style scoped>

</style>