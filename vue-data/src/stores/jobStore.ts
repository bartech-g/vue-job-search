// src/stores/jobsStore.ts
import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import { searchJobs, type JobSearchParams } from '@/services/jobsApi';
import type { JoobleJob, JoobleSearchResponse } from '@/types/joobleJob';

export const useJobsStore = defineStore('jobs', () => {
    const results = shallowRef<JoobleJob[]>([]);
    const totalCount = ref<number>(0);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function search(params: JobSearchParams) {
        loading.value = true;
        error.value = null;
        try {
            const data = await searchJobs(params);
            console.log(data);
            results.value = data?.jobs ?? [];
            totalCount.value = data?.totalCount ?? 0;
        } catch (e) {
            error.value = 'Failed to fetch jobs';
        } finally {
            loading.value = false;
        }
    }

    function reset() {
        results.value = [];
        error.value = null;
        totalCount.value = 0;
    }

    return { results, loading, error, search, reset, totalCount };
});