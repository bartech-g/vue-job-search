<template>
  <div>
    <h1 class="text-2xl mb-4 text-mist-600">Job Search</h1>
    <form @submit="getJobs">
      <input
        type="text"
        v-model="userKeywords"
        placeholder="enter title(s)"
        class="border border-mist-500 rounded-l p-2"
      />
      <button
        type="submit"
        class="bg-mist-500 text-white px-4 py-2 rounded-r hover:bg-mist-500 cursor-pointer border border-mist-500"
      >
        Search
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useJobsStore } from "@/stores/jobStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const jobsStore = useJobsStore();
const { error } = storeToRefs(jobsStore);

const userKeywords = ref<string | null>(null);

async function getJobs(e: Event) {
  e.preventDefault();
  if (userKeywords.value && userKeywords.value?.length > 2) {
    await jobsStore.search({ keywords: userKeywords.value });
  } else {
    error.value = "Please enter at least 3 characters";
  }
}
</script>

<style scoped></style>
