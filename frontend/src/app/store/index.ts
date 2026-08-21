import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/shared/api/apiSlice';
import { vacancySearchReducer } from '@/features/vacancySearch';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    vacancySearch: vacancySearchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
