import type { FC } from 'react';

export const ExchangePage: FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <div className="w-65 bg-[#F4F7FC] border-r border-gray-200 shrink-0">
        Сайдбар
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-18 bg-white border-b border-gray-200 flex items-center px-8 shrink-0">
          TopBar
        </header>

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-300 mx-auto flex gap-6">
            <aside className="w-70 shrink-0">Блок фильтров</aside>

            <section className="flex-1">Список вакансий</section>
          </div>
        </main>
      </div>
    </div>
  );
};
