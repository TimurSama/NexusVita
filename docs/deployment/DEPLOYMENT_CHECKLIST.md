# Чеклист для первого деплоя

## Перед деплоем

### 1. GitHub репозиторий
- [ ] Создан репозиторий на GitHub
- [ ] Проект загружен в репозиторий
- [ ] `.gitignore` настроен правильно
- [ ] Все файлы закоммичены

### 2. База данных
- [ ] Создана PostgreSQL база данных (Vercel Postgres / Supabase / Neon / Railway)
- [ ] `DATABASE_URL` скопирован
- [ ] База данных доступна из интернета (проверен firewall)

### 3. Переменные окружения
Подготовьте все значения для Vercel:

#### Обязательные:
- [ ] `DATABASE_URL` — строка подключения к PostgreSQL
- [ ] `AUTH_SECRET` — случайная строка минимум 32 символа (можно сгенерировать: `openssl rand -base64 32`)
- [ ] `NEXT_PUBLIC_APP_URL` — будет `https://your-app.vercel.app` (после первого деплоя)
- [ ] `CRON_SECRET` — случайная строка для защиты cron endpoints

#### Для полной функциональности:
- [ ] `STRIPE_SECRET_KEY` — если используете платежи
- [ ] `STRIPE_WEBHOOK_SECRET` — после настройки webhook
- [ ] `OURA_CLIENT_ID`, `OURA_CLIENT_SECRET` — если используете Oura
- [ ] `GARMIN_CLIENT_ID`, `GARMIN_CLIENT_SECRET` — если используете Garmin
- [ ] `SENTRY_DSN` — если используете мониторинг
- [ ] `OPENAI_API_KEY` или `ANTHROPIC_API_KEY` — для AI функционала
- [ ] `KYC_PROVIDER`, `KYC_API_KEY` — если используете KYC

## Процесс деплоя

### Шаг 1: Vercel
- [ ] Зарегистрировались на [vercel.com](https://vercel.com)
- [ ] Подключили GitHub аккаунт
- [ ] Импортировали проект из GitHub
- [ ] Vercel определил Next.js автоматически

### Шаг 2: Первый деплой
- [ ] Нажали "Deploy" (без переменных окружения)
- [ ] Дождались завершения первого деплоя
- [ ] Скопировали URL приложения (например, `https://nexus-vita.vercel.app`)

### Шаг 3: Настройка переменных окружения
- [ ] Перешли в Settings → Environment Variables
- [ ] Добавили все обязательные переменные
- [ ] Установили `NEXT_PUBLIC_APP_URL` = URL из шага 2
- [ ] Выбрали окружения (Production, Preview, Development)

### Шаг 4: Миграция базы данных
- [ ] Установили Vercel CLI: `npm i -g vercel`
- [ ] Авторизовались: `vercel login`
- [ ] Подключились к проекту: `vercel link`
- [ ] Скачали env: `vercel env pull .env.local`
- [ ] Выполнили миграции: `npx prisma migrate deploy`

### Шаг 5: Передеплой
- [ ] Перешли в Deployments
- [ ] Нажали "Redeploy" на последнем деплое
- [ ] Или сделали новый commit в GitHub

### Шаг 6: Настройка Cron Jobs
- [ ] Перешли в Settings → Cron Jobs
- [ ] Добавили cron: `/api/cron/sync`, schedule: `0 */6 * * *`
- [ ] Добавили header: `x-cron-secret: ваш-CRON_SECRET`

### Шаг 7: Настройка Stripe (если используется)
- [ ] Создали webhook в Stripe Dashboard
- [ ] Endpoint: `https://your-app.vercel.app/api/payments/webhook`
- [ ] События: `checkout.session.completed`, `payment_intent.succeeded`
- [ ] Скопировали Webhook Signing Secret
- [ ] Добавили `STRIPE_WEBHOOK_SECRET` в Vercel

## После деплоя

### Проверка функциональности
- [ ] Главная страница открывается (`/`)
- [ ] Публичный лендинг работает (`/`)
- [ ] Страница тарифов работает (`/pricing`)
- [ ] Регистрация работает (`/register`)
- [ ] Логин работает (`/login`)
- [ ] Онбординг запускается после регистрации (`/onboarding`)
- [ ] API endpoints отвечают (`/api/auth/me`)
- [ ] База данных работает (попробуйте зарегистрироваться)

### Проверка интеграций
- [ ] Sentry работает (если настроен)
- [ ] Cron jobs выполняются (проверьте логи через 6 часов)
- [ ] Stripe webhook работает (если настроен)

### Безопасность
- [ ] Все секретные ключи в Environment Variables, не в коде
- [ ] `.env` файлы в `.gitignore`
- [ ] `AUTH_SECRET` достаточно длинный и случайный
- [ ] `CRON_SECRET` установлен и используется

## Автоматизация

После настройки:
- ✅ Push в `main` → автоматический деплой в Production
- ✅ Pull Request → автоматический Preview деплой
- ✅ Cron jobs → автоматическая синхронизация каждые 6 часов

## Troubleshooting

### Проблема: "Database connection failed"
**Решение:**
1. Проверьте `DATABASE_URL` в Environment Variables
2. Убедитесь, что база данных доступна из интернета
3. Проверьте firewall настройки базы данных
4. Попробуйте подключиться через `psql` или другой клиент

### Проблема: "Prisma Client not generated"
**Решение:**
1. Проверьте, что `postinstall` скрипт в `package.json`
2. В Vercel Settings → Build & Development Settings добавьте:
   - Build Command: `prisma generate && next build`

### Проблема: "Cron jobs не работают"
**Решение:**
1. Проверьте, что `CRON_SECRET` установлен
2. Убедитесь, что endpoint `/api/cron/sync` доступен
3. Проверьте логи в Vercel Dashboard → Deployments → Logs
4. Убедитесь, что cron настроен в Vercel Settings → Cron Jobs

### Проблема: "Environment variables не применяются"
**Решение:**
1. Убедитесь, что переменные добавлены для правильного окружения (Production/Preview)
2. Передеплойте проект после добавления переменных
3. Проверьте, что переменные не содержат лишних пробелов

---

**Готово!** После выполнения всех пунктов ваш проект будет автоматически деплоиться при каждом push в GitHub.
