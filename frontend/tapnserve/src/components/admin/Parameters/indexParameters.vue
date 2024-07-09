<template>
  <modal-default v-model="localshow" @update:model-value="close">
    <div class="w-[90rem] h-[45rem] flex">
      <div class="w-[20rem]">
          <div class="mt-8 flex flex-col gap-y-2">
            <div @click="view='QR'" class="rounded-xl py-2 text-xl font-medium cursor-pointer"
                 :class="[view === 'QR' ? 'bg-gray-300' : 'bg-gray-200']"
            > QR code
            </div>

            <div @click="view='carte'" class="rounded-xl py-2 text-xl font-medium cursor-pointer"
                 :class="[view === 'carte' ? 'bg-gray-300' : 'bg-gray-200']"
            > Carte
            </div>
          </div>
      </div>

      <div class="mx-5 h-full w-0.5 bg-gray-200"></div>

      <div class="border border-gray-300 border-2 border-solid w-full rounded-3xl">
        <Qrcodes v-if="view==='QR'" />
      </div>
    </div>
  </modal-default>
</template>

<script>
import ModalDefault from "@/components/components/modalDefault.vue";
import Qrcodes from "@/components/admin/Parameters/components/Qrcodes.vue";

export default {
  name: "indexParameters",
  components: {Qrcodes, ModalDefault},
  data() {
    return {
      localshow: false,
      view: 'QR'
    }
  },
  props: {
    modelValue: {}
  },
  methods: {
    close() {
     this.localshow = false;
     this.$emit('update:modelValue', this.localshow)
    }
  },
  watch: {
    modelValue: {
      handler() {
        this.localshow = this.modelValue
      }, immediate: true
    }
  }
}
</script>

<style scoped>

</style>