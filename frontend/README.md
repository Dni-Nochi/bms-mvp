# Frontend (React + FSD)

Учебный проект: React-фронтенд с FSD-архитектурой, упакованный в Docker для локальной разработки.

## Стек

- **React** + **TypeScript**
- **Vite** — сборщик и dev-сервер
- **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`) — управление состоянием
- **React Router** (`react-router-dom`) — маршрутизация
- **Tailwind CSS** — стили
- **FSD** (Feature-Sliced Design) — архитектура проекта

## Структура проекта

```
src/
  app/          # инициализация приложения: store, router, провайдеры
  pages/        # страницы (роуты)
  widgets/      # крупные самостоятельные блоки UI
  features/     # пользовательские сценарии/фичи
  entities/     # бизнес-сущности (например, user)
  shared/       # переиспользуемые утилиты, хуки, UI-кит
```

Алиас `@` указывает на `src` (настроено в `vite.config.ts` и `tsconfig.app.json`).

## Локальная разработка (без Docker)

```bash
npm install
npm run dev
```

## Разработка в Docker

Собрать образ:

```bash
docker build -t frontend:dev .
```

Запустить контейнер с hot reload (монтирует текущую папку внутрь контейнера):

```bash
docker run --rm -p 5200:5173 -v ${PWD}:/app -v /app/node_modules frontend:dev
```

Приложение будет доступно на `http://localhost:5200`.

### Почему нужны два `-v`

- `-v ${PWD}:/app` — монтирует проект с хоста внутрь контейнера, чтобы изменения кода сразу подхватывались.
- `-v /app/node_modules` — отдельный volume поверх `node_modules`, чтобы mount с хоста не затирал зависимости, установленные внутри контейнера при сборке образа.

## Redux Toolkit

Стор собирается в `src/app/store`. Слайсы живут рядом со своей сущностью/фичей (например, `src/entities/user/model/slice.ts`) и подключаются в `store/index.ts`.

Типизированные хуки — `src/shared/lib/hooks/redux.ts` (`useAppDispatch`, `useAppSelector`).

## React Router

_Статус: пакет установлен, интеграция ещё не завершена._

Планируется:

- `src/app/providers/router/routeConfig.tsx` — конфиг маршрутов
- `src/app/providers/router/RouterProvider.tsx` — провайдер
- Страницы в `src/pages/<page-name>/`, экспортируемые через `index.ts`

## TODO

- [ ] Подключить React Router в `main.tsx`
- [ ] Настроить `.dockerignore` (`node_modules`, `dist`, `.git`)
- [ ] Продакшен-сборка образа (multi-stage build + nginx)
