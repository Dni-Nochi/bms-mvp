import { apiSlice } from '@/shared/api/apiSlice';
import type { Resume, ResumeInput } from '../model/types';

export const resumeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResumes: builder.query<Resume[], void>({
      query: () => '/api/resumes',
      providesTags: (result) =>
        result
          ? [...result.map((r) => ({ type: 'Resume' as const, id: r.id })), { type: 'Resume' as const, id: 'LIST' }]
          : [{ type: 'Resume' as const, id: 'LIST' }],
    }),
    getResume: builder.query<Resume, number>({
      query: (id) => `/api/resumes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Resume', id }],
    }),
    createResume: builder.mutation<Resume, ResumeInput>({
      query: (body) => ({ url: '/api/resumes', method: 'POST', body }),
      invalidatesTags: [{ type: 'Resume', id: 'LIST' }],
    }),
    updateResume: builder.mutation<Resume, { id: number; body: ResumeInput }>({
      query: ({ id, body }) => ({ url: `/api/resumes/${id}`, method: 'PUT', body }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Resume', id },
        { type: 'Resume', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetResumesQuery, useGetResumeQuery, useCreateResumeMutation, useUpdateResumeMutation } = resumeApi;
