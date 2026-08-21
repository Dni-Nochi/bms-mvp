import type { FC } from 'react';

export const TopBar: FC = () => {
  return (
    <header className="h-18 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
      {/* Левая часть: Поиск */}
      <div className="relative w-full max-w-md">
        {/* Иконка лупы */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Поиск вакансий..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-[15px] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
        />
      </div>

      {/* Правая часть: Иконки и профиль */}
      <div className="flex items-center gap-5">
        {/* Иконка уведомлений (Колокольчик) */}
        <button className="text-gray-500 hover:text-gray-900 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* Иконка помощи (Вопрос) */}
        <button className="text-gray-500 hover:text-gray-900 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        {/* Разделитель */}
        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        {/* Аватар профиля (пока заглушка с инициалами) */}
        <button className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-blue-500/30 transition-all">
          <span className="text-sm font-semibold text-blue-700">TA</span>
        </button>
      </div>
    </header>
  );
};
