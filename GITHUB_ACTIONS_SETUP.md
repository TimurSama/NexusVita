# Настройка GitHub Actions для автоматического деплоя

## 🚀 Автоматический деплой настроен!

GitHub Actions workflows уже созданы и готовы к использованию.

---

## 📋 Доступные Workflows

### 1. `deploy.yml` - Основной деплой
- **Триггер**: Push в `main` или `master`
- **Действия**:
  - Собирает frontend
  - Деплоит на Vercel (если настроены secrets)
  - Собирает backend
  - Уведомляет о статусе

### 2. `deploy-production.yml` - Production деплой
- **Триггер**: Push в `main` или теги `v*`
- **Действия**: Production деплой на Vercel

### 3. `ci.yml` - Continuous Integration
- **Триггер**: Push и Pull Requests
- **Действия**: Линтинг и проверка типов

### 4. `build-check.yml` - Проверка сборки
- **Триггер**: Push и Pull Requests
- **Действия**: Проверка сборки frontend и backend

---

## 🔐 Настройка Secrets для Vercel

Для автоматического деплоя frontend на Vercel нужно добавить secrets в GitHub:

### Шаг 1: Получите токены из Vercel

1. Зайдите на https://vercel.com
2. Перейдите в Settings → Tokens
3. Создайте новый токен
4. Скопируйте токен

### Шаг 2: Создайте проект в Vercel

1. Импортируйте репозиторий в Vercel
2. Vercel автоматически создаст проект
3. Скопируйте `Org ID` и `Project ID` из настроек проекта

### Шаг 3: Добавьте Secrets в GitHub

1. Перейдите в репозиторий: https://github.com/TimurSama/NexusVita
2. Settings → Secrets and variables → Actions
3. Добавьте следующие secrets:

```
VERCEL_TOKEN          - токен из Vercel
VERCEL_ORG_ID         - Organization ID из Vercel
VERCEL_PROJECT_ID     - Project ID из Vercel
NEXT_PUBLIC_API_URL   - URL вашего backend API
```

---

## 🔧 Настройка Backend деплоя

Backend можно задеплоить на:

### Railway

1. Создайте проект на https://railway.app
2. Подключите GitHub репозиторий
3. Railway автоматически определит backend и задеплоит
4. Добавьте переменные окружения в Railway

### Render

1. Создайте новый Web Service на https://render.com
2. Подключите GitHub репозиторий
3. Укажите:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. Добавьте переменные окружения

---

## 📝 Переменные окружения

### Frontend (Vercel)

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend (Railway/Render)

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=production
```

---

## ✅ Проверка работы

После настройки secrets:

1. Сделайте commit и push в `main`
2. Перейдите в Actions вкладку на GitHub
3. Увидите запущенный workflow
4. После успешного деплоя frontend будет доступен на Vercel

---

## 🎯 Ручной запуск

Можно запустить деплой вручную:

1. Перейдите в Actions
2. Выберите workflow "Deploy Nexus Vita"
3. Нажмите "Run workflow"
4. Выберите ветку и запустите

---

## 📚 Дополнительная информация

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

---

## ⚠️ Важно

- Secrets хранятся зашифрованными в GitHub
- Не коммитьте `.env` файлы в репозиторий
- Используйте разные токены для dev и production

