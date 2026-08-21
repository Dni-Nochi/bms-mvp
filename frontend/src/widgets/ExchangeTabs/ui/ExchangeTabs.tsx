import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const ExchangeTabs: FC = () => {
  const getTabClass = ({ isActive }: { isActive: boolean }) =>
    `pb-4 text-[15px] font-medium transition-colors border-b-2 -mb-[1px] ${
      isActive
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
    }`;

  return (
    <nav className="flex items-center gap-6 mb-6 border-b border-gray-200">
      <NavLink to="/exchange" end className={getTabClass}>
        Найти работу
      </NavLink>
      <NavLink to="/exchange/resumes" className={getTabClass}>
        Мои резюме
      </NavLink>
    </nav>
  );
};
