"""Данные для наполнения БД: компании, вакансии, демо-резюме."""

COMPANIES = [
    {
        "key": "cosmo_world",
        "name": "Cosmo World",
        "logo_letter": "C",
        "website": "https://psystems.biz/",
        "phone": "+0000000008",
        "industry": "IT",
        "staff_count": 4000,
        "headquarters": "Angola, Benguela",
        "founded_year": 2006,
        "description": (
            "🚀Welcome to the future of space technology!🚀\n\n"
            "We are an advanced space IT company where innovation meets the "
            "limitless possibilities of outer space. Our mission is to develop "
            "advanced technologies and solutions that make space exploration "
            "more accessible and efficient.\n\n"
            "What are we doing?:\n\n"
            "We create software for managing space missions and spacecraft.\n\n"
            "We are developing communication and navigation systems for "
            "interplanetary travel.\n\n"
            "We are researching and implementing new methods for analyzing "
            "data from space telescopes and probes.\n\n"
            "We are developing VR/AR technologies for astronaut training and "
            "visualization of space objects.\n\n"
            "Why work with us?\n\n"
            "Innovation and development: You will be at the center of events, "
            "where every day brings new challenges and opportunities for "
            "growth, working alongside the best experts in the field of space "
            "technology and IT, ready to share their experience and "
            "knowledge.\n\n"
            "Opportunities for growth: We offer not only interesting tasks, "
            "but also opportunities for professional and career growth.\n\n"
            "Innovative working conditions: Flexible schedule, modern tools "
            "and equipment for work.\n\n"
            "Our culture:\n"
            "We value creativity, openness to new ideas, and striving for "
            "excellence. In our company, every employee has the opportunity "
            "to influence the development of projects and the company as a "
            "whole.\n\n"
            "Join us and become part of a team that is changing the "
            "perception of the possibilities of space technology!\n\n"
            "🚀The future begins here!🚀"
        ),
    },
    {
        "key": "perfect_systems",
        "name": "Perfect Systems",
        "logo_letter": "P",
        "website": "https://perfectsystems.example.com/",
        "phone": "+7 000 000 00 01",
        "industry": "Финансы",
        "staff_count": 250,
        "headquarters": "Russia, Moscow",
        "founded_year": 2012,
        "description": (
            "Perfect Systems — финансовая компания, автоматизирующая учёт и "
            "отчётность для среднего бизнеса. Мы строим удобные внутренние "
            "инструменты и ценим внимательность к деталям."
        ),
    },
    {
        "key": "technova",
        "name": "TechNova",
        "logo_letter": "T",
        "website": "https://technova.example.com/",
        "phone": "+7 000 000 00 02",
        "industry": "IT",
        "staff_count": 600,
        "headquarters": "Kazakhstan, Almaty",
        "founded_year": 2015,
        "description": (
            "TechNova разрабатывает веб- и мобильные продукты для клиентов "
            "из Центральной Азии и Европы. Кросс-функциональные команды, "
            "современный стек, гибкий график."
        ),
    },
    {
        "key": "dataforge",
        "name": "DataForge",
        "logo_letter": "D",
        "website": "https://dataforge.example.com/",
        "phone": "+996 000 000 003",
        "industry": "IT",
        "staff_count": 180,
        "headquarters": "Kyrgyzstan, Bishkek",
        "founded_year": 2018,
        "description": (
            "DataForge создаёт backend-платформы и модели машинного обучения "
            "для e-commerce и финтех-клиентов. Небольшие продуктовые команды "
            "с полной ответственностью за результат."
        ),
    },
    {
        "key": "cloudbridge",
        "name": "CloudBridge",
        "logo_letter": "B",
        "website": "https://cloudbridge.example.com/",
        "phone": "+1 000 000 0004",
        "industry": "IT",
        "staff_count": 90,
        "headquarters": "Estonia, Tallinn",
        "founded_year": 2019,
        "description": (
            "CloudBridge — полностью удалённая команда, строящая облачную "
            "инфраструктуру и SaaS-продукты для клиентов по всему миру."
        ),
    },
    {
        "key": "insightlab",
        "name": "InsightLab",
        "logo_letter": "I",
        "website": "https://insightlab.example.com/",
        "phone": "+7 000 000 00 05",
        "industry": "Аналитика",
        "staff_count": 120,
        "headquarters": "Russia, Saint Petersburg",
        "founded_year": 2017,
        "description": (
            "InsightLab помогает компаниям принимать решения на основе "
            "данных: аналитика, BI-дашборды, маркетинговые исследования."
        ),
    },
]

