import type { RouteProps } from 'react-router-dom';
import { HomePage } from '@/pages/home/ui/HomePage';
import { ExchangePage } from '@/pages/exchange';

export const routeConfig: Record<string, RouteProps> = {
  home: {
    path: '/',
    element: <HomePage />,
  },
  exchange: {
    path: '/exchange',
    element: <ExchangePage />,
  },
};
