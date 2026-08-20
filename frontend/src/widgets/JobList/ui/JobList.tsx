import type { FC } from 'react';
import { JobCard } from '@/entities/JobCard';

// Моковые данные для проверки верстки
const MOCK_JOBS = [
  {
    id: 1,
    title: 'VR AR Engineer',
    company: 'Cosmo World',
    salary: '2500 - 3500 EUR',
    format: 'Офисный',
    schedule: 'Фиксированная',
    location: 'Angola, Benguela',
    language: 'Albanian C1 - Продвинутый',
    description:
      'Interesting and challenging tasks: Development of advanced VR/AR applications for various platforms (Unity, Unreal Engine, ARKit, ARCore). Working closely with 3D artists and designers to...',
    skills: [
      'Ajax',
      'Amazon AWS',
      'Angular',
      'Atlassian Confluence',
      'Atlassian Jira',
      'BDD',
      'Bitbucket',
      'Bootstrap',
      'Laravel',
    ],
  },
  {
    id: 2,
    title: 'Ассистент финансового отдела',
    company: 'Perfect Systems',
    salary: 'от 80000 RUB',
    format: 'Удаленный',
    schedule: 'Фиксированная',
    location: 'Russia, Moscow',
    language: 'English B1 - Средний',
    description: 'Опыт работы: 1-3 года. Полная занятость. График: 5/2...',
    skills: [
      'Стрессоустойчивость',
      'Проактивность',
      'Деловые коммуникации',
      '1С',
      'MS Excel',
      'Критическое мышление',
    ],
  },
];

export const JobList: FC = () => {
  return (
    <section className="flex-1 flex flex-col gap-4">
      {/* Верхняя панель списка (Количество и Сортировка) */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
        <span className="text-[14px] text-gray-700 font-medium">
          14 вакансий найдено
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

      {/* Список карточек */}
      <div className="flex flex-col gap-4">
        {MOCK_JOBS.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </section>
  );
};
