import type { FC } from 'react';
import { ModuleCard } from '@/entities/ModulesCard';

const MODULES_DATA = [
  {
    id: 1,
    title: 'Exchange',
    description: 'Находите партнеров и нанимайте специалистов',
    badge: 'Обновлено',
    badgeType: 'blue',
    icon: (
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
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        />
        <circle cx="9" cy="7" r="4" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'My',
    description: 'Обновляйте и управляйте личными данными',
    icon: (
      <svg
        className="w-5 h-5 text-orange-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'IAM',
    description: 'Назначайте роли и контролируйте доступ',
    icon: (
      <svg
        className="w-5 h-5 text-teal-500"
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
    ),
  },
  {
    id: 4,
    title: 'Messenger',
    description: 'Общайтесь, обменивайтесь файлами и работайте вместе',
    badge: 'Бета',
    badgeType: 'gray',
    icon: (
      <svg
        className="w-5 h-5 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Billing',
    description: 'Управляйте счетами и транзакциями',
    icon: (
      <svg
        className="w-5 h-5 text-emerald-600"
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
    ),
  },
  {
    id: 6,
    title: 'Tracker',
    description: 'Отслеживайте время и повышайте продуктивность',
    icon: (
      <svg
        className="w-5 h-5 text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="13" r="8" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v4l2 2M12 2v2M19.07 4.93l-1.41 1.41"
        />
      </svg>
    ),
  },
  {
    id: 7,
    title: 'Academy',
    description: 'Обучайтесь и развивайтесь',
    icon: (
      <svg
        className="w-5 h-5 text-amber-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
      </svg>
    ),
  },
  {
    id: 8,
    title: 'Archive',
    description: 'Храните историю и записи',
    icon: (
      <svg
        className="w-5 h-5 text-slate-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    ),
  },
];

export const ModulesList: FC = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULES_DATA.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            description={module.description}
            badge={module.badge}
            badgeType={module.badgeType as 'blue' | 'gray' | undefined}
            icon={module.icon}
          />
        ))}
      </div>
    </section>
  );
};
