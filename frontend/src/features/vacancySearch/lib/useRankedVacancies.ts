import { useAppSelector } from '@/shared/lib/hooks/redux';
import { useGetVacanciesQuery, useGetVacancyMatchesQuery } from '@/entities/Vacancy';
import type { RankedVacancy } from './filterVacancies';

/**
 * Отдаёт единый список вакансий независимо от режима:
 * обычный список (GET /api/vacancies) или подбор с ИИ по резюме
 * (GET /api/vacancies/match/{resumeId}), с прикреплённым match_percentage.
 */
export function useRankedVacancies() {
  const aiMode = useAppSelector((state) => state.vacancySearch.aiMode);
  const resumeId = useAppSelector((state) => state.vacancySearch.resumeId);

  const isMatching = aiMode && resumeId !== null;

  const listQuery = useGetVacanciesQuery(undefined, { skip: isMatching });
  const matchQuery = useGetVacancyMatchesQuery(resumeId ?? 0, { skip: !isMatching });

  if (isMatching) {
    const items: RankedVacancy[] = (matchQuery.data?.items ?? []).map((m) => ({
      vacancy: m.vacancy,
      matchPercentage: m.match_percentage,
    }));
    return {
      items,
      isLoading: matchQuery.isLoading,
      isFetching: matchQuery.isFetching,
      error: matchQuery.error,
    };
  }

  const items: RankedVacancy[] = (listQuery.data?.items ?? []).map((v) => ({ vacancy: v }));
  return {
    items,
    isLoading: listQuery.isLoading,
    isFetching: listQuery.isFetching,
    error: listQuery.error,
  };
}
