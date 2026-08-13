// src/stores/jobsStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { searchJobs, type JobSearchParams } from '@/services/jobsApi';
import type { JoobleJob } from '@/types/joobleJob';

export const useJobsStore = defineStore('jobs', () => {
    const results = ref<JoobleJob[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function search(params: JobSearchParams) {
        loading.value = true;
        error.value = null;
        try {
            const data = await searchJobs(params);
            results.value = data ?? [];
        } catch (e) {
            error.value = 'Failed to fetch jobs';
        } finally {
            loading.value = false;
        }
    }

    function reset() {
        results.value = [];
        error.value = null;
    }

    return { results, loading, error, search, reset };
});