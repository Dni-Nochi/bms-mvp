"""Нормализация написания навыков: разные названия одного и того же
навыка должны совпадать при подборе ("JS" и "JavaScript" — один навык).

Ключи и значения — уже в нижнем регистре (сравнение регистронезависимое).
"""

SKILL_ALIASES: dict[str, str] = {
    "js": "javascript",
    "ecmascript": "javascript",
    "ts": "typescript",
    "reactjs": "react",
    "react.js": "react",
    "vuejs": "vue",
    "vue.js": "vue",
    "nodejs": "node.js",
    "node": "node.js",
    "nextjs": "next.js",
    "next": "next.js",
    "golang": "go",
    "py": "python",
    "postgres": "postgresql",
    "psql": "postgresql",
    "mongo": "mongodb",
    "k8s": "kubernetes",
    "aws": "amazon aws",
    "amazon web services": "amazon aws",
    "gcp": "google cloud",
    "google cloud platform": "google cloud",
    "azure": "microsoft azure",
    "ml": "machine learning",
    "ai": "artificial intelligence",
    "cv": "computer vision",
    "nlp": "natural language processing",
    "html5": "html",
    "css3": "css",
    "c sharp": "c#",
    "csharp": "c#",
    "cpp": "c++",
    "ci/cd": "cicd",
    "ci\\cd": "cicd",
    "rest": "rest api",
    "restful api": "rest api",
    "ux": "ux/ui",
    "ui": "ux/ui",
    "ui/ux": "ux/ui",
    "unreal": "unreal engine",
    "ue4": "unreal engine",
    "ue5": "unreal engine",
    "sql server": "ms sql",
    "mssql": "ms sql",
    "1c": "1с",
}


def normalize_skill(skill: str) -> str:
    normalized = skill.strip().lower()
    return SKILL_ALIASES.get(normalized, normalized)


def normalize_skills(skills: list[str]) -> set[str]:
    return {normalize_skill(s) for s in skills if s.strip()}
