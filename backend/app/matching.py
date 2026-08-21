"""
Подбор вакансий под резюме.

Итоговый процент соответствия складывается из четырёх сигналов:
  - пересечение навыков (обязательные весят больше, чем желательные) —
    самый весомый сигнал;
  - смысловая близость текста резюме и вакансии через мультиязычные
    sentence-эмбеддинги (не зависит от того, на каком языке написан
    текст — резюме на русском и вакансия на английском всё ещё
    сравниваются по смыслу);
  - пересечение зарплатных ожиданий кандидата с вилкой вакансии;
  - формальные совпадения: уровень опыта, формат работы, тип занятости.
"""

from dataclasses import dataclass

import numpy as np

from app.embeddings import cosine_similarity_matrix, encode
from app.models import Resume, Vacancy
from app.skill_synonyms import normalize_skills

SKILL_WEIGHT = 0.45
TEXT_WEIGHT = 0.30
SALARY_WEIGHT = 0.10
BONUS_WEIGHT = 0.15

# Обязательные навыки весят вдвое больше желательных при подсчёте recall:
# отсутствие "must have" должно бить по оценке сильнее, чем отсутствие
# "плюсом будет".
REQUIRED_SKILL_WEIGHT = 2.0
PREFERRED_SKILL_WEIGHT = 1.0

# Грубый перевод валют в доллары США — только для сравнения диапазонов
# зарплат между собой, не для отображения где-либо.
CURRENCY_TO_USD = {
    "USD": 1.0,
    "EUR": 1.08,
    "RUB": 0.011,
    "KZT": 0.002,
}

_vacancy_embedding_cache: dict[int, np.ndarray] = {}


@dataclass
class MatchResult:
    vacancy: Vacancy
    score: int
    matched_skills: list[str]
    missing_skills: list[str]


def _vacancy_text(vacancy: Vacancy) -> str:
    # Навыки сюда намеренно не включаем: их пересечение уже учитывается
    # отдельным сигналом (skill_score).
    return " ".join([vacancy.title, vacancy.description, vacancy.requirements])


def _resume_text(resume: Resume) -> str:
    return " ".join([resume.title, resume.summary])


def _skill_score(
    resume_skills: set[str], required: set[str], preferred: set[str]
) -> tuple[float, list[str], list[str]]:
    all_vacancy_skills = required | preferred
    matched = resume_skills & all_vacancy_skills
    missing = all_vacancy_skills - resume_skills

    matched_weight = (
        len(resume_skills & required) * REQUIRED_SKILL_WEIGHT
        + len(resume_skills & preferred) * PREFERRED_SKILL_WEIGHT
    )
    total_weight = len(required) * REQUIRED_SKILL_WEIGHT + len(preferred) * PREFERRED_SKILL_WEIGHT
    recall = matched_weight / total_weight if total_weight else 0.0

    precision = len(matched) / len(resume_skills) if resume_skills else 0.0

    score = 2 * recall * precision / (recall + precision) if (recall + precision) > 0 else 0.0
    return score, sorted(matched), sorted(missing)


def _to_usd(amount: int, currency: str | None) -> float:
    rate = CURRENCY_TO_USD.get((currency or "USD").upper(), 1.0)
    return amount * rate


def _salary_overlap_score(resume: Resume, vacancy: Vacancy) -> float:
    if resume.desired_salary_min is None or vacancy.salary_min is None:
        # Недостаточно данных для сравнения — не наказываем и не поощряем.
        return 0.5

    r_min = _to_usd(resume.desired_salary_min, resume.desired_salary_currency)
    r_max = _to_usd(
        resume.desired_salary_max or resume.desired_salary_min, resume.desired_salary_currency
    )
    v_min = _to_usd(vacancy.salary_min, vacancy.salary_currency)
    v_max = _to_usd(vacancy.salary_max or vacancy.salary_min, vacancy.salary_currency)

    if r_max >= v_min and v_max >= r_min:
        return 1.0  # диапазоны пересекаются

    span = max(r_max, v_max) - min(r_min, v_min)
    if span <= 0:
        return 0.5
    gap = min(abs(r_min - v_max), abs(v_min - r_max))
    return max(0.0, 1 - gap / span)


def _get_vacancy_embeddings(vacancies: list[Vacancy]) -> np.ndarray:
    missing = [v for v in vacancies if v.id not in _vacancy_embedding_cache]
    if missing:
        vectors = encode([_vacancy_text(v) for v in missing])
        for vacancy, vector in zip(missing, vectors):
            _vacancy_embedding_cache[vacancy.id] = vector
    return np.stack([_vacancy_embedding_cache[v.id] for v in vacancies])


def rank_vacancies_for_resume(resume: Resume, vacancies: list[Vacancy]) -> list[MatchResult]:
    if not vacancies:
        return []

    resume_skills = normalize_skills(resume.skills)

    resume_embedding = encode([_resume_text(resume)])[0]
    vacancy_embeddings = _get_vacancy_embeddings(vacancies)
    text_scores = cosine_similarity_matrix(resume_embedding, vacancy_embeddings)

    results: list[MatchResult] = []
    for vacancy, text_score in zip(vacancies, text_scores):
        required = normalize_skills(vacancy.required_skills)
        preferred = normalize_skills(vacancy.preferred_skills)
        skill_score, matched, missing = _skill_score(resume_skills, required, preferred)

        salary_score = _salary_overlap_score(resume, vacancy)

        bonus_hits = 0
        bonus_total = 3
        if resume.experience_level == vacancy.experience_level:
            bonus_hits += 1
        if vacancy.work_format in resume.desired_work_formats:
            bonus_hits += 1
        if vacancy.employment_type in resume.desired_employment_types:
            bonus_hits += 1
        bonus_score = bonus_hits / bonus_total

        final_score = (
            SKILL_WEIGHT * skill_score
            + TEXT_WEIGHT * float(text_score)
            + SALARY_WEIGHT * salary_score
            + BONUS_WEIGHT * bonus_score
        )
        final_score = max(0.0, min(1.0, final_score))

        results.append(
            MatchResult(
                vacancy=vacancy,
                score=round(final_score * 100),
                matched_skills=matched,
                missing_skills=missing,
            )
        )

    results.sort(key=lambda r: r.score, reverse=True)
    return results
