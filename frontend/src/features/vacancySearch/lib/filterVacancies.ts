import type { Vacancy } from '@/entities/Vacancy';
import type { SortOption, VacancySearchState } from '../model/vacancySearchSlice';

export interface RankedVacancy {
  vacancy: Vacancy;
  matchPercentage?: number;
}

export function applyFilters(
  items: RankedVacancy[],
  filters: Pick<VacancySearchState, 'skill' | 'experienceLevels' | 'workFormats' | 'employmentTypes'>,
): RankedVacancy[] {
  let result = items;

  if (filters.skill.trim()) {
    const skillLower = filters.skill.trim().toLowerCase();
    result = result.filter(({ vacancy }) =>
      [...vacancy.required_skills, ...vacancy.preferred_skills].some((s) =>
        s.toLowerCase().includes(skillLower),
      ),
    );
  }
  if (filters.experienceLevels.length > 0) {
    result = result.filter(({ vacancy }) => filters.experienceLevels.includes(vacancy.experience_level));
  }
  if (filters.workFormats.length > 0) {
    result = result.filter(({ vacancy }) => filters.workFormats.includes(vacancy.work_format));
  }
  if (filters.employmentTypes.length > 0) {
    result = result.filter(({ vacancy }) => filters.employmentTypes.includes(vacancy.employment_type));
  }

  return result;
}

export function sortVacancies(items: RankedVacancy[], sort: SortOption): RankedVacancy[] {
  const copy = [...items];

  switch (sort) {
    case 'match':
      copy.sort((a, b) => (b.matchPercentage ?? 0) - (a.matchPercentage ?? 0));
      break;
    case 'salary':
      copy.sort(
        (a, b) =>
          (b.vacancy.salary_max ?? b.vacancy.salary_min ?? 0) -
          (a.vacancy.salary_max ?? a.vacancy.salary_min ?? 0),
      );
      break;
    case 'oldest':
      copy.sort((a, b) => new Date(a.vacancy.created_at).getTime() - new Date(b.vacancy.created_at).getTime());
      break;
    case 'newest':
    default:
      copy.sort((a, b) => new Date(b.vacancy.created_at).getTime() - new Date(a.vacancy.created_at).getTime());
  }

  return copy;
}
