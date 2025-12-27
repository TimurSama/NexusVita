# 🚀 Настройка Vercel для Nexus Vita

## Проблема

Vercel пытается использовать `turbo run build` в монорепозитории, что может вызывать ошибки. Нужно настроить правильную конфигурацию.

## ✅ Решение

### Вариант 1: Настройка через Vercel Dashboard (Рекомендуется)

1. Перейдите на [Vercel Dashboard](https://vercel.com/dashboard)
2. Импортируйте репозиторий `TimurSama/NexusVita`
3. В настройках проекта укажите:

   **Root Directory:**
   ```
   apps/web
   ```

   **Build Command:**
   ```
   npm run build
   ```
   (НЕ `turbo run build`!)

   **Output Directory:**
   ```
   .next
   ```

   **Install Command:**
   ```
   cd ../.. && npm install && cd apps/web && npm install
   ```
   или просто:
   ```
   npm install
   ```
   (Vercel автоматически установит зависимости в workspace)

4. Добавьте переменные окружения:
   - `NEXT_PUBLIC_API_URL` - URL вашего API
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` - Username Telegram бота
   - `NEXT_PUBLIC_APP_URL` - URL вашего приложения

5. Сохраните и задеплойте

### Вариант 2: Использование vercel.json

Файл `apps/web/vercel.json` уже создан с правильными настройками.

### Вариант 3: Использование GitHub Actions

Workflow `.github/workflows/deploy-vercel.yml` настроен для автоматического деплоя.

## 🔧 Проверка

После настройки:

1. Сделайте push в `main` ветку
2. Проверьте логи деплоя в Vercel Dashboard
3. Убедитесь, что сборка проходит успешно

## ⚠️ Важные моменты

1. **НЕ используйте `turbo run build`** в Build Command - используйте `npm run build`
2. **Root Directory должен быть `apps/web`** - не корень репозитория
3. **Установите все зависимости** - Vercel должен установить зависимости из корня и из apps/web

## 🐛 Troubleshooting

### Ошибка: "command failed: next build"
- Убедитесь, что Root Directory = `apps/web`
- Проверьте, что все зависимости установлены
- Проверьте переменные окружения

### Ошибка: "Cannot find module"
- Убедитесь, что Install Command правильно настроен
- Проверьте, что package.json в apps/web корректен

### Ошибка: "turbo run build failed"
- НЕ используйте turbo в Build Command
- Используйте стандартный `npm run build`

## 📝 Пример правильной конфигурации Vercel

```
Framework Preset: Next.js
Root Directory: apps/web
Build Command: npm run build
Output Directory: .next (по умолчанию)
Install Command: npm install
```

---

**Готово!** После настройки деплой должен работать корректно. 🎉

