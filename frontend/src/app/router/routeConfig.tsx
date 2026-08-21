import type { RouteProps } from 'react-router-dom';
import { HomePage } from '@/pages/home/ui/HomePage';
import { ExchangePage } from '@/pages/exchange';
// 1. Добавляем импорт нашей новой страницы
import { ResumesPage } from '@/pages/resumes';

export const routeConfig: Record<string, RouteProps> = {
  home: {
    path: '/',
    element: <HomePage />,
  },
  exchange: {
    path: '/exchange',
    element: <ExchangePage />,
  },
  // 2. Добавляем новый роут для резюме
  resumes: {
    path: '/exchange/resumes',
    element: <ResumesPage />,
  },
};
