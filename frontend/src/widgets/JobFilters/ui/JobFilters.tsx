import type { FC } from 'react';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';

interface JobFiltersProps {
  isLocalCurrency: boolean;
  onLocalCurrencyToggle: () => void;
  // Новые пропсы для фильтров
  selectedLevels: string[];
  onLevelToggle: (level: string) => void;
  selectedFormats: string[];
  onFormatToggle: (format: string) => void;
  selectedEmployments: string[];
  onEmploymentToggle: (emp: string) => void;
  onClearFilters: () => void;
}

export const JobFilters: FC<JobFiltersProps> = ({
  isLocalCurrency,
  onLocalCurrencyToggle,
  selectedLevels,
  onLevelToggle,
  selectedFormats,
  onFormatToggle,
  selectedEmployments,
  onEmploymentToggle,
  onClearFilters,
}) => {
  return (
    <aside className="w-70 bg-white border border-gray-200 rounded-2xl p-6 shrink-0 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[17px] font-bold text-gray-900">Фильтр</h2>
        <button
          onClick={onClearFilters}
          className="text-[13px] font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Очистить
        </button>
      </div>

      <div className="mb-6">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium text-[14px] rounded-xl transition-all shadow-sm hover:shadow-md">
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
          Поиск вакансий с ИИ
        </button>
      </div>

      <div className="mb-8 pb-6 border-b border-gray-100">
        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
          <Checkbox
            label="Показать в валюте региона (KZT)"
            className="text-blue-900 font-medium"
            checked={isLocalCurrency}
            onChange={onLocalCurrencyToggle}
          />
          <p className="text-[12px] text-gray-500 mt-2 ml-8">
            *на основе вашей геолокации
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Навыки</h3>
        <div className="relative">
          <select className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-[14px] rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer">
            <option value="">Выберите навык</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
          Уровень
        </h3>
        <div className="flex flex-col gap-3">
          {['Начальный', 'Средний', 'Эксперт'].map((level) => (
            <Checkbox
              key={level}
              label={level}
              checked={selectedLevels.includes(level)}
              onChange={() => onLevelToggle(level)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
          Формат работы
        </h3>
        <div className="flex flex-col gap-3">
          {['Офисный', 'Удаленный', 'Гибридный'].map((format) => (
            <Checkbox
              key={format}
              label={format}
              checked={selectedFormats.includes(format)}
              onChange={() => onFormatToggle(format)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
          Тип занятости
        </h3>
        <div className="flex flex-col gap-3">
          {['Почасовая', 'Частичная', 'Полная'].map((emp) => (
            <Checkbox
              key={emp}
              label={emp}
              checked={selectedEmployments.includes(emp)}
              onChange={() => onEmploymentToggle(emp)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};
