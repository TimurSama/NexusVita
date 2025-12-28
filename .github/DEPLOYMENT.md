# 🚀 Настройка автодеплоя

Этот документ описывает настройку автоматического деплоя для Nexus Vita.

## 📋 Варианты деплоя

### 1. Vercel (Frontend) - Рекомендуется

Vercel идеально подходит для Next.js приложений.

#### Настройка:

1. Перейдите на [Vercel](https://vercel.com) и войдите через GitHub
2. Импортируйте репозиторий `TimurSama/NexusVita`
3. Настройте проект:
   - **Root Directory**: `apps/web`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. Добавьте переменные окружения в Vercel:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your_bot_username
   ```

5. Добавьте секреты в GitHub:
   - Перейдите в Settings → Secrets and variables → Actions
   - Добавьте:
     - `VERCEL_TOKEN` - токен из Vercel Settings → Tokens
     - `VERCEL_ORG_ID` - ID организации из Vercel
     - `VERCEL_PROJECT_ID` - ID проекта из Vercel

#### Автоматический деплой:

После настройки каждый push в `main` будет автоматически деплоить frontend на Vercel.

---

### 2. Railway (Backend) - Рекомендуется

Railway отлично подходит для Node.js приложений с PostgreSQL.

#### Настройка:

1. Перейдите на [Railway](https://railway.app) и войдите через GitHub
2. Создайте новый проект из GitHub репозитория
3. Добавьте PostgreSQL базу данных
4. Настройте сервис:
   - **Root Directory**: `apps/api`
   - **Start Command**: `npm start`
   - **Build Command**: `npm run build`

5. Добавьте переменные окружения в Railway:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=your_jwt_secret
   REDIS_URL=${{Redis.REDIS_URL}}
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   PORT=5000
   NODE_ENV=production
   ```

6. Добавьте секреты в GitHub:
   - `RAILWAY_TOKEN` - токен из Railway Settings
   - `RAILWAY_SERVICE_ID` - ID сервиса из Railway

---

### 3. Render (Backend) - Альтернатива

#### Настройка:

1. Перейдите на [Render](https://render.com) и войдите через GitHub
2. Создайте новый Web Service из GitHub репозитория
3. Настройте:
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

4. Добавьте PostgreSQL базу данных в Render

5. Добавьте переменные окружения

6. Добавьте секреты в GitHub:
   - `RENDER_SERVICE_ID` - ID сервиса из Render
   - `RENDER_API_KEY` - API ключ из Render

---

### 4. Docker Hub + Docker Compose

Для деплоя на собственный сервер через Docker.

#### Настройка:

1. Создайте аккаунт на [Docker Hub](https://hub.docker.com)

2. Добавьте секреты в GitHub:
   - `DOCKER_HUB_USERNAME` - ваш username
   - `DOCKER_HUB_PASSWORD` - ваш password или access token

3. На сервере настройте docker-compose:
   ```yaml
   version: '3.8'
   services:
     api:
       image: your-username/nexusvita-api:latest
       ports:
         - "5000:5000"
       environment:
         - DATABASE_URL=postgresql://...
         - REDIS_URL=redis://...
       depends_on:
         - postgres
         - redis
     
     web:
       image: your-username/nexusvita-web:latest
       ports:
         - "3000:3000"
       environment:
         - NEXT_PUBLIC_API_URL=http://api:5000/api
       depends_on:
         - api
   ```

4. На сервере запустите:
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

---

## 🔐 Необходимые секреты GitHub

Добавьте следующие секреты в GitHub (Settings → Secrets and variables → Actions):

### Для Vercel:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Для Railway:
- `RAILWAY_TOKEN`
- `RAILWAY_SERVICE_ID`
- `DATABASE_URL` (опционально, если не используется Railway DB)

### Для Render:
- `RENDER_SERVICE_ID`
- `RENDER_API_KEY`

### Для Docker Hub:
- `DOCKER_HUB_USERNAME`
- `DOCKER_HUB_PASSWORD`

### Общие:
- `DATABASE_URL` - URL базы данных PostgreSQL
- `REDIS_URL` - URL Redis (если используется)
- `JWT_SECRET` - секретный ключ для JWT
- `TELEGRAM_BOT_TOKEN` - токен Telegram бота
- `TELEGRAM_WEBHOOK_SECRET` - секрет для webhook

---

## 🎯 Рекомендуемая конфигурация

### Production:
- **Frontend**: Vercel (автоматический деплой)
- **Backend**: Railway или Render
- **Database**: PostgreSQL на Railway/Render
- **Redis**: Redis на Railway/Render или Upstash
- **Storage**: AWS S3 или Cloudflare R2

### Development:
- Локальная разработка с Docker Compose
- Использование `.env` файлов

---

## 📝 Проверка деплоя

После настройки:

1. Сделайте push в `main` ветку
2. Проверьте статус в GitHub Actions
3. Убедитесь, что деплой прошёл успешно
4. Проверьте работу приложения

---

## 🐛 Troubleshooting

### Проблемы с Vercel:
- Убедитесь, что `VERCEL_PROJECT_ID` правильный
- Проверьте, что токен имеет права на проект

### Проблемы с Railway:
- Проверьте, что сервис запущен
- Убедитесь, что переменные окружения установлены

### Проблемы с миграциями:
- Убедитесь, что `DATABASE_URL` правильный
- Проверьте права доступа к базе данных

---

## 🔄 Обновление деплоя

Для обновления деплоя просто сделайте push в `main` ветку. GitHub Actions автоматически:
1. Запустит тесты
2. Соберёт проект
3. Задеплоит изменения

---

**Готово!** 🎉 Ваш проект теперь автоматически деплоится при каждом push в `main`.


