# 🚀 Быстрая настройка Vercel для Nexus Vita

## ✅ Шаг 1: Настройка проекта в Vercel Dashboard

После того, как вы подключили репозиторий `TimurSama/NexusVita`:

1. **Откройте настройки проекта** в Vercel Dashboard
2. Перейдите в раздел **Settings** → **General**

3. **Настройте следующие параметры:**

   ### Framework Preset:
   ```
   Next.js
   ```

   ### Root Directory:
   ```
   apps/web
   ```
   ⚠️ **ВАЖНО:** Это критично! Без этого Vercel будет искать файлы в корне репозитория.

   ### Build Command:
   ```
   npm run build
   ```
   (НЕ `turbo run build`!)

   ### Output Directory:
   ```
   .next
   ```
   (Обычно определяется автоматически для Next.js)

   ### Install Command:
   ```
   npm install
   ```
   (Vercel автоматически установит зависимости)

4. **Сохраните изменения**

## ✅ Шаг 2: Добавление переменных окружения

1. Перейдите в **Settings** → **Environment Variables**
2. Добавьте следующие переменные:

   ```
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   NEXT_PUBLIC_APP_URL=https://your-app-domain.vercel.app
   NEXT_PUBLIC_WS_URL=wss://your-api-domain.com
   NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=@your_bot_username
   ```

   ⚠️ Замените значения на ваши реальные URL.

3. Выберите окружения: **Production**, **Preview**, **Development**
4. **Сохраните**

## ✅ Шаг 3: Первый деплой

1. После сохранения настроек Vercel автоматически запустит деплой
2. Или нажмите **Deploy** вручную
3. Дождитесь завершения сборки

## 🔄 Автоматический деплой

После настройки:
- Каждый push в `main` ветку → автоматический деплой в Production
- Каждый pull request → автоматический Preview деплой
- Каждая ветка → автоматический Preview деплой

## ⚠️ Важные моменты

1. **Root Directory ОБЯЗАТЕЛЬНО должен быть `apps/web`**
2. **Build Command должен быть `npm run build`** (не turbo!)
3. **Framework должен быть Next.js**

## 🐛 Если что-то не работает

### Ошибка: "Cannot find module"
- Проверьте, что Root Directory = `apps/web`
- Убедитесь, что все зависимости в `apps/web/package.json` указаны

### Ошибка: "Build failed"
- Проверьте логи в Vercel Dashboard
- Убедитесь, что Build Command = `npm run build`
- Проверьте переменные окружения

### Ошибка: "Root Directory not found"
- Убедитесь, что путь `apps/web` существует в репозитории
- Проверьте, что вы указали правильный путь (без слеша в конце)

## 📝 Итоговая конфигурация

```
Framework Preset: Next.js
Root Directory: apps/web
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

---

**Готово!** После настройки деплой будет работать автоматически. 🎉


