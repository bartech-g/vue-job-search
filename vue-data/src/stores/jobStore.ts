// src/stores/jobsStore.ts
import { defineStore } from 'pinia';
import { ref, shallowRef, computed } from 'vue';
import { searchJobs, type JobSearchParams } from '@/services/jobsApi';
import type { JoobleJob, JoobleSearchResponse } from '@/types/joobleJob';

export const useJobsStore = defineStore('jobs', () => {
    const results = shallowRef<JoobleJob[]>([]);
    const totalCount = ref<number>(0);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const currentPage = ref(1);
    const pageSize = 30; // Based on Jobble response!

    const totalPages = computed(() => Math.ceil(totalCount.value / pageSize));

    async function search(params: JobSearchParams) {
        loading.value = true;
        error.value = null;
        try {
            const data = await searchJobs({ ...params, page: currentPage.value });

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

    function nextPage(params: JobSearchParams) {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
            search(params);
        }
    }

    function prevPage(params: JobSearchParams) {
        if (currentPage.value > 1) {
            currentPage.value--;
            search(params);
        }
    }



    return { results, loading, error, search, reset, currentPage, totalPages, totalCount, nextPage, prevPage };
});