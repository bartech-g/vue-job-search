
import axios from 'axios';

export interface JobSearchParams {
    keywords: string;
    location?: string;
    radius?: number;
    page?: number;
}

export async function searchJobs(params: JobSearchParams) {
    const { data } = await axios.post('/api/jobs/search', params);
    return data ?? {};
}