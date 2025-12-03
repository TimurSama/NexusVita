# Инструкция по деплою в GitHub репозиторий

## Репозиторий: https://github.com/TimurSama/NexusVita

## Шаги для деплоя

### 1. Инициализация Git (если еще не сделано)

```bash
cd w:\projects\NexuxVita
git init
```

### 2. Добавление remote репозитория

```bash
# Если remote уже существует, сначала удалите его
git remote remove origin

# Добавьте новый remote
git remote add origin https://github.com/TimurSama/NexusVita.git
```

### 3. Проверка текущего состояния

```bash
git status
```

### 4. Добавление всех файлов

```bash
# Добавить все файлы (кроме тех, что в .gitignore)
git add .
```

### 5. Коммит

```bash
git commit -m "Initial commit: Nexus Vita - полная версия с демо-режимом, децентрализацией и человекоцентричностью"
```

### 6. Push в репозиторий (с заменой всего содержимого)

```bash
# Переключиться на main ветку
git branch -M main

# Force push (заменит всё содержимое репозитория)
git push -u origin main --force
```

⚠️ **ВНИМАНИЕ**: `--force` заменит всё содержимое репозитория. Убедитесь, что это то, что нужно!

### 7. Проверка

После push проверьте репозиторий на GitHub:
https://github.com/TimurSama/NexusVita

---

## Альтернативный вариант (без force push)

Если хотите сохранить историю коммитов из репозитория:

```bash
# Получить существующий репозиторий
git fetch origin

# Создать новую ветку
git checkout -b new-main

# Добавить все файлы
git add .

# Коммит
git commit -m "Nexus Vita - полная версия"

# Push новой ветки
git push origin new-main

# Затем в GitHub можно сделать new-main основной веткой
```

---

## После деплоя

1. Настройте GitHub Secrets (если нужны для CI/CD)
2. Проверьте работу GitHub Actions
3. Настройте деплой на Vercel/Railway

---

## Структура проекта в репозитории

```
NexusVita/
├── frontend/          # Next.js приложение
├── backend/           # Express API
├── docs/              # Документация
├── .github/           # GitHub Actions
├── README.md
├── package.json
└── ...
```

