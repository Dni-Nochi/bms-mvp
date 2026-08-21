import type { FC } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { TopBar } from '@/widgets/TopBar';
import { JobList } from '@/widgets/JobList';
import { JobFilters } from '@/widgets/JobFilters';
import { ExchangeTabs } from '@/widgets/ExchangeTabs';
import { VacancyDetailModal } from '@/widgets/VacancyDetailModal';

export const ExchangePage: FC = () => {
  // ... (все твои стейты и useMemo остаются БЕЗ ИЗМЕНЕНИЙ) ...
  const [showLocalCurrency, setShowLocalCurrency] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedEmployments, setSelectedEmployments] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('Сначала новые');

  const toggleFilter = (
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const clearFilters = () => {
    setSelectedLevels([]);
    setSelectedFormats([]);
    setSelectedEmployments([]);
    setSortBy('Сначала новые');
  };

  const filteredAndSortedJobs = useMemo(() => {
    let result = MOCK_JOBS.filter((job) => {
      const matchLevel =
        selectedLevels.length === 0 || selectedLevels.includes(job.level);
      const matchFormat =
        selectedFormats.length === 0 || selectedFormats.includes(job.format);
      const matchEmployment =
        selectedEmployments.length === 0 ||
        selectedEmployments.includes(job.employmentType);
      return matchLevel && matchFormat && matchEmployment;
    });

    result.sort((a, b) => {
      if (sortBy === 'Сначала новые') return b.id - a.id;
      if (sortBy === 'Сначала старые') return a.id - b.id;
      if (sortBy === 'Больше зарплата') {
        return (
          b.salaryMin * (EXCHANGE_RATES[b.currency] || 1) -
          a.salaryMin * (EXCHANGE_RATES[a.currency] || 1)
        );
      }
      return 0;
    });

    return result;
  }, [selectedLevels, selectedFormats, selectedEmployments, sortBy]);

  return (
    // 1. ИСПРАВЛЕНИЕ САЙДБАРА: Фиксируем экран и запрещаем глобальный скролл
    <div className="h-screen flex overflow-hidden bg-gray-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <TopBar />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1200px] mx-auto">
            {/* 2. Вставляем вкладки навигации сюда */}
            <ExchangeTabs />

            <div className="flex gap-6 items-start">
              <JobFilters
                isLocalCurrency={showLocalCurrency}
                onLocalCurrencyToggle={() =>
                  setShowLocalCurrency(!showLocalCurrency)
                }
                selectedLevels={selectedLevels}
                onLevelToggle={(val) => toggleFilter(setSelectedLevels, val)}
                selectedFormats={selectedFormats}
                onFormatToggle={(val) => toggleFilter(setSelectedFormats, val)}
                selectedEmployments={selectedEmployments}
                onEmploymentToggle={(val) =>
                  toggleFilter(setSelectedEmployments, val)
                }
                onClearFilters={clearFilters}
              />

              <JobList
                jobs={filteredAndSortedJobs}
                showLocalCurrency={showLocalCurrency}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </div>
        </main>
      </div>

      <VacancyDetailModal />
    </div>
  );
};
