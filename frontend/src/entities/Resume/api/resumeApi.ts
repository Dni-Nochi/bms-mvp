import { apiSlice } from '@/shared/api/apiSlice';
import type { Resume } from '../model/types';

export const resumeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResumes: builder.query<Resume[], void>({
      query: () => '/api/resumes',
      providesTags: ['Resume'],
    }),
  }),
});

export const { useGetResumesQuery } = resumeApi;
