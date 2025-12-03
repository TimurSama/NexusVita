# ⚡ БЫСТРЫЙ ДЕПЛОЙ - 5 МИНУТ

## 🎯 Цель: Задеплоить проект и получить рабочую ссылку

---

## Шаг 1: Деплой на Vercel (Frontend)

### Самый простой способ:

1. Откройте: https://vercel.com/new
2. Войдите через GitHub
3. Выберите репозиторий: `TimurSama/NexusVita`
4. Настройки:
   - **Root Directory:** `frontend`
   - Остальное оставьте по умолчанию
5. Нажмите **Deploy**

⏱️ **Время:** 2-3 минуты

✅ **Результат:** Получите ссылку типа `https://nexus-vita-xxx.vercel.app`

---

## Шаг 2: Проверка деплоя

1. Откройте ссылку, которую дал Vercel
2. Проверьте, что сайт загружается
3. Попробуйте демо-режим: `/demo`

---

## Шаг 3: (Опционально) Backend на Railway

1. Откройте: https://railway.app
2. New Project → Deploy from GitHub
3. Выберите репозиторий
4. Railway автоматически определит backend
5. Добавьте переменные окружения:
   - `DATABASE_URL` (если есть БД)
   - `JWT_SECRET`
   - `PORT=3001`

---

## ✅ ГОТОВО!

Теперь у вас есть:
- ✅ Frontend на Vercel (рабочая ссылка)
- ✅ Автоматический деплой при каждом push
- ✅ Preview деплои для PR

---

## 🔗 Полезные ссылки

- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Actions: https://github.com/TimurSama/NexusVita/actions
- Подробная инструкция: [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

