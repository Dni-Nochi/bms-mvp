import type { FC } from 'react';

export const OnboardingSteps: FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Начать работу
      </h2>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 p-4 bg-orange-50/50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
          <div className="text-orange-500 shrink-0">
            <svg
              className="w-5 h-5"
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
          </div>
          <span className="text-sm font-medium text-gray-900 leading-tight">
            Подтвердить аккаунт по email
          </span>
        </div>

        <div className="flex items-center gap-4 p-4 bg-teal-50/50 border border-teal-100 rounded-xl cursor-pointer hover:bg-teal-50 transition-colors">
          <div className="text-teal-600 shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7h3l2 2-2 2h-3m-6 0H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3m0 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900 leading-tight">
            Настроить двухэтапную проверку
          </span>
        </div>

        <div className="flex items-center gap-4 p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
          <div className="text-emerald-600 shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h.01"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900 leading-tight">
            Добавить способ оплаты для получения платежей
          </span>
        </div>
      </div>
    </div>
  );
};
