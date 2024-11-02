<script setup lang="ts">
defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center lg:hidden">
      <div class="bg-gray-800 p-6 rounded-lg w-64 space-y-8 shadow-lg">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold">
            Menu
          </h2>
          <UIcon name="material-symbols:close-rounded" class="h-6 w-6 text-white cursor-pointer" @click="emit('close')" />
        </div>
        <nav>
          <LayoutMenuItems />
        </nav>
        <div id="settings-menu" class="text-right">
          <LayoutMenuSettings />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
