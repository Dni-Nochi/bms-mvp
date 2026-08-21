"""
Подбор вакансий под резюме.

Итоговый процент соответствия складывается из трёх сигналов:
  - пересечение навыков резюме и требуемых навыков вакансии (сколько из
    требуемых навыков закрывает кандидат) — самый весомый сигнал;
  - смысловая близость текста резюме и описания/требований вакансии,
    посчитанная через TF-IDF + косинусное сходство;
  - бонус за совпадение уровня опыта, формата работы и типа занятости.
"""

from dataclasses import dataclass

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.models import Resume, Vacancy

SKILL_WEIGHT = 0.5
TEXT_WEIGHT = 0.35
BONUS_WEIGHT = 0.15


@dataclass
class MatchResult:
    vacancy: Vacancy
    score: int
    matched_skills: list[str]
    missing_skills: list[str]


def _normalize_skills(skills: list[str]) -> set[str]:
    return {s.strip().lower() for s in skills if s.strip()}


def _vacancy_text(vacancy: Vacancy) -> str:
    # Навыки сюда намеренно не включаем: их пересечение уже учитывается
    # отдельным сигналом (skill_score), иначе длинный/шумный список тегов
    # вакансии дважды повлиял бы на итоговый скор и заодно раздувал бы
    # TF-IDF вектор, занижая косинусное сходство по тексту.
    return " ".join([vacancy.title, vacancy.description, vacancy.requirements])


def _resume_text(resume: Resume) -> str:
    return " ".join([resume.title, resume.summary])


def rank_vacancies_for_resume(
    resume: Resume, vacancies: list[Vacancy]
) -> list[MatchResult]:
    if not vacancies:
        return []

    resume_skills = _normalize_skills(resume.skills)

    corpus = [_resume_text(resume)] + [_vacancy_text(v) for v in vacancies]
    vectorizer = TfidfVectorizer()
    try:
        tfidf = vectorizer.fit_transform(corpus)
        text_scores = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()
    except ValueError:
        # Пустой словарь (например, все тексты состоят из стоп-слов) —
        # считаем текстовое сходство нулевым, полагаемся на навыки/бонусы.
        text_scores = [0.0] * len(vacancies)

    results: list[MatchResult] = []
    for vacancy, text_score in zip(vacancies, text_scores):
        vacancy_skills = _normalize_skills(vacancy.skills)
        matched = resume_skills & vacancy_skills
        missing = vacancy_skills - resume_skills

        # F1 навыков: recall — какую долю требований вакансии закрывает
        # кандидат, precision — насколько его собственные навыки релевантны
        # именно этой вакансии. Так длинный список тегов вакансии не топит
        # оценку так же сильно, как чистый recall.
        recall = len(matched) / len(vacancy_skills) if vacancy_skills else 0.0
        precision = len(matched) / len(resume_skills) if resume_skills else 0.0
        skill_score = (
            2 * recall * precision / (recall + precision)
            if (recall + precision) > 0
            else 0.0
        )

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
            + BONUS_WEIGHT * bonus_score
        )
        final_score = max(0.0, min(1.0, final_score))

        results.append(
            MatchResult(
                vacancy=vacancy,
                score=round(final_score * 100),
                matched_skills=sorted(matched),
                missing_skills=sorted(missing),
            )
        )

    results.sort(key=lambda r: r.score, reverse=True)
    return results
