<template>
  <div
    class="border border-mist-300 rounded-lg p-4 bg-mist-50 flex flex-col gap-2 items-start"
  >
    <h3 class="text-xl font-bold text-mist-600">{{ position.title }}</h3>
    <p>{{ position.company }} - {{ position.location }}</p>
    <p>{{ position.snippet }}</p>
    <a
      :href="position.link"
      target="_blank"
      class="mt-auto self-end text-white py-2 px-4"
      >Apply Now</a
    >
  </div>
</template>

<script setup lang="ts">
import type { JoobleJob } from "@/types/joobleJob";

const props = defineProps<{
  position: JoobleJob;
}>();
</script>

<style scoped></style>
