# Переменные окружения для Vercel

## Обязательные переменные для деплоя

### База данных
```
DATABASE_URL=postgresql://user:password@host:port/database
```

### Аутентификация
```
AUTH_SECRET=your-secret-key-min-32-characters
```

### Приложение
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Опциональные переменные (для полной функциональности)

### Cron Jobs
```
CRON_SECRET=your-cron-secret-key
```

### ИИ провайдеры
```
AI_PROVIDER=openai|anthropic
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

### Платежи (Stripe)
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Интеграции
```
OURA_CLIENT_ID=...
OURA_CLIENT_SECRET=...
OURA_REDIRECT_URI=https://your-app.vercel.app/api/oauth/oura/callback
OURA_API_BASE_URL=https://api.ouraring.com/v2

GARMIN_CLIENT_ID=...
GARMIN_CLIENT_SECRET=...
GARMIN_AUTHORIZE_URL=https://connect.garmin.com/oauthConfirm
GARMIN_TOKEN_URL=https://connectapi.garmin.com/oauth-service/oauth/exchange/user/2.0
GARMIN_REDIRECT_URI=https://your-app.vercel.app/api/oauth/garmin/callback
GARMIN_API_BASE_URL=https://apis.garmin.com
GARMIN_SLEEP_ENDPOINT=/wellness-api/rest/sleep
GARMIN_STEPS_ENDPOINT=/wellness-api/rest/dailySummary
GARMIN_HR_ENDPOINT=/wellness-api/rest/heartrates
```

### Мониторинг
```
SENTRY_DSN=https://...@sentry.io/...
```

### KYC
```
KYC_PROVIDER=...
KYC_API_KEY=...
```

## Минимальная конфигурация для деплоя

Для базового деплоя достаточно:
1. `DATABASE_URL` - подключение к PostgreSQL
2. `AUTH_SECRET` - секретный ключ для сессий
3. `NEXT_PUBLIC_APP_URL` - URL вашего приложения

Остальные переменные нужны только для соответствующих функций.

## Как добавить переменные в Vercel

1. Перейдите в настройки проекта на Vercel
2. Откройте раздел "Environment Variables"
3. Добавьте переменные для Production, Preview и Development окружений
4. После добавления переменных перезапустите деплой

## Проверка переменных

После деплоя проверьте:
- Логи сборки в Vercel Dashboard
- Работает ли аутентификация
- Подключена ли база данных
- Работают ли API endpoints
