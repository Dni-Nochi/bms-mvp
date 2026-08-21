import { useState, useMemo, type FC } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { TopBar } from '@/widgets/TopBar';
import { JobList } from '@/widgets/JobList';
import { JobFilters } from '@/widgets/JobFilters';
import { MOCK_JOBS } from '@/shared/mocks/jobs';

// Добавляем те же курсы, что и в JobCard, для честной сортировки по зарплате
const EXCHANGE_RATES: Record<string, number> = {
  EUR: 500,
  USD: 450,
  RUB: 5,
  KZT: 1,
};

export const ExchangePage: FC = () => {
  const [showLocalCurrency, setShowLocalCurrency] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedEmployments, setSelectedEmployments] = useState<string[]>([]);

  // НОВЫЙ СТЕЙТ: Храним выбранную сортировку
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
    setSortBy('Сначала новые'); // Сбрасываем и сортировку тоже
  };

  // Фильтрация + Сортировка
  const filteredAndSortedJobs = useMemo(() => {
    // 1. Сначала фильтруем
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

    // 2. Затем сортируем результат
    result.sort((a, b) => {
      if (sortBy === 'Сначала новые') {
        return b.id - a.id; // Чем больше ID, тем новее (уходит наверх)
      }
      if (sortBy === 'Сначала старые') {
        return a.id - b.id; // Чем меньше ID, тем старее
      }
      if (sortBy === 'Больше зарплата') {
        // Приводим обе зарплаты к базовой валюте для честного сравнения
        const salaryA = a.salaryMin * (EXCHANGE_RATES[a.currency] || 1);
        const salaryB = b.salaryMin * (EXCHANGE_RATES[b.currency] || 1);
        return salaryB - salaryA; // По убыванию
      }
      return 0;
    });

    return result;
  }, [selectedLevels, selectedFormats, selectedEmployments, sortBy]);

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-300 mx-auto flex gap-6 items-start">
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
              sortBy={sortBy} // <-- Передаем текущую сортировку
              onSortChange={setSortBy} // <-- Передаем функцию изменения
            />
          </div>
        </main>
      </div>
    </div>
  );
};