VACANCIES = [
    {
        "company_key": "cosmo_world",
        "title": "VR AR Engineer",
        "employment_type": "Полная",
        "work_format": "Офисный",
        "experience_level": "Эксперт",
        "salary_min": 2500,
        "salary_max": 3500,
        "salary_currency": "EUR",
        "location": "Angola, Benguela",
        "language_name": "Albanian",
        "language_level": "C1 - Продвинутый",
        "required_skills": [
            "C#", "C++", "Unity", "Unreal Engine", "ARKit", "ARCore",
            "3D Modeling", "UX/UI",
        ],
        "preferred_skills": [
            "Ajax", "Amazon AWS", "Angular", "Atlassian Confluence",
            "Atlassian Jira", "BDD", "Bitbucket", "Bootstrap", "LESS",
            "Laravel", "Linux", "Lumen", "Microservices", "Microsoft Azure",
            "MariaDB", "Memcached", "MS SQL", "MVC", "MySQL", "NoSql",
            "Oracle", "Phalcon", "PHP", "PostgreSQL", "Python", "Qt", "TDD",
            "Terraform", "Ubuntu",
        ],
        "description": (
            "Interesting and challenging tasks: Development of advanced "
            "VR/AR applications for various platforms (Unity, Unreal Engine, "
            "ARKit, ARCore).\n\n"
            "Creative freedom: The opportunity to implement your own ideas "
            "and participate in innovative projects.\n\n"
            "Professional growth: Training and skill development using the "
            "latest technologies and tools.\n\n"
            "Teamwork: Collaboration with talented specialists in the field "
            "of UX/UI design, 3D modeling and programming.\n\n"
            "Flexible schedule: The ability to work in a convenient format, "
            "including remote work.\n\n"
            "A friendly and creative team. A modern office with recreation "
            "areas and all necessary equipment.\n\n"
            "Join our team and become a part of creating the future of "
            "virtual and augmented reality! 🧑‍🚀🌍"
        ),
        "requirements": (
            "Requirements for the candidate:\n\n"
            "At least 2 years of experience in VR/AR development.\n"
            "Knowledge of C#, C++ or JavaScript programming languages.\n"
            "Experience working with Unity or Unreal Engine.\n"
            "3D modeling and animation skills.\n"
            "Understanding the principles of UX/UI design.\n"
            "Creativity and the desire to learn new things.\n"
            "Excellent communication skills and teamwork skills.\n\n"
            "What we expect:\n\n"
            "Initiative and commitment to innovation.\n"
            "Ability to solve complex technical problems.\n"
            "The ability to work on a tight schedule and manage time "
            "effectively.\n"
            "The desire to develop and implement new ideas in projects."
        ),
    },
    {
        "company_key": "perfect_systems",
        "title": "Ассистент финансового отдела",
        "employment_type": "Полная",
        "work_format": "Удаленный",
        "experience_level": "Начальный",
        "salary_min": 80000,
        "salary_max": None,
        "salary_currency": "RUB",
        "location": "Russia, Moscow",
        "language_name": "English",
        "language_level": "B1 - Средний",
        "required_skills": ["MS Excel", "1С", "Деловые коммуникации"],
        "preferred_skills": ["Стрессоустойчивость", "Проактивность", "Критическое мышление"],
        "description": (
            "Опыт работы: 1-3 года. Полная занятость. График: 5/2.\n\n"
            "Вам предстоит вести первичную документацию, помогать в "
            "подготовке отчётности и взаимодействовать с другими отделами "
            "по финансовым вопросам."
        ),
        "requirements": (
            "Уверенное владение MS Excel и 1С.\n"
            "Внимательность к деталям и стрессоустойчивость.\n"
            "Готовность работать удалённо в команде."
        ),
    },
    {
        "company_key": "technova",
        "title": "Frontend-разработчик (React)",
        "employment_type": "Полная",
        "work_format": "Удаленный",
        "experience_level": "Средний",
        "salary_min": 1500,
        "salary_max": 2200,
        "salary_currency": "USD",
        "location": "Kazakhstan, Almaty",
        "language_name": "English",
        "language_level": "B2 - Выше среднего",
        "required_skills": ["JavaScript", "TypeScript", "React", "Redux", "REST API"],
        "preferred_skills": ["HTML", "CSS", "Git", "Webpack", "Jest"],
        "description": (
            "Разработка и поддержка пользовательских интерфейсов для "
            "B2B-платформы на React и TypeScript. Работа в кроссфункциональной "
            "команде с продуктовым подходом."
        ),
        "requirements": (
            "От 2 лет опыта коммерческой разработки на React.\n"
            "Уверенное знание TypeScript, Redux, REST API.\n"
            "Опыт покрытия кода тестами (Jest)."
        ),
    },
    {
        "company_key": "dataforge",
        "title": "Backend-разработчик (Python)",
        "employment_type": "Полная",
        "work_format": "Гибридный",
        "experience_level": "Средний",
        "salary_min": 1200,
        "salary_max": 1800,
        "salary_currency": "USD",
        "location": "Kyrgyzstan, Bishkek",
        "language_name": "English",
        "language_level": "B1 - Средний",
        "required_skills": ["Python", "FastAPI", "PostgreSQL", "REST API"],
        "preferred_skills": ["Docker", "Git", "Redis", "SQLAlchemy", "Linux"],
        "description": (
            "Разработка backend-сервисов на FastAPI для e-commerce платформы: "
            "API, интеграции с внешними сервисами, оптимизация запросов к БД."
        ),
        "requirements": (
            "От 2 лет опыта на Python.\n"
            "Опыт работы с FastAPI или аналогичным фреймворком, PostgreSQL, "
            "Docker.\n"
            "Понимание принципов проектирования REST API."
        ),
    },
    {
        "company_key": "cloudbridge",
        "title": "Fullstack-разработчик (Node.js/React)",
        "employment_type": "Полная",
        "work_format": "Удаленный",
        "experience_level": "Средний",
        "salary_min": 2000,
        "salary_max": 2800,
        "salary_currency": "USD",
        "location": "Remote",
        "language_name": "English",
        "language_level": "B2 - Выше среднего",
        "required_skills": ["JavaScript", "TypeScript", "Node.js", "React"],
        "preferred_skills": ["MongoDB", "Docker", "Git", "REST API", "Amazon AWS"],
        "description": (
            "Разработка SaaS-продукта целиком: от API на Node.js до "
            "интерфейса на React. Полностью удалённая команда, асинхронная "
            "коммуникация."
        ),
        "requirements": (
            "От 3 лет коммерческой fullstack-разработки.\n"
            "Уверенное знание JavaScript/TypeScript, Node.js, React.\n"
            "Опыт работы с облачной инфраструктурой (AWS)."
        ),
    },
    {
        "company_key": "insightlab",
        "title": "Data Analyst",
        "employment_type": "Полная",
        "work_format": "Офисный",
        "experience_level": "Начальный",
        "salary_min": 90000,
        "salary_max": None,
        "salary_currency": "RUB",
        "location": "Russia, Saint Petersburg",
        "language_name": "English",
        "language_level": "A2 - Элементарный",
        "required_skills": ["SQL", "Excel"],
        "preferred_skills": ["Python", "Power BI", "Tableau", "Pandas", "Статистика"],
        "description": (
            "Анализ данных клиентов, построение дашбордов и отчётов для "
            "маркетингового отдела, поиск точек роста в воронке продаж."
        ),
        "requirements": (
            "Уверенное знание SQL и Excel.\n"
            "Базовые навыки Python (pandas) приветствуются.\n"
            "Опыт работы с BI-инструментами — плюс."
        ),
    },
    {
        "company_key": "cosmo_world",
        "title": "UX/UI дизайнер",
        "employment_type": "Полная",
        "work_format": "Гибридный",
        "experience_level": "Средний",
        "salary_min": 1800,
        "salary_max": 2500,
        "salary_currency": "EUR",
        "location": "Angola, Benguela",
        "language_name": "English",
        "language_level": "B2 - Выше среднего",
        "required_skills": ["Figma", "UX Research", "UX/UI"],
        "preferred_skills": ["Adobe XD", "Photoshop", "Prototyping", "Design Systems"],
        "description": (
            "Проектирование интерфейсов для VR/AR приложений и сопутствующих "
            "веб-сервисов космической тематики. Тесная работа с командой "
            "разработки."
        ),
        "requirements": (
            "Портфолио с проектами в Figma.\n"
            "Опыт проведения UX-исследований и построения дизайн-систем.\n"
            "Понимание специфики интерфейсов для VR/AR — плюс."
        ),
    },
    {
        "company_key": "cloudbridge",
        "title": "DevOps-инженер",
        "employment_type": "Полная",
        "work_format": "Удаленный",
        "experience_level": "Эксперт",
        "salary_min": 3000,
        "salary_max": 4000,
        "salary_currency": "USD",
        "location": "Remote",
        "language_name": "English",
        "language_level": "C1 - Продвинутый",
        "required_skills": ["Docker", "Kubernetes", "Terraform", "Amazon AWS"],
        "preferred_skills": ["CI/CD", "Linux", "Python", "Ansible", "Microservices"],
        "description": (
            "Проектирование и поддержка облачной инфраструктуры на AWS: "
            "CI/CD пайплайны, Kubernetes-кластеры, мониторинг и алертинг."
        ),
        "requirements": (
            "От 4 лет опыта в DevOps/SRE.\n"
            "Экспертное владение Docker, Kubernetes, Terraform.\n"
            "Опыт построения CI/CD и работы с AWS."
        ),
    },
    {
        "company_key": "technova",
        "title": "QA Engineer (Manual + Automation)",
        "employment_type": "Полная",
        "work_format": "Офисный",
        "experience_level": "Средний",
        "salary_min": 1000,
        "salary_max": 1500,
        "salary_currency": "USD",
        "location": "Kazakhstan, Almaty",
        "language_name": "English",
        "language_level": "B1 - Средний",
        "required_skills": ["Selenium", "BDD", "TDD"],
        "preferred_skills": ["Postman", "TestRail", "JavaScript", "Atlassian Jira", "Git"],
        "description": (
            "Тестирование веб- и мобильных продуктов компании: ручное "
            "тестирование, разработка автотестов, участие в приёмке фич."
        ),
        "requirements": (
            "Опыт написания тест-кейсов и автотестов на Selenium.\n"
            "Знание принципов BDD/TDD.\n"
            "Умение работать с Jira и TestRail."
        ),
    },
    {
        "company_key": "dataforge",
        "title": "Mobile-разработчик (Flutter)",
        "employment_type": "Частичная",
        "work_format": "Удаленный",
        "experience_level": "Средний",
        "salary_min": 1000,
        "salary_max": 1600,
        "salary_currency": "USD",
        "location": "Kyrgyzstan, Bishkek",
        "language_name": "English",
        "language_level": "B1 - Средний",
        "required_skills": ["Flutter", "Dart"],
        "preferred_skills": ["REST API", "Firebase", "Git", "iOS", "Android"],
        "description": (
            "Разработка кроссплатформенного мобильного приложения для "
            "маркетплейса на Flutter, интеграция с REST API и Firebase."
        ),
        "requirements": (
            "От 1.5 лет опыта на Flutter/Dart.\n"
            "Опыт публикации приложений в App Store и Google Play.\n"
            "Знание REST API и Firebase."
        ),
    },
    {
        "company_key": "cosmo_world",
        "title": "Game Developer (Unity)",
        "employment_type": "Полная",
        "work_format": "Офисный",
        "experience_level": "Эксперт",
        "salary_min": 2200,
        "salary_max": 3000,
        "salary_currency": "EUR",
        "location": "Angola, Benguela",
        "language_name": "English",
        "language_level": "B2 - Выше среднего",
        "required_skills": ["C#", "Unity"],
        "preferred_skills": ["3D Modeling", "Game Design", "Physics", "Shaders", "Unreal Engine"],
        "description": (
            "Разработка обучающих VR-симуляций для подготовки космонавтов: "
            "физика, шейдеры, игровая логика на Unity."
        ),
        "requirements": (
            "От 3 лет опыта разработки на Unity, C#.\n"
            "Опыт работы с 3D-графикой и шейдерами.\n"
            "Понимание принципов игрового дизайна."
        ),
    },
    {
        "company_key": "perfect_systems",
        "title": "HR-менеджер",
        "employment_type": "Полная",
        "work_format": "Офисный",
        "experience_level": "Средний",
        "salary_min": 100000,
        "salary_max": None,
        "salary_currency": "RUB",
        "location": "Russia, Moscow",
        "language_name": "English",
        "language_level": "B1 - Средний",
        "required_skills": ["Подбор персонала", "Трудовое право"],
        "preferred_skills": ["Собеседования", "HR-аналитика", "Деловые коммуникации"],
        "description": (
            "Полный цикл подбора персонала для IT- и финансовых отделов "
            "компании, ведение HR-аналитики и адаптация новых сотрудников."
        ),
        "requirements": (
            "От 2 лет опыта в подборе персонала.\n"
            "Знание основ трудового права.\n"
            "Отличные коммуникативные навыки."
        ),
    },
    {
        "company_key": "insightlab",
        "title": "Маркетолог",
        "employment_type": "Частичная",
        "work_format": "Удаленный",
        "experience_level": "Начальный",
        "salary_min": 60000,
        "salary_max": None,
        "salary_currency": "RUB",
        "location": "Russia, Saint Petersburg",
        "language_name": "English",
        "language_level": "B1 - Средний",
        "required_skills": ["SMM", "SEO"],
        "preferred_skills": ["Контент-маркетинг", "Google Analytics", "Копирайтинг"],
        "description": (
            "Ведение соцсетей компании, подготовка контент-плана, базовая "
            "SEO-оптимизация и анализ эффективности кампаний."
        ),
        "requirements": (
            "Опыт ведения соцсетей от 1 года.\n"
            "Базовое понимание SEO и Google Analytics.\n"
            "Грамотная письменная речь."
        ),
    },
    {
        "company_key": "dataforge",
        "title": "Machine Learning Engineer",
        "employment_type": "Полная",
        "work_format": "Гибридный",
        "experience_level": "Эксперт",
        "salary_min": 2500,
        "salary_max": 3500,
        "salary_currency": "USD",
        "location": "Kyrgyzstan, Bishkek",
        "language_name": "English",
        "language_level": "C1 - Продвинутый",
        "required_skills": ["Python", "TensorFlow", "PyTorch"],
        "preferred_skills": ["Scikit-learn", "Pandas", "NumPy", "Docker", "SQL"],
        "description": (
            "Разработка и внедрение ML-моделей для прогнозирования спроса "
            "и рекомендательной системы e-commerce платформы."
        ),
        "requirements": (
            "От 3 лет опыта в ML/Data Science.\n"
            "Уверенное владение Python, TensorFlow или PyTorch.\n"
            "Опыт вывода моделей в продакшн."
        ),
    },
]

