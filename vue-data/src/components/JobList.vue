<template>
  <div>
    <div>
      <p>total: {{ totalCount }}</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading" class="loading">Loading...</div>
    <div v-else-if="results.length === 0" class="empty-state">
      No jobs found.
    </div>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-mist-300 border border-mist-300 rounded-lg"
    >
      <TheCard v-for="job in results" :key="job.id" :position="job" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useJobsStore } from "@/stores/jobStore";
import TheCard from "./TheCard.vue";

const { results, totalCount, loading, error } = storeToRefs(useJobsStore());
</script>

<style scoped></style>
