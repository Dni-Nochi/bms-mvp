import type { FC } from 'react';

export interface JobCardProps {
  title: string;
  company: string;
  salary: string;
  salaryPeriod?: string;
  format: string;
  schedule: string;
  location: string;
  language?: string;
  description: string;
  skills: string[];
}

export const JobCard: FC<JobCardProps> = ({
  title,
  company,
  salary,
  salaryPeriod = 'в месяц',
  format,
  schedule,
  location,
  language,
  description,
  skills,
}) => {
  return (
    <article className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-sm transition-shadow">
      {/* Шапка карточки: Логотип, Должность, Зарплата */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          {/* Логотип компании */}
          <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-blue-600 font-bold text-xl">C</span>{' '}
            {/* Заглушка логотипа */}
          </div>
          <div>
            <h3 className="text-[19px] font-semibold text-blue-700 leading-tight hover:underline cursor-pointer">
              {title}
            </h3>
            <p className="text-[15px] text-gray-600 mt-1">{company}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[19px] font-semibold text-gray-900 leading-tight">
            {salary}
          </div>
          <div className="text-[13px] text-gray-500 mt-1">{salaryPeriod}</div>
        </div>
      </div>

      {/* Мета-информация (Иконки) */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 text-[13px] text-gray-600 font-medium">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {format}
        </div>
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {schedule}
        </div>
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {location}
        </div>
        {language && (
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            {language}
          </div>
        )}
      </div>

      {/* Описание вакансии */}
      <p className="text-[14px] text-gray-700 leading-relaxed mb-5 line-clamp-2">
        {description}
      </p>

      {/* Теги навыков */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-2.5 py-1 text-[13px] text-gray-600 bg-gray-100 border border-gray-200 rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
};
