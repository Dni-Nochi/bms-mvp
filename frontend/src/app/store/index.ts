import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Добавляем временную заглушку, пока у нас нет реальных фичей
    _init: (state = {}) => state,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
