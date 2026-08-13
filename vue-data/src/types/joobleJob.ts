// src/types/joobleJob.ts
export interface JoobleJob {
    id: number;
    title: string;
    location: string;
    snippet: string;
    salary: string;
    source: string;
    type: string;
    link: string;
    company: string;
    updated: string;
}

export interface JoobleSearchResponse {
    totalCount: number;
    jobs: JoobleJob[];
}