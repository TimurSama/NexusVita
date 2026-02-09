# Настройка Vercel для Nexus Vita

## ⚠️ Важно: Root Directory

Проект находится в подпапке `Nexus Vita`, поэтому **обязательно** нужно настроить Root Directory в настройках проекта Vercel.

## Шаги настройки:

### 1. Откройте настройки проекта в Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Выберите ваш проект `NexusVita`
3. Перейдите в **Settings** → **General**

### 2. Настройте Root Directory

**ВАЖНО:** Файлы проекта находятся в корне репозитория GitHub, а не в подпапке!

В разделе **Root Directory**:
- **ОСТАВЬТЕ ПОЛЕ ПУСТЫМ** (не указывайте "Nexus Vita")
- Или удалите любое значение, если оно было указано
- Нажмите **Save**

### 3. Проверьте Build Settings

В разделе **Build & Development Settings**:
- **Framework Preset:** Next.js (должен определиться автоматически)
- **Build Command:** `prisma generate && npm run build` (или оставьте пустым, если указано в vercel.json)
- **Output Directory:** `.next` (по умолчанию)
- **Install Command:** `npm install` (по умолчанию)

### 4. Переменные окружения

В разделе **Environment Variables** добавьте:

#### Обязательные:
```
DATABASE_URL=postgresql://user:password@host:5432/nexus_vita?schema=public
AUTH_SECRET=your-secret-key-min-32-characters
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

#### Опциональные (для полной функциональности):
```
CRON_SECRET=your-cron-secret
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
OURA_CLIENT_ID=...
OURA_CLIENT_SECRET=...
GARMIN_CLIENT_ID=...
GARMIN_CLIENT_SECRET=...
SENTRY_DSN=https://...@sentry.io/...
```

### 5. Перезапустите деплой

После настройки Root Directory:
1. Перейдите на вкладку **Deployments**
2. Найдите последний деплой
3. Нажмите **Redeploy** (три точки → Redeploy)

Или просто сделайте новый коммит в GitHub — деплой запустится автоматически.

---

## Проверка успешного деплоя

После успешного деплоя вы должны увидеть:
- ✅ Build Status: Ready
- ✅ Все шаги сборки выполнены успешно
- ✅ Приложение доступно по URL

---

## Troubleshooting

### Ошибка: "should NOT have additional property `rootDirectory`"
- **Решение:** `rootDirectory` нельзя указывать в `vercel.json`. Настройте его в веб-интерфейсе Vercel (Settings → General → Root Directory)

### Ошибка: "Cannot find module"
- **Решение:** Убедитесь, что Root Directory установлен в `Nexus Vita`

### Ошибка: "Prisma Client not generated"
- **Решение:** Проверьте, что `postinstall` скрипт в package.json содержит `prisma generate`

### Ошибка сборки из-за переменных окружения
- **Решение:** Добавьте все обязательные переменные окружения в Settings → Environment Variables

---

**Последнее обновление:** 2025-02-09
