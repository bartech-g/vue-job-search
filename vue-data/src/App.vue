<template>
  <div class="min-h-screen w-full flex flex-col bg-mist-50">
    <TheNav />
    <main class="flex-1 h-full container mx-auto px-4 py-8">
      <JobSearch />
      <hr class="my-6 border-mist-300" />
      <JobList />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import JobList from "./components/JobList.vue";
import JobSearch from "./components/JobSearch.vue";
import TheFooter from "./components/TheFooter.vue";
import TheNav from "./components/TheNav.vue";
</script>

<style scoped></style>
