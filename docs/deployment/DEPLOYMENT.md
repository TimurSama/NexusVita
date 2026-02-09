# Production деплой

## Автоматический деплой через GitHub → Vercel

### Шаг 1: Подготовка GitHub репозитория

1. Создайте репозиторий на GitHub (если еще не создан)
2. Загрузите проект:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/nexus-vita.git
   git push -u origin main
   ```

### Шаг 2: Подключение Vercel

1. Зайдите на [vercel.com](https://vercel.com) и авторизуйтесь через GitHub
2. Нажмите **"Add New Project"** → **"Import Git Repository"**
3. Выберите ваш репозиторий `nexus-vita`
4. Vercel автоматически определит Next.js проект
5. Нажмите **"Deploy"** (пока без переменных окружения)

### Шаг 3: Настройка переменных окружения в Vercel

После первого деплоя:

1. Перейдите в **Settings** → **Environment Variables**
2. Добавьте все необходимые переменные:

#### Обязательные:
```
DATABASE_URL=postgresql://user:password@host:5432/nexus_vita?schema=public
AUTH_SECRET=your-random-secret-key-min-32-chars
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
CRON_SECRET=your-random-cron-secret
```

#### Опциональные (для полной функциональности):
```
# Stripe (для платежей)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Oura (для интеграции)
OURA_CLIENT_ID=...
OURA_CLIENT_SECRET=...
OURA_REDIRECT_URI=https://your-app.vercel.app/api/oauth/oura/callback
OURA_API_BASE_URL=https://api.ouraring.com

# Garmin (для интеграции)
GARMIN_CLIENT_ID=...
GARMIN_CLIENT_SECRET=...
GARMIN_AUTHORIZE_URL=...
GARMIN_TOKEN_URL=...
GARMIN_REDIRECT_URI=https://your-app.vercel.app/api/oauth/garmin/callback
GARMIN_API_BASE_URL=...

# Sentry (для мониторинга)
SENTRY_DSN=https://...@sentry.io/...

# AI провайдеры
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
# или
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-haiku-20240307

# KYC (опционально)
KYC_PROVIDER=sumsub
KYC_API_KEY=...
```

3. Выберите окружения для каждой переменной:
   - **Production** — для production деплоя
   - **Preview** — для preview деплоев (pull requests)
   - **Development** — для локальной разработки

### Шаг 4: Настройка базы данных

1. Создайте PostgreSQL базу данных (рекомендуется):
   - [Vercel Postgres](https://vercel.com/storage/postgres) (интеграция)
   - [Supabase](https://supabase.com) (бесплатный tier)
   - [Neon](https://neon.tech) (бесплатный tier)
   - [Railway](https://railway.app) (бесплатный tier)

2. Скопируйте `DATABASE_URL` и добавьте в Vercel Environment Variables

3. Выполните миграции:
   ```bash
   # Локально с production DATABASE_URL
   DATABASE_URL="your-production-url" npx prisma migrate deploy
   
   # Или через Vercel CLI
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

### Шаг 5: Настройка Cron Jobs

Cron jobs уже настроены в `vercel.json` для синхронизации данных каждые 6 часов.

Для настройки вручную:
1. Перейдите в **Settings** → **Cron Jobs** в Vercel
2. Добавьте новый cron:
   - **Path**: `/api/cron/sync`
   - **Schedule**: `0 */6 * * *` (каждые 6 часов)
   - **Headers**: `x-cron-secret: ваш-CRON_SECRET`

### Шаг 6: Настройка Stripe Webhook

1. В Stripe Dashboard → **Developers** → **Webhooks**
2. Добавьте endpoint: `https://your-app.vercel.app/api/payments/webhook`
3. Выберите события: `checkout.session.completed`, `payment_intent.succeeded`
4. Скопируйте **Webhook Signing Secret** и добавьте как `STRIPE_WEBHOOK_SECRET` в Vercel

### Шаг 7: Передеплой

После настройки всех переменных:

1. Перейдите в **Deployments**
2. Нажмите **"Redeploy"** на последнем деплое
3. Или сделайте новый commit в GitHub — деплой запустится автоматически

### Шаг 8: Проверка

После деплоя проверьте:
- ✅ Главная страница открывается
- ✅ Регистрация работает (`/register`)
- ✅ Логин работает (`/login`)
- ✅ API endpoints отвечают (`/api/auth/me`)
- ✅ База данных подключена (попробуйте зарегистрироваться)

## Автоматический деплой

После настройки:
- ✅ **Push в `main` branch** → автоматический деплой в Production
- ✅ **Pull Request** → автоматический Preview деплой
- ✅ **Cron jobs** → автоматическая синхронизация данных каждые 6 часов

## Мониторинг

- **Sentry**: автоматически отслеживает ошибки (если настроен `SENTRY_DSN`)
- **Vercel Analytics**: встроенная аналитика в Vercel Dashboard
- **Logs**: доступны в Vercel Dashboard → **Deployments** → выберите деплой → **Logs**

## Troubleshooting

### Ошибка "Database connection failed"
- Проверьте `DATABASE_URL` в Environment Variables
- Убедитесь, что база данных доступна из интернета
- Проверьте firewall настройки базы данных

### Ошибка "Prisma Client not generated"
- Добавьте в `package.json`:
  ```json
  "scripts": {
    "postinstall": "prisma generate"
  }
  ```

### Cron jobs не работают
- Проверьте, что `CRON_SECRET` установлен
- Убедитесь, что endpoint `/api/cron/sync` доступен
- Проверьте логи в Vercel Dashboard

## Self-hosted деплой (альтернатива)

Если не используете Vercel:

1. Установите Node.js 18+ и PostgreSQL
2. Настройте `.env` по `SETUP.md`
3. Запустите:
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate deploy
   npm run build
   npm run start
   ```

Для production рекомендуется использовать PM2 или Docker.
