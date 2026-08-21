import { useState, type FC } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { TopBar } from '@/widgets/TopBar';
import { JobList } from '@/widgets/JobList';
import { JobFilters } from '@/widgets/JobFilters';

export const ExchangePage: FC = () => {
  const [showLocalCurrency, setShowLocalCurrency] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-300 mx-auto flex gap-6 items-start">
            <JobFilters
              isLocalCurrency={showLocalCurrency}
              onLocalCurrencyToggle={() =>
                setShowLocalCurrency(!showLocalCurrency)
              }
            />

            <JobList showLocalCurrency={showLocalCurrency} />
          </div>
        </main>
      </div>
    </div>
  );
};
