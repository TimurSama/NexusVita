# 🚀 Быстрый деплой на Vercel

## Вариант 1: Автоматический деплой через Vercel GitHub Integration (РЕКОМЕНДУЕТСЯ)

Это самый простой способ - Vercel автоматически задеплоит проект при каждом push.

### Шаги:

1. **Зайдите на https://vercel.com** и войдите через GitHub

2. **Импортируйте репозиторий:**
   - Нажмите "Add New Project"
   - Выберите репозиторий `TimurSama/NexusVita`
   - Vercel автоматически определит Next.js

3. **Настройте проект:**
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js (автоматически)
   - **Build Command:** `npm run build` (по умолчанию)
   - **Output Directory:** `.next` (по умолчанию)

4. **Добавьте переменные окружения:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

5. **Нажмите Deploy**

✅ Готово! Vercel автоматически задеплоит проект и даст вам ссылку типа:
`https://nexus-vita-xxx.vercel.app`

---

## Вариант 2: Ручной деплой через Vercel CLI

### Установка Vercel CLI:

```bash
npm i -g vercel
```

### Деплой:

```bash
cd frontend
vercel
```

Следуйте инструкциям в терминале.

---

## Вариант 3: Использование GitHub Actions (уже настроено)

Если вы настроили secrets в GitHub, workflow автоматически задеплоит при push.

### Настройка secrets:

1. Перейдите: https://github.com/TimurSama/NexusVita/settings/secrets/actions
2. Добавьте:
   - `VERCEL_TOKEN` - из https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` - из настроек проекта в Vercel
   - `VERCEL_PROJECT_ID` - из настроек проекта в Vercel
   - `NEXT_PUBLIC_API_URL` - URL вашего backend

---

## 🔗 После деплоя

Ваш проект будет доступен по ссылке:
- **Production:** `https://nexus-vita.vercel.app` (или ваш кастомный домен)
- **Preview:** Каждый PR получит свою preview ссылку

---

## 📝 Примечания

- Vercel автоматически обновляет деплой при каждом push в `main`
- Preview деплои создаются для каждого PR
- Все переменные окружения настраиваются в Vercel Dashboard

---

## 🆘 Проблемы?

Если деплой не работает:
1. Проверьте логи в Vercel Dashboard
2. Убедитесь, что `frontend/package.json` содержит скрипт `build`
3. Проверьте, что все зависимости установлены
4. Убедитесь, что Root Directory указан как `frontend`

