import { useEffect, useState, type FC, type ReactNode } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  EMPTY_RESUME_INPUT,
  useCreateResumeMutation,
  useGetResumeQuery,
  useUpdateResumeMutation,
  type ResumeInput,
} from '@/entities/Resume';

const WORK_FORMATS = ['Офисный', 'Удаленный', 'Гибридный'];
const EXPERIENCE_LEVELS = ['Начальный', 'Средний', 'Эксперт'];
const EMPLOYMENT_TYPES = ['Почасовая', 'Частичная', 'Полная'];
const CURRENCIES = ['USD', 'EUR', 'RUB', 'KZT'];
const SALARY_TYPES = ['Фиксированная', 'Почасовая'];
const LANGUAGE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Носитель'];
const VISIBILITY_OPTIONS = [
  { value: 'Все', hint: 'Видимо для всех онлайн' },
  { value: 'Все пользователи BMS', hint: 'Видимо для всех авторизованных пользователей BMS' },
  { value: 'Только члены команды', hint: 'Видимо только для членов вашей команды' },
  { value: 'Только я', hint: 'Видимо только для вас. Вы можете изменить это позже.' },
];

const inputClass =
  'w-full bg-white border border-gray-300 text-gray-900 text-[14px] rounded-xl px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors';
const labelClass = 'block text-[13px] text-gray-600 mb-2';

const Field: FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className={labelClass}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
    />
  </div>
);