RESUMES = [
    {
        "owner_email": "bekbolbeishenaliev37@gmail.com",
        "first_name": "Азамат",
        "last_name": "Бекболбеишенлиев",
        "birth_date": "1998-04-12",
        "country": "Кыргызстан",
        "city": "Бишкек",
        "phone": "+996 700 123 456",
        "contact_email": "bekbolbeishenaliev37@gmail.com",
        "title": "Frontend-разработчик (React/TypeScript)",
        "summary": (
            "Frontend-разработчик с опытом создания SPA-приложений на React "
            "и TypeScript, интеграции REST API и покрытия кода тестами. "
            "Работал в agile-командах, знаком с CI/CD и контейнеризацией."
        ),
        "portfolio_url": "https://github.com/azamat-dev",
        "work_experience": [
            {
                "company": "TechNova",
                "position": "Frontend-разработчик",
                "start": "2023-02",
                "end": "",
                "description": "Разработка B2B-платформы на React и TypeScript.",
            },
        ],
        "skills": [
            "JavaScript", "TypeScript", "React", "Redux", "HTML", "CSS",
            "Git", "REST API", "Node.js", "Docker",
        ],
        "experience_level": "Средний",
        "desired_employment_types": ["Полная"],
        "desired_work_formats": ["Удаленный"],
        "languages": ["English B2"],
        "salary_type": "Фиксированная",
        "desired_salary_min": 1500,
        "desired_salary_max": 2500,
        "desired_salary_currency": "USD",
        "visibility": "Только я",
    },
    {
        "owner_email": None,
        "first_name": "Диас",
        "last_name": "Нурланов",
        "birth_date": "1995-09-03",
        "country": "Казахстан",
        "city": "Алматы",
        "phone": "+7 701 555 22 33",
        "contact_email": "d.nurlanov@example.com",
        "title": "VR/AR Engineer (Unity/Unreal)",
        "summary": (
            "Инженер по разработке VR/AR приложений: Unity, Unreal Engine, "
            "3D-моделирование, опыт разработки обучающих симуляций и "
            "интерактивных сцен для промышленных и образовательных задач."
        ),
        "portfolio_url": "https://artstation.com/dias-vr",
        "work_experience": [
            {
                "company": "Cosmo World",
                "position": "VR/AR Engineer",
                "start": "2021-06",
                "end": "",
                "description": "Разработка VR-симуляций для подготовки космонавтов.",
            },
        ],
        "skills": [
            "C#", "C++", "Unity", "Unreal Engine", "3D Modeling", "UX/UI",
            "JavaScript", "Git",
        ],
        "experience_level": "Эксперт",
        "desired_employment_types": ["Полная"],
        "desired_work_formats": ["Офисный"],
        "languages": ["English B2", "Albanian A2"],
        "salary_type": "Фиксированная",
        "desired_salary_min": 2500,
        "desired_salary_max": 3500,
        "desired_salary_currency": "EUR",
        "visibility": "Все пользователи BMS",
    },
    {
        "owner_email": None,
        "first_name": "Амина",
        "last_name": "Сатыбалдиева",
        "birth_date": "2000-01-20",
        "country": "Кыргызстан",
        "city": "Бишкек",
        "phone": "+996 555 987 654",
        "contact_email": "amina.s@example.com",
        "title": "Data Analyst / ML специалист",
        "summary": (
            "Аналитик данных с интересом к машинному обучению: построение "
            "отчётов и дашбордов, анализ пользовательских метрик, базовые "
            "модели прогнозирования на Python."
        ),
        "portfolio_url": None,
        "work_experience": [],
        "skills": [
            "Python", "SQL", "Pandas", "NumPy", "Power BI", "Excel",
            "Статистика", "Scikit-learn",
        ],
        "experience_level": "Начальный",
        "desired_employment_types": ["Полная", "Частичная"],
        "desired_work_formats": ["Удаленный"],
        "languages": ["English A2"],
        "salary_type": "Фиксированная",
        "desired_salary_min": 800,
        "desired_salary_max": 1400,
        "desired_salary_currency": "USD",
        "visibility": "Только я",
    },
]
