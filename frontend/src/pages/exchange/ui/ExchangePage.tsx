import type { FC } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { TopBar } from '@/widgets/TopBar';
import { JobList } from '@/widgets/JobList';
import { JobFilters } from '@/widgets/JobFilters';
import { ExchangeTabs } from '@/widgets/ExchangeTabs';
import { VacancyDetailModal } from '@/widgets/VacancyDetailModal';

export const ExchangePage: FC = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <TopBar />

        {/* Скроллится только эта область — панель фильтров прилипает к верху */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-300 mx-auto pb-12">
            <ExchangeTabs />

            <div className="flex gap-6 items-start">
              <div className="sticky top-0 shrink-0 h-fit z-10">
                <JobFilters />
              </div>
              <JobList />
            </div>
          </div>
        </main>
      </div>

      <VacancyDetailModal />
    </div>
  );
};
