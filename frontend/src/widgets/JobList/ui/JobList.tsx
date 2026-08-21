import { useState, useRef, useEffect, type FC } from 'react';
import { JobCard } from '@/entities/JobCard';
import type { Job } from '@/shared/mocks/jobs';

interface JobListProps {
  jobs: Job[];
  showLocalCurrency: boolean;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SORT_OPTIONS = ['Сначала новые', 'Сначала старые', 'Больше зарплата'];

export const JobList: FC<JobListProps> = ({
  jobs,
  showLocalCurrency,
  sortBy,
  onSortChange,
}) => {
  // Состояние для открытия/закрытия кастомного дропдауна
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие дропдауна при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="flex-1 flex flex-col gap-4">
      {/* Верхняя панель */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl relative z-20">
        <span className="text-[14px] text-gray-700 font-medium">
          {jobs.length} вакансий найдено
        </span>

        {/* Кастомный дропдаун сортировки */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <span className="text-[14px] text-gray-500">Сортировка:</span>

          {/* Кнопка-триггер */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 text-[14px] font-medium text-gray-900 hover:text-blue-600 transition-colors focus:outline-none"
          >
            {sortBy}
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Выпадающий список */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSortChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors ${
                    sortBy === option
                      ? 'bg-blue-50/50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Список карточек */}
      <div className="flex flex-col gap-4 relative z-0">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              showLocalCurrency={showLocalCurrency}
            />
          ))
        ) : (
          <div className="p-8 text-center bg-white border border-gray-200 rounded-xl text-gray-500">
            По вашим критериям вакансий не найдено.
          </div>
        )}
      </div>
    </section>
  );
};
