# 🔐 Переменные окружения для Vercel

**URL вашего приложения:** https://nexusvita.vercel.app/

## ⚠️ ВАЖНО: Демо-режим работает БЕЗ переменных!

Приложение автоматически переходит в **демо-режим**, если `DATABASE_URL` не настроен. Все функции работают с данными в `localStorage` браузера. Это идеально для демонстрации инвесторам и партнерам!

**Для демо-режима переменные НЕ НУЖНЫ!** Просто задеплойте приложение.

---

## 📋 Инструкция по добавлению переменных в Vercel (только для продакшена)

1. Откройте ваш проект на [vercel.com](https://vercel.com)
2. Перейдите в **Settings** → **Environment Variables**
3. Добавьте каждую переменную по очереди (кнопка **Add New**)
4. Выберите окружения: **Production**, **Preview**, **Development** (или только Production)
5. Нажмите **Save**
6. После добавления всех переменных - **Redeploy** последний деплой

---

## ✅ ОБЯЗАТЕЛЬНЫЕ переменные (минимум для работы)

### 1. DATABASE_URL
```
DATABASE_URL=postgresql://user:password@host:5432/nexus_vita?schema=public
```
**Где взять:** Создайте базу данных PostgreSQL (например, на Vercel Postgres, Supabase, или другом провайдере) и скопируйте строку подключения.

**Пример для Vercel Postgres:**
```
postgres://default:password@host.vercel-storage.com:5432/verceldb
```

### 2. AUTH_SECRET
```
AUTH_SECRET=ваш-секретный-ключ-минимум-32-символа-длинный
```
**Как сгенерировать:**
```bash
# В терминале (Windows PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Или онлайн: https://generate-secret.vercel.app/32
```

**Пример (НЕ ИСПОЛЬЗУЙТЕ ЭТОТ, СОЗДАЙТЕ СВОЙ):**
```
AUTH_SECRET=a8f5f167f44f4964e6c998dee827110c4b8f5f167f44f4964e6c998dee827110c
```

### 3. NEXT_PUBLIC_APP_URL
```
NEXT_PUBLIC_APP_URL=https://nexusvita.vercel.app
```
**Важно:** Без слеша в конце!

---

## 🔧 ОПЦИОНАЛЬНЫЕ переменные (для полной функциональности)

### Cron Jobs
```
CRON_SECRET=ваш-секретный-ключ-для-cron-запросов
```
**Как сгенерировать:** Так же как AUTH_SECRET (минимум 32 символа)

### Платежи (Stripe)
```
STRIPE_SECRET_KEY=sk_live_...или_sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_live_...или_pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```
**Где взять:** [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

### Интеграции (Oura)
```
OURA_CLIENT_ID=ваш-client-id
OURA_CLIENT_SECRET=ваш-client-secret
OURA_REDIRECT_URI=https://nexusvita.vercel.app/api/oauth/oura/callback
OURA_API_BASE_URL=https://api.ouraring.com/v2
```
**Где взять:** [Oura Developer Portal](https://cloud.ouraring.com/personal-access-tokens)

### Интеграции (Garmin)
```
GARMIN_CLIENT_ID=ваш-client-id
GARMIN_CLIENT_SECRET=ваш-client-secret
GARMIN_AUTHORIZE_URL=https://connect.garmin.com/oauthConfirm
GARMIN_TOKEN_URL=https://connectapi.garmin.com/oauth-service/oauth/exchange/user/2.0
GARMIN_REDIRECT_URI=https://nexusvita.vercel.app/api/oauth/garmin/callback
GARMIN_API_BASE_URL=https://apis.garmin.com
GARMIN_SLEEP_ENDPOINT=/wellness-api/rest/sleep
GARMIN_STEPS_ENDPOINT=/wellness-api/rest/dailySummary
GARMIN_HR_ENDPOINT=/wellness-api/rest/heartrates
```
**Где взять:** [Garmin Developer Portal](https://developer.garmin.com/)

### Мониторинг (Sentry)
```
SENTRY_DSN=https://...@sentry.io/...
```
**Где взять:** [Sentry Dashboard](https://sentry.io/settings/)

### ИИ провайдеры
```
AI_PROVIDER=fallback
# Или для реального AI:
# AI_PROVIDER=openai
# OPENAI_API_KEY=sk-...
# OPENAI_MODEL=gpt-4
# Или:
# AI_PROVIDER=anthropic
# ANTHROPIC_API_KEY=sk-ant-...
# ANTHROPIC_MODEL=claude-3-opus-20240229
```

### KYC (Know Your Customer)
```
KYC_PROVIDER=disabled
# Или для реального провайдера:
# KYC_PROVIDER=sumsub
# KYC_API_KEY=...
```

---

## 🚀 Режимы работы

### 🎭 Демо-режим (рекомендуется для демонстрации)

**НЕ ТРЕБУЕТ переменных окружения!**

Просто задеплойте приложение без переменных - оно автоматически перейдет в демо-режим:
- ✅ Все функции работают
- ✅ Данные хранятся в localStorage
- ✅ Идеально для демонстрации инвесторам
- ✅ Не требует настройки БД

### 🏭 Продакшен-режим

Для продакшена нужны **3 обязательные переменные**:

1. ✅ `DATABASE_URL` - подключение к PostgreSQL
2. ✅ `AUTH_SECRET` - секретный ключ (сгенерируйте свой!)
3. ✅ `NEXT_PUBLIC_APP_URL=https://nexusvita.vercel.app`

Остальные переменные можно добавить позже, когда будете настраивать соответствующие функции.

---

## 📝 Пример генерации AUTH_SECRET и CRON_SECRET

### Windows PowerShell:
```powershell
# Генерация AUTH_SECRET (32 байта в base64)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Генерация CRON_SECRET (32 байта в base64)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Онлайн генератор:
Используйте: https://generate-secret.vercel.app/32

---

## ⚠️ Важные замечания

1. **НЕ ДОБАВЛЯЙТЕ** переменные в код - только через Vercel Dashboard
2. **НЕ КОММИТЬТЕ** `.env` файлы в git
3. После добавления переменных - **обязательно Redeploy**
4. Переменные с префиксом `NEXT_PUBLIC_` доступны в браузере
5. Остальные переменные доступны только на сервере

---

**Последнее обновление:** 2025-02-09
