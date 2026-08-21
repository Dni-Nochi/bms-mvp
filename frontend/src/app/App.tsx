import { BrowserRouter } from 'react-router';
import { StoreProvider } from '@/app/store/StoreProvider';
import { AppRouter } from '@/app/router/AppRouter';

export function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </StoreProvider>
  );
}
