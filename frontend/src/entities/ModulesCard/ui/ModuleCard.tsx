import type { FC, ReactNode } from 'react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  badge?: string;
  badgeType?: 'blue' | 'gray';
}

export const ModuleCard: FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  badge,
  badgeType,
}) => {
  const badgeStyles =
    badgeType === 'blue'
      ? 'text-blue-700 bg-blue-50'
      : 'text-gray-600 bg-gray-100';

  return (
    <div className="flex flex-col p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow cursor-pointer h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-1">{icon}</div>
        {badge && (
          <span
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md ${badgeStyles}`}
          >
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-[15px] font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-[13px] text-gray-500 leading-tight">{description}</p>
    </div>
  );
};
