import type { FC } from 'react';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';

export const JobFilters: FC = () => {
  return (
    <aside className="w-70 bg-white border border-gray-200 rounded-2xl p-6 shrink-0 h-fit">
      {/* Шапка фильтра */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[17px] font-bold text-gray-900">Фильтр</h2>
        <button className="text-[13px] font-medium text-blue-600 hover:text-blue-800 transition-colors">
          Очистить
        </button>
      </div>

      {/* Кнопка Поиск с ИИ */}
      <div className="mb-8 pb-6 border-b border-gray-100">
        {/* Обновили bg-gradient-to-r на bg-linear-to-r под Tailwind v4 */}
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

      {/* Блок: Навыки */}
      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Навыки</h3>
        <div className="relative">
          <select className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-[14px] rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer">
            <option value="">Выберите навык</option>
            <option value="react">React</option>
            <option value="python">Python</option>
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

      {/* Блок: Уровень */}
      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
          Уровень
        </h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="Начальный" />
          <Checkbox label="Средний" />
          <Checkbox label="Эксперт" />
        </div>
      </div>

      {/* Блок: Формат работы */}
      <div className="mb-6">
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
          Формат работы
        </h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="Офисный" />
          <Checkbox label="Удаленный" />
          <Checkbox label="Гибридный" />
        </div>
      </div>

      {/* Блок: Тип занятости */}
      <div>
        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
          Тип занятости
        </h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="Почасовая" />
          <Checkbox label="Частичная" />
          <Checkbox label="Полная" defaultChecked />
        </div>
      </div>
    </aside>
  );
};
