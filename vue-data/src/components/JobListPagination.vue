<template>
  <div class="flex items-center gap-4">
    <button :disabled="currentPage <= 1" @click="emit('prev')">Prev</button>
    <span>Page {{ currentPage }} of {{ totalPages.toLocaleString() }}</span>
    <button :disabled="currentPage >= totalPages" @click="emit('next')">
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();
const emit = defineEmits<{
  next: [];
  prev: [];
}>();
</script>
