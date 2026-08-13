<template>
  <h1>You did it!</h1>
  <p>
    Visit
    <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to
    read the documentation
  </p>
  <pre>{{ JSON.stringify({ results, loading, error }, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { useJobsStore } from "@/stores/jobStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const jobsStore = useJobsStore();

const { results, loading, error } = storeToRefs(jobsStore);

onMounted(() => {
  jobsStore.search({ keywords: "developer" });
});
</script>

<style scoped></style>
