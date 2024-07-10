<template>
  <div class="">
    <div class="flex mx-12 rounded-xl gap-x-2 bg-gray-200 py-1 px-1">
      <div v-for="(item, index) in items" class="py-2 px-6 bg-gray-100 rounded-2xl cursor-pointer ripple" @click="select(index)" :class="{'!bg-gray-300': index===localIndex}">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalMenu",
  props: {
    value: {},
    items: {
      type: Array,
      default: () => []
    },
    defaultItem: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      localIndex: 0
    }
  },
  created() {
    this.select(this.defaultItem);
  },
  methods: {
    select(index) {
      this.localIndex = index
      this.$emit('update:modelValue', this.items[index])
    }
  }
}
</script>

<style scoped>

</style>