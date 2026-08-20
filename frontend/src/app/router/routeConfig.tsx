import type { RouteProps } from 'react-router-dom';
import { HomePage } from '@/pages/home/ui/HomePage';

export const routeConfig: Record<string, RouteProps> = {
  home: {
    path: '/',
    element: <HomePage />,
  },
};
