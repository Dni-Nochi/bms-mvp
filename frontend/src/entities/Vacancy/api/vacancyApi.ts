import { apiSlice } from '@/shared/api/apiSlice';
import type { Vacancy, VacancyListResponse, VacancyMatchListResponse } from '../model/types';

export const vacancyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVacancies: builder.query<VacancyListResponse, void>({
      query: () => '/api/vacancies?limit=200',
      providesTags: ['Vacancy'],
    }),
    getVacancy: builder.query<Vacancy, number>({
      query: (id) => `/api/vacancies/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Vacancy', id }],
    }),
    getVacancyMatches: builder.query<VacancyMatchListResponse, number>({
      // Бэкенд ограничивает limit до 100 (см. le=100 в routers/vacancies.py)
      query: (resumeId) => `/api/vacancies/match/${resumeId}?limit=100`,
      providesTags: ['Vacancy'],
    }),
  }),
});

export const { useGetVacanciesQuery, useGetVacancyQuery, useGetVacancyMatchesQuery } = vacancyApi;
