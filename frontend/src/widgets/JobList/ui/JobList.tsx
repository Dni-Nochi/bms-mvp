import type { FC } from 'react';
import { JobCard } from '@/entities/JobCard';
// Импортируем наши новые крутые моки
import { MOCK_JOBS } from '@/shared/mocks/jobs';

export const JobList: FC = () => {
  return (
    <section className="flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
        {/* Динамически выводим количество */}
        <span className="text-[14px] text-gray-700 font-medium">
          {MOCK_JOBS.length} вакансий найдено
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[14px] text-gray-500">Сортировка:</span>
          <select className="text-[14px] font-medium text-gray-900 bg-transparent focus:outline-none cursor-pointer">
            <option>Сначала новые</option>
            <option>Сначала старые</option>
            <option>Больше зарплата</option>
          </select>
        </div>
      </div>

      {/* Отрисовываем весь список */}
      <div className="flex flex-col gap-4">
        {MOCK_JOBS.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </section>
  );
};
