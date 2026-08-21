import type { RouteProps } from 'react-router-dom';
import { HomePage } from '@/pages/home/ui/HomePage';
import { ExchangePage } from '@/pages/exchange';
import { ResumesPage } from '@/pages/resumes';
import { ResumeEditorPage } from '@/pages/resumeEditor';

export const routeConfig: Record<string, RouteProps> = {
  home: {
    path: '/',
    element: <HomePage />,
  },
  exchange: {
    path: '/exchange',
    element: <ExchangePage />,
  },
  resumes: {
    path: '/exchange/resumes',
    element: <ResumesPage />,
  },
  resumeNew: {
    path: '/exchange/resumes/new',
    element: <ResumeEditorPage />,
  },
  resumeDetail: {
    path: '/exchange/resumes/:id',
    element: <ResumeEditorPage />,
  },
};
