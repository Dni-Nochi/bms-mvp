import type { FC } from 'react';
import { Input } from '@/shared/ui/Input/Input';
import type { ResumeDTO } from '@/shared/api/resumeApi';

interface ResumeFormProps {
  data: ResumeDTO;
  onChange: (field: keyof ResumeDTO, value: string) => void;
}

export const ResumeForm: FC<ResumeFormProps> = ({ data, onChange }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Блок: Личная информация */}
      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Заголовок блока */}
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 bg-[#F8FAFC]">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>
          <h3 className="text-[16px] font-bold text-gray-900">
            Личная информация
          </h3>
        </div>

        {/* Поля */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Полное имя"
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            icon={
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
          />
          <Input
            label="Должность"
            placeholder="Напр. UI/UX Дизайнер"
            value={data.jobTitle}
            onChange={(e) => onChange('jobTitle', e.target.value)}
            icon={
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          />
          <Input
            label="Организация"
            placeholder="Название компании"
            value={data.company}
            onChange={(e) => onChange('company', e.target.value)}
            icon={
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            }
          />
          <Input
            label="Ссылка на резюме"
            placeholder="https://..."
            value={data.resumeUrl}
            onChange={(e) => onChange('resumeUrl', e.target.value)}
            icon={
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            }
          />

          {/* Страна (Select) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-gray-700 font-medium">
              Страна
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-400 pointer-events-none">
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <select
                value={data.country}
                onChange={(e) => onChange('country', e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 text-gray-900 text-[14px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 py-2.5 pl-9 pr-8 cursor-pointer"
              >
                <option value="KZT">Казахстан</option>
                <option value="RUS">Россия</option>
              </select>
              <div className="absolute right-3 text-gray-400 pointer-events-none">
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

          <Input
            label="Город"
            value={data.city}
            onChange={(e) => onChange('city', e.target.value)}
            icon={
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />
        </div>
      </section>

      {/* Блок: Контактные данные */}
      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 bg-[#F8FAFC]">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-[16px] font-bold text-gray-900">
            Контактные данные
          </h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Электронная почта"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            icon={
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
            }
          />
          <Input
            label="Телефон"
            placeholder="+7 (___) ___-__-__"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            icon={
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            }
          />
          <Input
            label="Телеграм"
            placeholder="@username"
            value={data.telegram}
            onChange={(e) => onChange('telegram', e.target.value)}
          />
          <Input
            label="Скайп"
            placeholder="live:username"
            value={data.skype}
            onChange={(e) => onChange('skype', e.target.value)}
          />
        </div>
      </section>
    </div>
  );
};
