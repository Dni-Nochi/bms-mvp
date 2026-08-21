from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CompanyOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    logo_letter: str | None
    website: str | None
    description: str | None
    phone: str | None
    industry: str | None
    staff_count: int | None
    headquarters: str | None
    founded_year: int | None


class VacancyOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    requirements: str
    employment_type: str
    work_format: str
    experience_level: str
    salary_min: int | None
    salary_max: int | None
    salary_currency: str | None
    location: str
    language_name: str | None
    language_level: str | None
    required_skills: list[str]
    preferred_skills: list[str]
    created_at: datetime
    company: CompanyOut


class VacancyListOut(BaseModel):
    total: int
    items: list[VacancyOut]


class WorkExperienceEntry(BaseModel):
    company: str = ""
    position: str = ""
    start: str = ""
    end: str = ""
    description: str = ""


class ExtraField(BaseModel):
    label: str
    value: str


class ResumeOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    owner_email: str | None
    first_name: str
    last_name: str
    birth_date: str | None
    country: str | None
    city: str | None
    phone: str | None
    contact_email: str | None
    title: str
    summary: str
    portfolio_url: str | None
    extra_fields: list[ExtraField]
    work_experience: list[WorkExperienceEntry]
    skills: list[str]
    languages: list[str]
    salary_type: str | None
    desired_salary_min: int | None
    desired_salary_max: int | None
    desired_salary_currency: str | None
    experience_level: str
    desired_employment_types: list[str]
    desired_work_formats: list[str]
    visibility: str
    created_at: datetime


class ResumeCreate(BaseModel):
    owner_email: str | None = None
    first_name: str = ""
    last_name: str = ""
    birth_date: str | None = None
    country: str | None = None
    city: str | None = None
    phone: str | None = None
    contact_email: str | None = None
    title: str
    summary: str = ""
    portfolio_url: str | None = None
    extra_fields: list[ExtraField] = []
    work_experience: list[WorkExperienceEntry] = []
    skills: list[str] = []
    languages: list[str] = []
    salary_type: str | None = "Фиксированная"
    desired_salary_min: int | None = None
    desired_salary_max: int | None = None
    desired_salary_currency: str | None = None
    experience_level: str = "Средний"
    desired_employment_types: list[str] = []
    desired_work_formats: list[str] = []
    visibility: str = "Только я"


class ResumeUpdate(ResumeCreate):
    pass


class VacancyMatchOut(BaseModel):
    vacancy: VacancyOut
    match_percentage: int
    matched_skills: list[str]
    missing_skills: list[str]


class VacancyMatchListOut(BaseModel):
    resume_id: int
    total: int
    items: list[VacancyMatchOut]
