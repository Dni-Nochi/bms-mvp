from datetime import datetime, timezone

from sqlalchemy import JSON, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

# Допустимые значения (не как жёсткий Enum в БД, чтобы не усложнять MVP,
# но используются согласованно в seed-данных и API-фильтрах).
EMPLOYMENT_TYPES = ["Почасовая", "Частичная", "Полная"]
WORK_FORMATS = ["Офисный", "Удаленный", "Гибридный"]
EXPERIENCE_LEVELS = ["Начальный", "Средний", "Эксперт"]


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Company(Base):
    __tablename__ = "companies"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(Text)
    logo_letter: Mapped[str | None] = mapped_column(Text, default=None)
    website: Mapped[str | None] = mapped_column(Text, default=None)
    description: Mapped[str | None] = mapped_column(Text, default=None)
    phone: Mapped[str | None] = mapped_column(Text, default=None)
    industry: Mapped[str | None] = mapped_column(Text, default=None)
    staff_count: Mapped[int | None] = mapped_column(default=None)
    headquarters: Mapped[str | None] = mapped_column(Text, default=None)
    founded_year: Mapped[int | None] = mapped_column(default=None)

    vacancies: Mapped[list["Vacancy"]] = relationship(back_populates="company")


class Vacancy(Base):
    __tablename__ = "vacancies"

    id: Mapped[int] = mapped_column(primary_key=True)
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"))

    title: Mapped[str] = mapped_column(Text)
    description: Mapped[str] = mapped_column(Text)
    requirements: Mapped[str] = mapped_column(Text)

    employment_type: Mapped[str] = mapped_column(Text)  # см. EMPLOYMENT_TYPES
    work_format: Mapped[str] = mapped_column(Text)  # см. WORK_FORMATS
    experience_level: Mapped[str] = mapped_column(Text)  # см. EXPERIENCE_LEVELS

    salary_min: Mapped[int | None] = mapped_column(default=None)
    salary_max: Mapped[int | None] = mapped_column(default=None)
    salary_currency: Mapped[str | None] = mapped_column(Text, default=None)

    location: Mapped[str] = mapped_column(Text)
    language_name: Mapped[str | None] = mapped_column(Text, default=None)
    language_level: Mapped[str | None] = mapped_column(Text, default=None)

    skills: Mapped[list[str]] = mapped_column(JSON, default=list)

    created_at: Mapped[datetime] = mapped_column(default=utcnow)

    company: Mapped["Company"] = relationship(back_populates="vacancies")


class Resume(Base):
    __tablename__ = "resumes"

    id: Mapped[int] = mapped_column(primary_key=True)
    owner_email: Mapped[str | None] = mapped_column(Text, default=None)

    # Личная информация
    first_name: Mapped[str] = mapped_column(Text, default="")
    last_name: Mapped[str] = mapped_column(Text, default="")
    birth_date: Mapped[str | None] = mapped_column(Text, default=None)
    country: Mapped[str | None] = mapped_column(Text, default=None)
    city: Mapped[str | None] = mapped_column(Text, default=None)

    # Контакты
    phone: Mapped[str | None] = mapped_column(Text, default=None)
    contact_email: Mapped[str | None] = mapped_column(Text, default=None)

    # Резюме
    title: Mapped[str] = mapped_column(Text)  # Должность
    summary: Mapped[str] = mapped_column(Text)  # Описание
    portfolio_url: Mapped[str | None] = mapped_column(Text, default=None)
    extra_fields: Mapped[list[dict]] = mapped_column(JSON, default=list)

    # Опыт работы
    work_experience: Mapped[list[dict]] = mapped_column(JSON, default=list)

    # Навыки и языки
    skills: Mapped[list[str]] = mapped_column(JSON, default=list)
    languages: Mapped[list[str]] = mapped_column(JSON, default=list)

    # Зарплата
    salary_type: Mapped[str | None] = mapped_column(Text, default="Фиксированная")
    desired_salary_min: Mapped[int | None] = mapped_column(default=None)
    desired_salary_max: Mapped[int | None] = mapped_column(default=None)
    desired_salary_currency: Mapped[str | None] = mapped_column(default=None)

    # Рабочие предпочтения
    experience_level: Mapped[str] = mapped_column(Text)
    desired_employment_types: Mapped[list[str]] = mapped_column(JSON, default=list)
    desired_work_formats: Mapped[list[str]] = mapped_column(JSON, default=list)

    # Видимость
    visibility: Mapped[str] = mapped_column(Text, default="Только я")

    created_at: Mapped[datetime] = mapped_column(default=utcnow)