const SelectField: FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}> = ({ label, value, onChange, options, placeholder }) => (
  <div>
    <label className={labelClass}>{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} cursor-pointer appearance-none`}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextareaField: FC<{ label: string; value: string; onChange: (value: string) => void; placeholder?: string }> = ({
  label,
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label className={labelClass}>{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className={inputClass}
    />
  </div>
);

const RadioGroup: FC<{
  label: string;
  options: { value: string; hint?: string }[];
  value: string;
  onChange: (value: string) => void;
}> = ({ label, options, value, onChange }) => (
  <div>
    {label && <h3 className={labelClass}>{label}</h3>}
    <div className="flex flex-col gap-3">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-start gap-3 cursor-pointer">
          <input
            type="radio"
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="mt-1 accent-blue-600 w-4 h-4 shrink-0"
          />
          <span>
            <span className="block text-[14px] text-gray-900">{opt.value}</span>
            {opt.hint && <span className="block text-[12px] text-gray-500">{opt.hint}</span>}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const SectionCard: FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <section className="p-8 border-b border-gray-100 last:border-b-0">
    <h2 className="text-[16px] font-bold text-gray-900 mb-6">{title}</h2>
    {children}
  </section>
);

export const ResumeEditorPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const resumeId = id ? Number(id) : undefined;

  const { data: existing, isLoading: isLoadingResume } = useGetResumeQuery(resumeId ?? 0, { skip: !isEdit });
  const [createResume, { isLoading: isCreating }] = useCreateResumeMutation();
  const [updateResume, { isLoading: isUpdating }] = useUpdateResumeMutation();

  const [form, setForm] = useState<ResumeInput>(EMPTY_RESUME_INPUT);
  const [skillInput, setSkillInput] = useState('');
  const [langName, setLangName] = useState('');
  const [langLevel, setLangLevel] = useState(LANGUAGE_LEVELS[3]);

  useEffect(() => {
    if (existing) {
      const { id: _id, created_at: _createdAt, ...rest } = existing;
      setForm(rest);
    }
  }, [existing]);

  const set = <K extends keyof ResumeInput>(key: K, value: ResumeInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addSkill = () => {
    const value = skillInput.trim();
    if (value && !form.skills.includes(value)) set('skills', [...form.skills, value]);
    setSkillInput('');
  };
  const removeSkill = (skill: string) => set('skills', form.skills.filter((s) => s !== skill));

  const addLanguage = () => {
    if (!langName.trim()) return;
    set('languages', [...form.languages, `${langName.trim()} ${langLevel}`]);
    setLangName('');
  };
  const removeLanguage = (idx: number) => set('languages', form.languages.filter((_, i) => i !== idx));

  const addWorkExperience = () =>
    set('work_experience', [...form.work_experience, { company: '', position: '', start: '', end: '', description: '' }]);
  const updateWorkExperience = (idx: number, patch: Partial<ResumeInput['work_experience'][number]>) =>
    set(
      'work_experience',
      form.work_experience.map((w, i) => (i === idx ? { ...w, ...patch } : w)),
    );
  const removeWorkExperience = (idx: number) =>
    set('work_experience', form.work_experience.filter((_, i) => i !== idx));

  const addExtraField = () => set('extra_fields', [...form.extra_fields, { label: '', value: '' }]);
  const updateExtraField = (idx: number, patch: Partial<ResumeInput['extra_fields'][number]>) =>
    set(
      'extra_fields',
      form.extra_fields.map((f, i) => (i === idx ? { ...f, ...patch } : f)),
    );
  const removeExtraField = (idx: number) => set('extra_fields', form.extra_fields.filter((_, i) => i !== idx));

  const handleSave = async () => {
    if (isEdit && resumeId) {
      await updateResume({ id: resumeId, body: form }).unwrap();
    } else {
      await createResume(form).unwrap();
    }
    navigate('/exchange/resumes');
  };

  const isSaving = isCreating || isUpdating;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[14px] font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`;

  if (isEdit && isLoadingResume) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-500 flex items-center justify-center">
        Загрузка резюме…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="flex items-center justify-between px-8 h-16 bg-white border-b border-gray-200">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full border-2 border-blue-600" />
            <span className="font-bold text-gray-900 text-[17px]">BMS</span>
          </div>
          <nav className="flex items-center gap-6">
            <NavLink to="/exchange" className={navLinkClass}>
              Найти работу
            </NavLink>
            <NavLink to="/exchange/resumes" className={navLinkClass}>
              Мои резюме
            </NavLink>
            <span className="text-[14px] font-medium text-gray-300 cursor-default">Заявки и предложения</span>
          </nav>
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-10 pb-20">
        <h1 className="text-[26px] font-bold text-gray-900 mb-8">{isEdit ? 'Резюме' : 'Создать резюме'}</h1>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <SectionCard title="Личная информация">
            <div className="flex gap-8">
              <div className="flex-1 grid grid-cols-2 gap-6">
                <Field label="Имя" value={form.first_name} onChange={(v) => set('first_name', v)} />
                <Field label="Фамилия" value={form.last_name} onChange={(v) => set('last_name', v)} />
                <Field
                  label="Дата рождения"
                  type="date"
                  value={form.birth_date ?? ''}
                  onChange={(v) => set('birth_date', v || null)}
                />
                <div />
                <Field label="Страна" value={form.country ?? ''} onChange={(v) => set('country', v || null)} />
                <Field label="Город" value={form.city ?? ''} onChange={(v) => set('city', v || null)} />
              </div>
              <div className="shrink-0 flex flex-col items-center pt-6">
                <div className="w-[84px] h-[84px] bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                  <svg className="w-9 h-9 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Контакты">
            <div className="grid grid-cols-1 gap-6 max-w-xl">
              <Field label="Номер телефона" value={form.phone ?? ''} onChange={(v) => set('phone', v || null)} />
              <Field
                label="Электронная почта"
                value={form.contact_email ?? ''}
                onChange={(v) => set('contact_email', v || null)}
              />
            </div>
          </SectionCard>

          <SectionCard title="Резюме">
            <div className="flex flex-col gap-6">
              <Field label="Должность" value={form.title} onChange={(v) => set('title', v)} />
              <TextareaField label="Описание" value={form.summary} onChange={(v) => set('summary', v)} />
              <Field
                label="Ссылка на портфолио"
                placeholder="https://..."
                value={form.portfolio_url ?? ''}
                onChange={(v) => set('portfolio_url', v || null)}
              />

              {form.extra_fields.map((field, idx) => (
                <div key={idx} className="flex items-end gap-3">
                  <div className="flex-1">
                    <Field
                      label="Название поля"
                      value={field.label}
                      onChange={(v) => updateExtraField(idx, { label: v })}
                    />
                  </div>
                  <div className="flex-1">
                    <Field label="Значение" value={field.value} onChange={(v) => updateExtraField(idx, { value: v })} />
                  </div>
                  <button
                    onClick={() => removeExtraField(idx)}
                    className="mb-0.5 h-10 px-3 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                onClick={addExtraField}
                className="self-start flex items-center gap-1.5 text-[14px] font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                + Добавить поле
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Опыт работы">
            <label className={labelClass}>Места работы</label>
            <div className="flex flex-col gap-4">
              {form.work_experience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F8FAFC] border border-gray-200 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Компания" value={exp.company} onChange={(v) => updateWorkExperience(idx, { company: v })} />
                    <Field label="Должность" value={exp.position} onChange={(v) => updateWorkExperience(idx, { position: v })} />
                    <Field
                      label="Начало"
                      type="month"
                      value={exp.start}
                      onChange={(v) => updateWorkExperience(idx, { start: v })}
                    />
                    <Field label="Окончание" type="month" value={exp.end} onChange={(v) => updateWorkExperience(idx, { end: v })} />
                  </div>
                  <TextareaField
                    label="Описание"
                    value={exp.description}
                    onChange={(v) => updateWorkExperience(idx, { description: v })}
                  />
                  <button
                    onClick={() => removeWorkExperience(idx)}
                    className="self-start text-[13px] text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Удалить место работы
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addWorkExperience}
              className="mt-4 flex items-center gap-1.5 text-[14px] font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              + Добавить
            </button>
          </SectionCard>

          <SectionCard title="Навыки">
            <label className={labelClass}>Навыки</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Поиск"
                className={inputClass}
              />
              <button
                onClick={addSkill}
                className="shrink-0 px-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-[14px] font-medium hover:bg-blue-100 transition-colors"
              >
                Добавить
              </button>
            </div>
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {form.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-gray-700 bg-gray-100 border border-gray-200 rounded-full"
                  >
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="text-gray-400 hover:text-red-500">
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard title="Уровень владения языком">
            <label className={labelClass}>Язык</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={langName}
                onChange={(e) => setLangName(e.target.value)}
                placeholder="Например, English"
                className={inputClass}
              />
              <select
                value={langLevel}
                onChange={(e) => setLangLevel(e.target.value)}
                className={`${inputClass} max-w-[160px] cursor-pointer appearance-none`}
              >
                {LANGUAGE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
            {form.languages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {form.languages.map((lang, idx) => (
                  <span
                    key={`${lang}-${idx}`}
                    className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-gray-700 bg-gray-100 border border-gray-200 rounded-full"
                  >
                    {lang}
                    <button onClick={() => removeLanguage(idx)} className="text-gray-400 hover:text-red-500">
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={addLanguage}
              className="mt-4 flex items-center gap-1.5 text-[14px] font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              + Добавить
            </button>
          </SectionCard>

          <SectionCard title="Зарплата">
            <div className="grid grid-cols-3 gap-6">
              <SelectField
                label="Ставка"
                value={form.salary_type ?? 'Фиксированная'}
                onChange={(v) => set('salary_type', v)}
                options={SALARY_TYPES}
              />
              <Field
                label="Сумма"
                type="number"
                value={form.desired_salary_min !== null ? String(form.desired_salary_min) : ''}
                onChange={(v) => set('desired_salary_min', v ? Number(v) : null)}
              />
              <SelectField
                label="Валюта"
                value={form.desired_salary_currency ?? ''}
                onChange={(v) => set('desired_salary_currency', v || null)}
                options={CURRENCIES}
                placeholder="Выберите"
              />
            </div>
          </SectionCard>

          <SectionCard title="Рабочие предпочтения">
            <div className="grid grid-cols-3 gap-8">
              <RadioGroup
                label="Формат работы"
                options={WORK_FORMATS.map((v) => ({ value: v }))}
                value={form.desired_work_formats[0] ?? ''}
                onChange={(v) => set('desired_work_formats', [v])}
              />
              <RadioGroup
                label="Уровень"
                options={EXPERIENCE_LEVELS.map((v) => ({ value: v }))}
                value={form.experience_level}
                onChange={(v) => set('experience_level', v)}
              />
              <RadioGroup
                label="Тип занятости"
                options={EMPLOYMENT_TYPES.map((v) => ({ value: v }))}
                value={form.desired_employment_types[0] ?? ''}
                onChange={(v) => set('desired_employment_types', [v])}
              />
            </div>
          </SectionCard>

          <SectionCard title="Видимость">
            <label className={labelClass}>Кто может просматривать резюме</label>
            <RadioGroup label="" options={VISIBILITY_OPTIONS} value={form.visibility} onChange={(v) => set('visibility', v)} />
          </SectionCard>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => navigate('/exchange/resumes')}
            className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-[14px] font-medium hover:bg-gray-100 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-[14px] font-medium transition-colors"
          >
            {isSaving ? 'Сохранение…' : 'Сохранить'}
          </button>
        </div>
      </main>
    </div>
  );
};
