export interface Resume {
  id: number;
  owner_email: string | null;
  title: string;
  summary: string;
  skills: string[];
  experience_level: string;
  desired_employment_types: string[];
  desired_work_formats: string[];
  languages: string[];
  desired_salary_min: number | null;
  desired_salary_max: number | null;
  desired_salary_currency: string | null;
  created_at: string;
}
