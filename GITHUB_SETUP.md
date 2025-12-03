# Инструкция по настройке GitHub репозитория

## Шаги для деплоя в GitHub

### 1. Создание репозитория

```bash
# Инициализация git (если еще не сделано)
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: Nexus Vita - полная версия с демо-режимом"

# Добавление remote (замените на ваш URL)
git remote add origin https://github.com/yourusername/nexus-vita.git

# Push в GitHub
git branch -M main
git push -u origin main
```

### 2. Настройка GitHub Secrets

В настройках репозитория (Settings → Secrets and variables → Actions) добавьте:

- `DATABASE_URL` - URL базы данных PostgreSQL
- `JWT_SECRET` - Секретный ключ для JWT
- `API_URL` - URL бэкенд API (для фронтенда)

### 3. GitHub Actions

CI/CD уже настроен через файлы:
- `.github/workflows/ci.yml` - проверка кода
- `.github/workflows/deploy.yml` - деплой
- `.github/workflows/build-check.yml` - проверка сборки

### 4. Деплой фронтенда (Vercel)

1. Подключите репозиторий к Vercel
2. Укажите корневую папку: `frontend`
3. Настройте переменные окружения:
   - `NEXT_PUBLIC_API_URL` - URL бэкенда
4. Vercel автоматически задеплоит приложение

### 5. Деплой бэкенда (Railway/Render)

1. Подключите репозиторий
2. Укажите корневую папку: `backend`
3. Настройте переменные окружения (см. `backend/.env.example`)
4. Настройте базу данных PostgreSQL
5. Запустите миграции: `npx prisma migrate deploy`

## Структура для деплоя

```
nexus-vita/
├── frontend/          # Деплой на Vercel
├── backend/           # Деплой на Railway/Render
├── .github/           # GitHub Actions
└── docs/              # Документация
```

## Проверка перед push

- [ ] Все файлы добавлены в git
- [ ] .gitignore настроен правильно
- [ ] Нет секретных данных в коде
- [ ] README.md обновлён
- [ ] Линтер проходит без ошибок

## После деплоя

1. Проверьте работу фронтенда
2. Проверьте работу API
3. Протестируйте демо-режим
4. Проверьте все страницы

---

**Готово к деплою! 🚀**

