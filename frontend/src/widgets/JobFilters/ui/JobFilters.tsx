import type { FC } from 'react';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { useGetResumesQuery } from '@/entities/Resume';
import {
  clearFilters,
  setAiMode,
  setResumeId,
  setSkill,
  toggleEmploymentType,
  toggleExperienceLevel,
  toggleLocalCurrency,
  toggleWorkFormat,
} from '@/features/vacancySearch';

const EXPERIENCE_LEVELS = ['Начальный', 'Средний', 'Эксперт'];
const WORK_FORMATS = ['Офисный', 'Удаленный', 'Гибридный'];
const EMPLOYMENT_TYPES = ['Почасовая', 'Частичная', 'Полная'];

export const JobFilters: FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.vacancySearch);
  const { data: resumes = [], isLoading: resumesLoading } = useGetResumesQuery();

  const handleToggleAi = () => {
    if (!filters.aiMode && filters.resumeId === null && resumes.length > 0) {
      dispatch(setResumeId(resumes[0].id));
    }
    dispatch(setAiMode(!filters.aiMode));
  };

  return (
    <aside className="w-70 bg-white border border-gray-200 rounded-2xl p-6 shrink-0 h-fit">
      {/* Шапка фильтра */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[17px] font-bold text-gray-900">Фильтр</h2>
        <button
          onClick={() => dispatch(clearFilters())}
          className="text-[13px] font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Очистить
        </button>
      </div>

      {/* Блок: Резюме + Поиск с ИИ */}
      <div className="mb-8 pb-6 border-b border-gray-100">
        <label className="block text-[13px] font-semibold text-gray-900 mb-2">
          Резюме для подбора
        </label>
        <select
          value={filters.resumeId ?? ''}
          onChange={(e) => dispatch(setResumeId(e.target.value ? Number(e.target.value) : null))}
          disabled={resumesLoading || resumes.length === 0}
          className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-[14px] rounded-xl px-3 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer disabled:opacity-50"
        >
          <option value="" disabled>
            {resumesLoading ? 'Загрузка резюме…' : 'Выберите резюме'}
          </option>
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>
              {resume.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleToggleAi}
          disabled={resumes.length === 0}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 font-medium text-[14px] rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
            filters.aiMode
              ? 'bg-white border-2 border-indigo-500 text-indigo-600'
              : 'bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {filters.aiMode ? 'Показать все вакансии' : 'Поиск вакансий с ИИ'}
        </button>
      </div>

      {/* Блок: Валюта */}
      <div className="mb-6">
        <Checkbox
          label="Показывать зарплату в тенге"
          checked={filters.showLocalCurrency}
          onChange={() => dispatch(toggleLocalCurrency())}
        />
      </div>

      {/* Блок: Навыки */}
      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Навыки</h3>
        <input
          type="text"
          value={filters.skill}
          onChange={(e) => dispatch(setSkill(e.target.value))}
          placeholder="Например, React, Python..."
          className="w-full bg-white border border-gray-300 text-gray-700 text-[14px] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      {/* Блок: Уровень */}
      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
          Уровень
        </h3>
        <div className="flex flex-col gap-3">
          {EXPERIENCE_LEVELS.map((level) => (
            <Checkbox
              key={level}
              label={level}
              checked={filters.experienceLevels.includes(level)}
              onChange={() => dispatch(toggleExperienceLevel(level))}
            />
          ))}
        </div>
      </div>

      {/* Блок: Формат работы */}
      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
          Формат работы
        </h3>
        <div className="flex flex-col gap-3">
          {WORK_FORMATS.map((format) => (
            <Checkbox
              key={format}
              label={format}
              checked={filters.workFormats.includes(format)}
              onChange={() => dispatch(toggleWorkFormat(format))}
            />
          ))}
        </div>
      </div>

      {/* Блок: Тип занятости */}
      <div>
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
          Тип занятости
        </h3>
        <div className="flex flex-col gap-3">
          {EMPLOYMENT_TYPES.map((type) => (
            <Checkbox
              key={type}
              label={type}
              checked={filters.employmentTypes.includes(type)}
              onChange={() => dispatch(toggleEmploymentType(type))}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};
