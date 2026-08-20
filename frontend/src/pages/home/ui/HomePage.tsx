import type { FC } from 'react';
import { Header } from '@/widgets/Header';
import { ModulesList } from '@/widgets/ModulesList';
import { OnboardingSteps } from '@/widgets/OnboardingSteps';
import { ResumeStatistics } from '@/widgets/ResumeStatistics'; // <-- Новый импорт

export const HomePage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans">
      <Header />

      <main className="grow max-w-360 w-full mx-auto flex flex-col lg:flex-row">
        <div className="flex-1 p-8 lg:p-10 lg:pr-12">
          <div className="mb-8">
            <p className="text-gray-500 text-sm mb-2">Четверг, Август 20</p>
            <h1 className="text-3xl font-bold text-gray-900">
              Добрый день, Timur
            </h1>
          </div>

          <ModulesList />
        </div>

        <div className="w-full lg:w-100 border-t lg:border-t-0 lg:border-l border-gray-200 bg-[#F8FAFC] p-8 lg:p-10 shrink-0">
          <OnboardingSteps />

          <ResumeStatistics />
        </div>
      </main>
    </div>
  );
};
