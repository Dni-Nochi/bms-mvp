import type { FC } from 'react';
import { JobCard } from '@/entities/JobCard';
import { formatLanguage } from '@/entities/Vacancy';
import { applyFilters, openVacancyDetail, setSort, sortVacancies, useRankedVacancies } from '@/features/vacancySearch';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import type { SortOption } from '@/features/vacancySearch';

export const JobList: FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.vacancySearch);
  const { items, isLoading, isFetching, error } = useRankedVacancies();

  const filtered = applyFilters(items, filters);
  const sorted = sortVacancies(filtered, filters.sort);

  return (
    <section className="flex-1 flex flex-col gap-4">
      {/* Верхняя панель списка (Количество и Сортировка) */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
        <span className="text-[14px] text-gray-700 font-medium">
          {isLoading ? 'Загрузка…' : `${sorted.length} вакансий найдено`}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[14px] text-gray-500">Сортировка:</span>
          <select
            value={filters.sort}
            onChange={(e) => dispatch(setSort(e.target.value as SortOption))}
            className="text-[14px] font-medium text-gray-900 bg-transparent focus:outline-none cursor-pointer"
          >
            {filters.aiMode && <option value="match">По соответствию (ИИ)</option>}
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
            <option value="salary">Больше зарплата</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-red-700">
          Не удалось загрузить вакансии. Проверьте, что backend запущен и доступен.
        </div>
      )}

      {!error && !isLoading && sorted.length === 0 && (
        <div className="p-8 bg-white border border-gray-200 rounded-xl text-center text-[14px] text-gray-500">
          По вашим фильтрам вакансий не найдено.
        </div>
      )}

      {/* Список карточек */}
      <div className={`flex flex-col gap-4 transition-opacity ${isFetching ? 'opacity-60' : ''}`}>
        {sorted.map(({ vacancy, matchPercentage }) => (
          <JobCard
            key={vacancy.id}
            title={vacancy.title}
            company={vacancy.company.name}
            salaryMin={vacancy.salary_min ?? 0}
            salaryMax={vacancy.salary_max}
            currency={vacancy.salary_currency ?? ''}
            showLocalCurrency={filters.showLocalCurrency}
            format={vacancy.work_format}
            schedule={vacancy.employment_type}
            location={vacancy.location}
            language={formatLanguage(vacancy)}
            description={vacancy.description}
            skills={vacancy.skills}
            matchPercentage={matchPercentage}
            logoLetter={vacancy.company.logo_letter ?? undefined}
            onClick={() => dispatch(openVacancyDetail(vacancy.id))}
          />
        ))}
      </div>
    </section>
  );
};
