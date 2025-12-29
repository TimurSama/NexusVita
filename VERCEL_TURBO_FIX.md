# 🔧 Исправление проблемы с Turbo в Vercel

## Проблема
Vercel обнаружил `turbo.json` в корне репозитория и автоматически пытается использовать Turbo для сборки, что может вызывать проблемы.

## ✅ Решение

### Вариант 1: Правильная настройка Root Directory (Рекомендуется)

1. **В Vercel Dashboard** убедитесь, что:
   - **Root Directory**: `apps/web` (введено вручную)
   - **Framework Preset**: `Next.js`
   - **Build Command**: `npm run build` (НЕ `turbo run build`!)
   - **Output Directory**: `.next`

2. **Важно**: После установки Root Directory как `apps/web`, Vercel должен работать в этой директории и игнорировать `turbo.json` из корня.

### Вариант 2: Переименование turbo.json (если Вариант 1 не работает)

Если Vercel все еще пытается использовать Turbo:

1. Временно переименуйте `turbo.json` в `.turbo.json` (с точкой в начале)
2. Или переместите его в папку, которая не будет видна Vercel

### Вариант 3: Использование vercel.json

Файл `apps/web/vercel.json` уже настроен правильно. Vercel должен использовать его вместо автоматического определения Turbo.

## 🔍 Проверка

После настройки в логах Vercel должно быть:
- ✅ `Running "install" command: npm install` (в директории apps/web)
- ✅ `Running "build" command: npm run build` (НЕ turbo!)
- ❌ НЕ должно быть: `Detected Turbo. Adjusting default settings...`

## ⚠️ Важно

Если вы видите в логах:
```
> Detected Turbo. Adjusting default settings...
```

Это означает, что Root Directory не установлен правильно или Vercel не видит `apps/web/vercel.json`.

## 📝 Правильная конфигурация Vercel

```
Root Directory: apps/web
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

---

**После правильной настройки Root Directory Vercel не должен использовать Turbo!** 🎉


