import type { FC } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { TopBar } from '@/widgets/TopBar';
import { JobList } from '@/widgets/JobList';
import { JobFilters } from '@/widgets/JobFilters';
import { ExchangeTabs } from '@/widgets/ExchangeTabs';

export const ExchangePage: FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-300 mx-auto">
            <ExchangeTabs />

            <div className="flex gap-6 items-start">
              <JobFilters />
              <JobList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
