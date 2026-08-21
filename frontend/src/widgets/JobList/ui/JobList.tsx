import type {FC} from 'react';
import {useState, useRef, useEffect} from 'react';
import {JobCard} from '@/entities/JobCard';
import {formatLanguage} from '@/entities/Vacancy';
import {
    applyFilters,
    openVacancyDetail,
    setSort,
    sortVacancies,
    useRankedVacancies,
} from '@/features/vacancySearch';
import {useAppDispatch, useAppSelector} from '@/shared/lib/hooks/redux';
import type {SortOption} from '@/features/vacancySearch';

export const JobList: FC = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.vacancySearch);
    const {items, isLoading, isFetching, error} = useRankedVacancies();

    const filtered = applyFilters(items, filters);
    const sorted = sortVacancies(filtered, filters.sort);

// Стейты и рефы для кастомного дропдауна
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

// Закрытие дропдауна при клике вне его области
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

// Опции сортировки (собираем динамически, чтобы учесть aiMode)
    const sortOptions: { value: SortOption; label: string }[] = [
        ...(filters.aiMode
            ? [{value: 'match' as SortOption, label: 'По соответствию (ИИ)'}]
            : []),
        {value: 'newest', label: 'Сначала новые'},
        {value: 'oldest', label: 'Сначала старые'},
        {value: 'salary', label: 'Больше зарплата'},
    ];

    const currentSortLabel =
        sortOptions.find((opt) => opt.value === filters.sort)?.label ||
        'Сначала новые';

    return (
        <section className="flex-1 flex flex-col gap-4">
            {/* Верхняя панель списка (Количество и Сортировка) */}
            <div
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl relative z-20">
<span className="text-[14px] text-gray-700 font-medium">
{isLoading ? 'Загрузка…' : `${sorted.length} вакансий найдено`}
</span>

                <div className="flex items-center gap-3">
                    <span className="text-[14px] text-gray-500">Сортировка:</span>

                    {/* КАСТОМНЫЙ ДРОПДАУН ВМЕСТО NATIVE SELECT */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-1.5 text-[14px] font-medium text-gray-900 bg-white hover:text-blue-600 transition-colors focus:outline-none"
                        >
                            {currentSortLabel}
                            <svg
                                className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
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

                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-1 overflow-hidden">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            dispatch(setSort(option.value));
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors ${
                                            filters.sort === option.value
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-red-700">
                    Не удалось загрузить вакансии. Проверьте, что backend запущен и
                    доступен.
                </div>
            )}

            {!error && !isLoading && sorted.length === 0 && (
                <div className="p-8 bg-white border border-gray-200 rounded-xl text-center text-[14px] text-gray-500">
                    По вашим фильтрам вакансий не найдено.
                </div>
            )}

            {/* Список карточек */}
            <div
                className={`flex flex-col gap-4 transition-opacity relative z-10 ${isFetching ? 'opacity-60' : ''}`}
            >
                {sorted.map(({vacancy, matchPercentage}) => (
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
                        requiredSkills={vacancy.required_skills}
                        preferredSkills={vacancy.preferred_skills}
                        matchPercentage={matchPercentage}
                        logoLetter={vacancy.company.logo_letter ?? undefined}
                        onClick={() => dispatch(openVacancyDetail(vacancy.id))}
                    />
                ))}
            </div>
        </section>
    );
};