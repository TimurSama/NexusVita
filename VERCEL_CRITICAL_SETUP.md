# 🚨 КРИТИЧЕСКАЯ НАСТРОЙКА VERCEL

## ⚠️ Проблема

Если в логах Vercel вы видите:
```
Found .vercelignore (repository root)
Removed X ignored files defined in .vercelignore
```

Это означает, что **Root Directory НЕ установлен правильно** и Vercel работает из корня репозитория!

## ✅ РЕШЕНИЕ (ОБЯЗАТЕЛЬНО!)

### Шаг 1: Проверьте Root Directory в Vercel Dashboard

1. Откройте проект в [Vercel Dashboard](https://vercel.com/dashboard)
2. Перейдите в **Settings** → **General**
3. Найдите раздел **Root Directory**
4. **ОБЯЗАТЕЛЬНО должно быть указано:**
   ```
   apps/web
   ```

### Шаг 2: Если Root Directory пустой или неправильный

1. **Введите вручную** (не выбирайте из списка!):
   ```
   apps/web
   ```
2. Убедитесь, что:
   - Нет пробелов
   - Нет слеша в конце
   - Все буквы маленькие
3. **Сохраните изменения**

### Шаг 3: Перезапустите деплой

1. После сохранения Vercel автоматически запустит новый деплой
2. Или перейдите в **Deployments** → выберите последний → **Redeploy**

## 🔍 Как проверить, что Root Directory установлен правильно

### ✅ Правильно (Root Directory = apps/web):
```
Cloning completed
Running "install" command: npm install
(работает в apps/web)
```

### ❌ Неправильно (Root Directory не установлен):
```
Found .vercelignore (repository root)
Removed X ignored files
Running "git diff --quiet HEAD^ HEAD ./"
(работает из корня)
```

## 📝 Полная конфигурация Vercel

Убедитесь, что в настройках проекта указано:

```
Framework Preset: Next.js
Root Directory: apps/web          ← КРИТИЧЕСКИ ВАЖНО!
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

## 🆘 Если Root Directory не сохраняется

1. **Удалите проект** в Vercel
2. **Импортируйте репозиторий заново**
3. **На этапе настройки** сразу укажите:
   - Framework: `Next.js`
   - Root Directory: `apps/web` (введите вручную!)
4. **Сохраните**

## ⚠️ ВАЖНО

- Root Directory **ОБЯЗАТЕЛЬНО** должен быть `apps/web`
- Без этого Vercel будет работать из корня и пытаться использовать Turbo
- Это приведет к ошибкам сборки

---

**После правильной настройки Root Directory деплой должен работать!** 🎉

