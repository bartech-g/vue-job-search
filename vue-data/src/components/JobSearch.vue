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
      <p class="mt-4">{{ searchSummary }}</p>
    </form>
    <JobListPagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @next="goToNextPage"
      @prev="goToPrevPage"
    />
  </div>
</template>

<script setup lang="ts">
import { useJobsStore } from "@/stores/jobStore";
import { storeToRefs } from "pinia";
import { ref, computed, watchEffect, onMounted } from "vue";
import JobListPagination from "./JobListPagination.vue";

const jobsStore = useJobsStore();
const { results, totalCount, loading, error, currentPage, totalPages } =
  storeToRefs(jobsStore);

const userKeywords = ref<string | null>(null);

const searchSummary = computed(() => {
  if (loading.value) return "Loading...";
  if (error.value) return error.value;
  if (results.value.length > 0) return `Found ${totalCount.value} job(s)`;
  return `No results.`;
});

async function getJobs(e: Event) {
  e.preventDefault();
  if (userKeywords.value && userKeywords.value?.length > 2) {
    currentPage.value = 1;
    await jobsStore.search({
      keywords: userKeywords.value,
    });
  } else {
    error.value = "Please enter at least 3 characters";
  }
}

const { nextPage, prevPage } = jobsStore;

function goToNextPage() {
  if (userKeywords.value && userKeywords.value?.length > 2) {
    nextPage({
      keywords: userKeywords.value,
    });
  }
}

function goToPrevPage() {
  if (userKeywords.value && userKeywords.value?.length > 2) {
    prevPage({
      keywords: userKeywords.value,
    });
  }
}
</script>

<style scoped></style>
