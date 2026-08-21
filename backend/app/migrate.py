"""Лёгкие идемпотентные миграции для MVP без Alembic.

create_all() создаёт только отсутствующие таблицы, но не добавляет новые
колонки в уже существующие. Эта функция дополняет схему, не затрагивая
уже сохранённые строки (там, где это возможно, — переносит данные).
"""

from sqlalchemy import inspect, text
from sqlalchemy.engine import Engine


def migrate(engine: Engine) -> None:
    inspector = inspect(engine)

    with engine.begin() as conn:
        conn.execute(
            text(
                """
                ALTER TABLE resumes
                    ADD COLUMN IF NOT EXISTS first_name TEXT DEFAULT '',
                    ADD COLUMN IF NOT EXISTS last_name TEXT DEFAULT '',
                    ADD COLUMN IF NOT EXISTS birth_date TEXT,
                    ADD COLUMN IF NOT EXISTS country TEXT,
                    ADD COLUMN IF NOT EXISTS city TEXT,
                    ADD COLUMN IF NOT EXISTS phone TEXT,
                    ADD COLUMN IF NOT EXISTS contact_email TEXT,
                    ADD COLUMN IF NOT EXISTS portfolio_url TEXT,
                    ADD COLUMN IF NOT EXISTS extra_fields JSON DEFAULT '[]',
                    ADD COLUMN IF NOT EXISTS work_experience JSON DEFAULT '[]',
                    ADD COLUMN IF NOT EXISTS salary_type TEXT DEFAULT 'Фиксированная',
                    ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'Только я'
                """
            )
        )

        vacancy_columns = (
            {c["name"] for c in inspector.get_columns("vacancies")}
            if inspector.has_table("vacancies")
            else set()
        )

        conn.execute(
            text(
                """
                ALTER TABLE vacancies
                    ADD COLUMN IF NOT EXISTS required_skills JSON,
                    ADD COLUMN IF NOT EXISTS preferred_skills JSON DEFAULT '[]'
                """
            )
        )

        # Старые строки (до разделения skills на обязательные/желательные)
        # переносим целиком в required_skills, чтобы не терять данные.
        if "skills" in vacancy_columns:
            conn.execute(
                text(
                    """
                    UPDATE vacancies SET required_skills = skills
                    WHERE required_skills IS NULL AND skills IS NOT NULL
                    """
                )
            )

        conn.execute(
            text("UPDATE vacancies SET required_skills = '[]'::json WHERE required_skills IS NULL")
        )

        # Старая колонка (до разделения на обязательные/желательные) больше
        # не нужна — данные из неё уже перенесены в required_skills выше.
        if "skills" in vacancy_columns:
            conn.execute(text("ALTER TABLE vacancies DROP COLUMN skills"))
