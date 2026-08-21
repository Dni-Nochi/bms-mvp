import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/widgets/Sidebar';
import { TopBar } from '@/widgets/TopBar';
import { ExchangeTabs } from '@/widgets/ExchangeTabs';
import { ResumeList } from '@/widgets/ResumeList';

export const ResumesPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-300 mx-auto">
            <ExchangeTabs />

            <div className="flex items-center justify-between mb-6">
              <h1 className="text-[22px] font-bold text-gray-900">Мои резюме</h1>
              <button
                onClick={() => navigate('/exchange/resumes/new')}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-[14px] rounded-xl transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Создать резюме
              </button>
            </div>

            <ResumeList />
          </div>
        </main>
      </div>
    </div>
  );
};
