# 🚀 ДЕПЛОЙ В GITHUB

## Репозиторий: https://github.com/TimurSama/NexusVita

---

## ⚡ БЫСТРЫЙ СТАРТ

### Вариант 1: Автоматический скрипт

```powershell
cd w:\projects\NexuxVita
.\deploy.ps1
```

### Вариант 2: Ручной деплой

Выполните команды по порядку:

```bash
# 1. Перейти в директорию проекта
cd w:\projects\NexuxVita

# 2. Инициализировать Git (если еще не сделано)
git init

# 3. Настроить remote репозиторий
git remote add origin https://github.com/TimurSama/NexusVita.git

# Если remote уже существует, сначала удалите:
# git remote remove origin
# git remote add origin https://github.com/TimurSama/NexusVita.git

# 4. Добавить все файлы
git add .

# 5. Создать коммит
git commit -m "Initial commit: Nexus Vita - полная версия"

# 6. Переключиться на main
git branch -M main

# 7. Загрузить в репозиторий (ЗАМЕНИТ ВСЁ СОДЕРЖИМОЕ!)
git push -u origin main --force
```

---

## ⚠️ ВАЖНО

- Команда `--force` **заменит всё содержимое** репозитория
- Убедитесь, что это то, что нужно
- Все файлы из `.gitignore` будут исключены

---

## ✅ ПРОВЕРКА ПОСЛЕ ДЕПЛОЯ

1. Откройте https://github.com/TimurSama/NexusVita
2. Проверьте, что все файлы загружены
3. Проверьте работу GitHub Actions

---

## 📦 ЧТО БУДЕТ ЗАГРУЖЕНО

- ✅ Frontend (Next.js)
- ✅ Backend (Express)
- ✅ Документация
- ✅ GitHub Actions
- ✅ Конфигурационные файлы
- ❌ node_modules (исключены)
- ❌ .env файлы (исключены)

---

## 🎯 СЛЕДУЮЩИЕ ШАГИ

После успешного деплоя:

1. Настройте GitHub Secrets (если нужны для CI/CD)
2. Проверьте работу GitHub Actions
3. Настройте деплой на Vercel (frontend) и Railway/Render (backend)

---

## 📚 ДОКУМЕНТАЦИЯ

- [DEPLOY_NOW.md](DEPLOY_NOW.md) - Подробная инструкция
- [DEPLOYMENT.md](DEPLOYMENT.md) - Инструкции по деплою на серверы
- [GITHUB_SETUP.md](GITHUB_SETUP.md) - Настройка GitHub

