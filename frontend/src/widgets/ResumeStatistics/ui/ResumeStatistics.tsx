import type { FC } from 'react';

export const ResumeStatistics: FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Статистика резюме
      </h2>

      <div className="flex flex-col items-center text-center p-8 bg-[#F8FAFC] border border-gray-200 rounded-2xl">
        <div className="mb-4 text-gray-300">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <rect x="4" y="14" width="4" height="6" rx="1" />
            <rect x="10" y="10" width="4" height="10" rx="1" />
            <rect x="16" y="6" width="4" height="14" rx="1" />
          </svg>
        </div>

        <h3 className="text-[17px] font-semibold text-gray-900 mb-3">
          Разблокировать статистику
        </h3>

        <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
          Разместите резюме, чтобы отслеживать показы, просмотры и приглашения
        </p>

        <button className="w-full py-2.5 px-4 bg-[#EBF4FF] text-blue-700 font-medium text-[15px] rounded-xl hover:bg-blue-100 transition-colors">
          Разместить резюме
        </button>
      </div>
    </div>
  );
};
