import { useEffect, useState, type FC } from 'react';
import { formatLanguage, formatSalary, useGetVacancyQuery } from '@/entities/Vacancy';
import { useGetResumesQuery } from '@/entities/Resume';
import { closeVacancyDetail } from '@/features/vacancySearch';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';

export const VacancyDetailModal: FC = () => {
  const dispatch = useAppDispatch();
  const vacancyId = useAppSelector((state) => state.vacancySearch.selectedVacancyId);
  const isOpen = vacancyId !== null;

  const { data: vacancy, isLoading } = useGetVacancyQuery(vacancyId ?? 0, { skip: !isOpen });
  const { data: resumes = [] } = useGetResumesQuery(undefined, { skip: !isOpen });

  const [applyResumeId, setApplyResumeId] = useState<number | ''>('');
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setApplyResumeId('');
      setApplied(false);
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeVacancyDetail());
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const handleApply = () => {
    if (!applyResumeId) return;
    setApplied(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
      onClick={() => dispatch(closeVacancyDetail())}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
      >
        {isLoading || !vacancy ? (
          <div className="p-10 text-center text-gray-500">Загрузка вакансии…</div>
        ) : (
          <>
            {/* Шапка */}
            <div className="px-8 pt-6 pb-4 border-b border-gray-100 shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[24px] font-bold text-blue-700">{vacancy.title}</h2>
                  <div className="flex items-center gap-4 mt-2 text-[14px] text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {vacancy.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {vacancy.work_format}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(closeVacancyDetail())}
                  className="shrink-0 text-gray-400 hover:text-gray-700 transition-colors"
                  aria-label="Закрыть"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleApply}
                  disabled={!applyResumeId || applied}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-[14px] font-medium transition-colors"
                >
                  {applied ? 'Отклик отправлен' : 'Применить'}
                </button>
                <select
                  value={applyResumeId}
                  onChange={(e) => {
                    setApplyResumeId(e.target.value ? Number(e.target.value) : '');
                    setApplied(false);
                  }}
                  className="text-[14px] text-gray-700 bg-white border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                >
                  <option value="">Название резюме</option>
                  {resumes.map((resume) => (
                    <option key={resume.id} value={resume.id}>
                      {resume.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Контент: описание + компания */}
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-y-auto px-8 py-6">
                <h3 className="text-[15px] font-bold text-gray-900 mb-3">О вакансии</h3>
                <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line mb-4">{vacancy.description}</p>
                <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line mb-6">{vacancy.requirements}</p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-[13px] text-gray-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {vacancy.employment_type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {vacancy.experience_level}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 10v2"
                      />
                    </svg>
                    {formatSalary(vacancy)} {vacancy.salary_currency && 'в месяц'}
                  </span>
                  {formatLanguage(vacancy) && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                      </svg>
                      {formatLanguage(vacancy)}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {vacancy.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[13px] text-gray-600 bg-gray-100 border border-gray-200 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-[340px] shrink-0 border-l border-gray-100 overflow-y-auto px-6 py-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold text-lg">
                      {vacancy.company.logo_letter ?? vacancy.company.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-[15px]">{vacancy.company.name}</div>
                    {vacancy.company.website && (
                      <a
                        href={vacancy.company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13px] text-blue-600 hover:underline"
                      >
                        {vacancy.company.website}
                      </a>
                    )}
                  </div>
                </div>

                {vacancy.company.description && (
                  <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                    {vacancy.company.description}
                  </p>
                )}

                <dl className="flex flex-col gap-4">
                  {vacancy.company.phone && (
                    <div>
                      <dt className="text-[12px] text-gray-500">Телефон</dt>
                      <dd className="text-[14px] text-blue-600">{vacancy.company.phone}</dd>
                    </div>
                  )}
                  {vacancy.company.industry && (
                    <div>
                      <dt className="text-[12px] text-gray-500">Отрасль</dt>
                      <dd className="text-[14px] text-gray-900">{vacancy.company.industry}</dd>
                    </div>
                  )}
                  {vacancy.company.staff_count && (
                    <div>
                      <dt className="text-[12px] text-gray-500">Штат компании</dt>
                      <dd className="text-[14px] text-gray-900">{vacancy.company.staff_count} сотрудников</dd>
                    </div>
                  )}
                  {vacancy.company.headquarters && (
                    <div>
                      <dt className="text-[12px] text-gray-500">Головной офис</dt>
                      <dd className="text-[14px] text-gray-900">{vacancy.company.headquarters}</dd>
                    </div>
                  )}
                  {vacancy.company.founded_year && (
                    <div>
                      <dt className="text-[12px] text-gray-500">Год основания</dt>
                      <dd className="text-[14px] text-gray-900">{vacancy.company.founded_year}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
