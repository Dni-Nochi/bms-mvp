// Будущая Pydantic схема (BaseModel) на FastAPI
export interface ResumeDTO {
  fullName: string;
  jobTitle: string;
  company: string;
  resumeUrl: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  telegram: string;
  skype: string;
}

// Имитация базы данных (пока нет PostgreSQL)
let mockDatabase: ResumeDTO = {
  fullName: 'Timur Adilov',
  jobTitle: 'UI/UX Дизайнер',
  company: 'Product Systems',
  resumeUrl: 'https://behance.net/timur',
  country: 'KZT',
  city: 'Алматы',
  email: 't.adilov@p.systems',
  phone: '+7 (777) 123-45-67',
  telegram: '@timur_ux',
  skype: 'live:timur.adilov',
};

// Имитация запросов к FastAPI
export const resumeApi = {
  getResume: async (): Promise<ResumeDTO> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...mockDatabase }), 500); // Задержка 0.5с
    });
  },

  updateResume: async (data: ResumeDTO): Promise<{ status: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockDatabase = { ...data };
        resolve({ status: 'success' });
      }, 800); // Задержка 0.8с для имитации сохранения
    });
  },
};
