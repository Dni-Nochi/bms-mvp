export interface Company {
  id: number;
  name: string;
  logo_letter: string | null;
  website: string | null;
  description: string | null;
  phone: string | null;
  industry: string | null;
  staff_count: number | null;
  headquarters: string | null;
  founded_year: number | null;
}

export interface Vacancy {
  id: number;
  title: string;
  description: string;
  requirements: string;
  employment_type: string;
  work_format: string;
  experience_level: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  location: string;
  language_name: string | null;
  language_level: string | null;
  skills: string[];
  created_at: string;
  company: Company;
}

export interface VacancyListResponse {
  total: number;
  items: Vacancy[];
}

export interface VacancyMatch {
  vacancy: Vacancy;
  match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
}

export interface VacancyMatchListResponse {
  resume_id: number;
  total: number;
  items: VacancyMatch[];
}
