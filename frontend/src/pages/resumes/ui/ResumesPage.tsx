import { useState, useEffect, type FC } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { TopBar } from '@/widgets/TopBar';
import { ExchangeTabs } from '@/widgets/ExchangeTabs';
import { ProfileHeader } from '@/widgets/ProfileHeader';
import { ResumeForm } from '@/widgets/ResumeForm';
import { resumeApi, type ResumeDTO } from '@/shared/api/resumeApi';

export const ResumesPage: FC = () => {
  const [formData, setFormData] = useState<ResumeDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Загрузка данных при монтировании (имитация GET запроса)
  useEffect(() => {
    resumeApi.getResume().then((data) => {
      setFormData(data);
      setIsLoading(false);
    });
  }, []);

  const handleChange = (field: keyof ResumeDTO, value: string) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  // Сохранение (имитация POST/PUT запроса)
  const handleSave = async () => {
    if (!formData) return;
    setIsSaving(true);
    await resumeApi.updateResume(formData);
    setIsSaving(false);
    alert('Резюме успешно сохранено в Mock-БД!');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <TopBar />
        <main className="flex-1 p-8 overflow-auto relative">
          <div className="max-w-[1000px] mx-auto pb-12">
            <ExchangeTabs />
            <ProfileHeader />

            {isLoading || !formData ? (
              <div className="text-center py-10 text-gray-500">
                Загрузка данных...
              </div>
            ) : (
              <>
                <ResumeForm data={formData} onChange={handleChange} />

                {/* Кнопка сохранения внизу */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-[14px] rounded-xl transition-colors shadow-sm"
                  >
                    {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
