# 🔐 Настройка секретов для GitHub Actions

Для корректной работы CI/CD pipeline необходимо настроить следующие секреты в GitHub:

## 📋 Обязательные секреты

### Vercel Deployment
- `VERCEL_TOKEN` - Токен Vercel (получить на https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` - ID организации Vercel
- `VERCEL_PROJECT_ID` - ID проекта Vercel

### Переменные окружения для сборки
- `NEXT_PUBLIC_API_URL` - URL API бэкенда (например: `https://api.nexusvita.io/api`)
- `NEXT_PUBLIC_APP_URL` - URL фронтенда (например: `https://nexusvita.io`)
- `NEXT_PUBLIC_WS_URL` - URL WebSocket сервера (например: `wss://api.nexusvita.io`)
- `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` - Username Telegram бота (например: `@nexusvita_bot`)

### База данных
- `DATABASE_URL` - Connection string для PostgreSQL (например: `postgresql://user:password@host:5432/dbname`)

## 🔧 Опциональные секреты

### Docker Hub (для публикации образов)
- `DOCKER_HUB_USERNAME` - Username Docker Hub
- `DOCKER_HUB_PASSWORD` - Password или Access Token Docker Hub

### Railway (альтернативный деплой бэкенда)
- `RAILWAY_TOKEN` - Токен Railway
- `RAILWAY_SERVICE_ID` - ID сервиса Railway

### Render (альтернативный деплой бэкенда)
- `RENDER_SERVICE_ID` - ID сервиса Render
- `RENDER_API_KEY` - API ключ Render

## 📝 Как добавить секреты

1. Перейдите в репозиторий на GitHub
2. Откройте **Settings** → **Secrets and variables** → **Actions**
3. Нажмите **New repository secret**
4. Введите имя секрета и его значение
5. Нажмите **Add secret**

## ⚠️ Важно

- **НЕ коммитьте** секреты в код
- Используйте переменные окружения для всех чувствительных данных
- Регулярно обновляйте токены и пароли
- Используйте разные секреты для production и development окружений

## 🚀 После настройки

После добавления всех необходимых секретов:
1. Сделайте push в `main` ветку
2. GitHub Actions автоматически запустят workflow
3. Проверьте статус в разделе **Actions**

---

**Готово!** После настройки секретов все workflow должны работать корректно. 🎉


