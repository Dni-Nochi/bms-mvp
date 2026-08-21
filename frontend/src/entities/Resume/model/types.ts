export interface WorkExperienceEntry {
  company: string;
  position: string;
  start: string;
  end: string;
  description: string;
}

export interface ExtraField {
  label: string;
  value: string;
}

export interface Resume {
  id: number;
  owner_email: string | null;
  first_name: string;
  last_name: string;
  birth_date: string | null;
  country: string | null;
  city: string | null;
  phone: string | null;
  contact_email: string | null;
  title: string;
  summary: string;
  portfolio_url: string | null;
  extra_fields: ExtraField[];
  work_experience: WorkExperienceEntry[];
  skills: string[];
  languages: string[];
  salary_type: string | null;
  desired_salary_min: number | null;
  desired_salary_max: number | null;
  desired_salary_currency: string | null;
  experience_level: string;
  desired_employment_types: string[];
  desired_work_formats: string[];
  visibility: string;
  created_at: string;
}

export type ResumeInput = Omit<Resume, 'id' | 'created_at'>;

export const EMPTY_RESUME_INPUT: ResumeInput = {
  owner_email: null,
  first_name: '',
  last_name: '',
  birth_date: null,
  country: null,
  city: null,
  phone: null,
  contact_email: null,
  title: '',
  summary: '',
  portfolio_url: null,
  extra_fields: [],
  work_experience: [],
  skills: [],
  languages: [],
  salary_type: 'Фиксированная',
  desired_salary_min: null,
  desired_salary_max: null,
  desired_salary_currency: 'USD',
  experience_level: 'Средний',
  desired_employment_types: [],
  desired_work_formats: [],
  visibility: 'Только я',
};
