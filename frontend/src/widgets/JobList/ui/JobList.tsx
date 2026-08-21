import type { FC } from 'react';
import { JobCard } from '@/entities/JobCard';
import { MOCK_JOBS } from '@/shared/mocks/jobs';

interface JobListProps {
  showLocalCurrency: boolean;
}

export const JobList: FC<JobListProps> = ({ showLocalCurrency }) => {
  return (
    <section className="flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
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

      <div className="flex flex-col gap-4">
        {MOCK_JOBS.map((job) => (
          <JobCard
            key={job.id}
            {...job}
            showLocalCurrency={showLocalCurrency}
          />
        ))}
      </div>
    </section>
  );
};
