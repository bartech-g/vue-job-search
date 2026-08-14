<template>
  <div>
    <div
      v-if="results.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-mist-300 border border-mist-300 rounded-lg"
    >
      <TheCard v-for="job in results" :key="job.id" :position="job" />
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useJobsStore } from "@/stores/jobStore";
import TheCard from "./TheCard.vue";

const { results, currentPage, totalPages } = storeToRefs(useJobsStore());
</script>

<style scoped></style>
