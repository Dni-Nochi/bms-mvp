from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.matching import rank_vacancies_for_resume
from app.models import Resume, Vacancy
from app.schemas import VacancyListOut, VacancyMatchListOut, VacancyMatchOut, VacancyOut

router = APIRouter(prefix="/api/vacancies", tags=["vacancies"])


@router.get("", response_model=VacancyListOut)
def list_vacancies(
    db: Session = Depends(get_db),
    search: str | None = None,
    skill: str | None = None,
    experience_level: str | None = None,
    work_format: str | None = None,
    employment_type: str | None = None,
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    stmt = select(Vacancy).options(joinedload(Vacancy.company))

    if search:
        like = f"%{search.lower()}%"
        stmt = stmt.where(Vacancy.title.ilike(like) | Vacancy.description.ilike(like))
    if experience_level:
        stmt = stmt.where(Vacancy.experience_level == experience_level)
    if work_format:
        stmt = stmt.where(Vacancy.work_format == work_format)
    if employment_type:
        stmt = stmt.where(Vacancy.employment_type == employment_type)

    vacancies = list(db.execute(stmt).unique().scalars().all())

    if skill:
        skill_lower = skill.lower()
        vacancies = [
            v
            for v in vacancies
            if skill_lower in [s.lower() for s in v.required_skills + v.preferred_skills]
        ]

    total = len(vacancies)
    page = vacancies[offset : offset + limit]

    return VacancyListOut(total=total, items=page)


@router.get("/match/{resume_id}", response_model=VacancyMatchListOut)
def match_vacancies(
    resume_id: int,
    db: Session = Depends(get_db),
    limit: int = Query(20, ge=1, le=100),
    min_score: int = Query(0, ge=0, le=100),
):
    """Поиск вакансий с ИИ: ранжирует все вакансии по соответствию резюме."""
    resume = db.get(Resume, resume_id)
    if resume is None:
        raise HTTPException(status_code=404, detail="Резюме не найдено")

    vacancies = list(
        db.execute(select(Vacancy).options(joinedload(Vacancy.company))).unique().scalars().all()
    )

    ranked = rank_vacancies_for_resume(resume, vacancies)
    ranked = [r for r in ranked if r.score >= min_score][:limit]

    items = [
        VacancyMatchOut(
            vacancy=VacancyOut.model_validate(r.vacancy),
            match_percentage=r.score,
            matched_skills=r.matched_skills,
            missing_skills=r.missing_skills,
        )
        for r in ranked
    ]

    return VacancyMatchListOut(resume_id=resume_id, total=len(items), items=items)


@router.get("/{vacancy_id}", response_model=VacancyOut)
def get_vacancy(vacancy_id: int, db: Session = Depends(get_db)):
    vacancy = db.get(
        Vacancy, vacancy_id, options=[joinedload(Vacancy.company)]
    )
    if vacancy is None:
        raise HTTPException(status_code=404, detail="Вакансия не найдена")
    return vacancy
