import type { Vacancy } from '../model/types';

export function formatSalary(vacancy: Vacancy): string {
  const { salary_min, salary_max, salary_currency } = vacancy;
  const currency = salary_currency ?? '';

  if (salary_min && salary_max) return `${salary_min} - ${salary_max} ${currency}`.trim();
  if (salary_min) return `от ${salary_min} ${currency}`.trim();
  if (salary_max) return `до ${salary_max} ${currency}`.trim();
  return 'З/п не указана';
}

export function formatLanguage(vacancy: Vacancy): string | undefined {
  if (!vacancy.language_name) return undefined;
  return [vacancy.language_name, vacancy.language_level].filter(Boolean).join(' ');
}
