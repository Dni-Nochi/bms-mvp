"""Лёгкие идемпотентные миграции для MVP без Alembic.

create_all() создаёт только отсутствующие таблицы, но не добавляет новые
колонки в уже существующие. Эта функция дополняет схему resumes, не
затрагивая уже сохранённые строки.
"""

from sqlalchemy import text
from sqlalchemy.engine import Engine


def migrate(engine: Engine) -> None:
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
