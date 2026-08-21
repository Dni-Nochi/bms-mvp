import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetResumesQuery } from '@/entities/Resume';

export const ResumeList: FC = () => {
  const navigate = useNavigate();
  const { data: resumes = [], isLoading, error } = useGetResumesQuery();

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Загрузка резюме…</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-red-700">
        Не удалось загрузить резюме. Проверьте, что backend запущен и доступен.
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="p-8 bg-white border border-gray-200 rounded-2xl text-center text-[14px] text-gray-500">
        У вас пока нет резюме. Нажмите «Создать резюме», чтобы добавить первое.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {resumes.map((resume) => {
        const fullName = [resume.first_name, resume.last_name].filter(Boolean).join(' ');
        return (
          <article
            key={resume.id}
            onClick={() => navigate(`/exchange/resumes/${resume.id}`)}
            className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-sm hover:border-blue-200 transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[18px] font-semibold text-blue-700">{resume.title}</h3>
                {fullName && <p className="text-[14px] text-gray-600 mt-1">{fullName}</p>}
              </div>
              <span className="shrink-0 text-[12px] font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                {resume.visibility}
              </span>
            </div>

            {resume.summary && (
              <p className="text-[14px] text-gray-700 mt-3 leading-relaxed line-clamp-2">{resume.summary}</p>
            )}

            {resume.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {resume.skills.slice(0, 8).map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[13px] text-gray-600 bg-gray-100 border border-gray-200 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};
