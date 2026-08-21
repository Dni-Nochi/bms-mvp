import { apiSlice } from '@/shared/api/apiSlice';
import type { VacancyListResponse, VacancyMatchListResponse } from '../model/types';

export const vacancyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVacancies: builder.query<VacancyListResponse, void>({
      query: () => '/api/vacancies?limit=200',
      providesTags: ['Vacancy'],
    }),
    getVacancyMatches: builder.query<VacancyMatchListResponse, number>({
      // Бэкенд ограничивает limit до 100 (см. le=100 в routers/vacancies.py)
      query: (resumeId) => `/api/vacancies/match/${resumeId}?limit=100`,
      providesTags: ['Vacancy'],
    }),
  }),
});

export const { useGetVacanciesQuery, useGetVacancyMatchesQuery } = vacancyApi;
