"""Наполняет БД демо-компаниями, вакансиями и резюме.

Запуск: python -m app.seed
Идемпотентно: если вакансии уже есть в БД, ничего не делает.
"""

from app.database import Base, SessionLocal, engine
from app.migrate import migrate
from app.models import Company, Resume, Vacancy
from app.seed_data import COMPANIES, RESUMES, VACANCIES


def seed(db) -> None:
    if db.query(Vacancy).first() is not None:
        print("Вакансии уже есть в БД, сидирование пропущено.")
        return

    companies_by_key = {}
    for company_data in COMPANIES:
        data = dict(company_data)
        key = data.pop("key")
        company = Company(**data)
        db.add(company)
        companies_by_key[key] = company

    db.flush()  # получаем company.id

    for vacancy_data in VACANCIES:
        data = dict(vacancy_data)
        company_key = data.pop("company_key")
        vacancy = Vacancy(company_id=companies_by_key[company_key].id, **data)
        db.add(vacancy)

    for resume_data in RESUMES:
        db.add(Resume(**resume_data))

    db.commit()
    print(
        f"Добавлено: {len(COMPANIES)} компаний, "
        f"{len(VACANCIES)} вакансий, {len(RESUMES)} резюме."
    )


def main() -> None:
    Base.metadata.create_all(bind=engine)
    migrate(engine)
    db = SessionLocal()
    try:
        seed(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()
