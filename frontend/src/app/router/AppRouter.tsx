import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from './routeConfig';

export const AppRouter: FC = () => {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
