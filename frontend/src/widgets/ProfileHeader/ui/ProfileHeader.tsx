import type { FC } from 'react';

export const ProfileHeader: FC = () => {
  return (
    <section className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 flex items-center justify-between mb-6">
      <div className="flex items-center gap-6">
        {/* Аватарка с кнопкой редактирования */}
        <div className="relative">
          <div className="w-[84px] h-[84px] bg-blue-100/50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <button className="absolute bottom-0 right-0 w-[26px] h-[26px] bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-white hover:bg-blue-700 transition-colors shadow-sm">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>

        {/* Данные пользователя */}
        <div>
          <h2 className="text-[22px] font-bold text-gray-900 leading-tight">
            Timur Adilov
          </h2>
          <div className="flex items-center gap-1.5 text-[14px] text-gray-500 mt-1">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            t.adilov@p.systems
          </div>
        </div>
      </div>

      {/* Кнопка Поделиться */}
      <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm uppercase tracking-wide">
        Поделиться
      </button>
    </section>
  );
};
