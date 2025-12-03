# 🚀 ДЕПЛОЙ В GITHUB - ИНСТРУКЦИЯ

## Репозиторий: https://github.com/TimurSama/NexusVita

---

## ⚡ БЫСТРЫЙ ДЕПЛОЙ (PowerShell)

Выполните в PowerShell:

```powershell
cd w:\projects\NexuxVita
.\deploy.ps1
```

Или выполните команды вручную:

---

## 📝 РУЧНОЙ ДЕПЛОЙ

### Шаг 1: Перейдите в директорию проекта
```bash
cd w:\projects\NexuxVita
```

### Шаг 2: Инициализация Git
```bash
git init
```

### Шаг 3: Настройка remote
```bash
git remote add origin https://github.com/TimurSama/NexusVita.git
```

Если remote уже существует:
```bash
git remote remove origin
git remote add origin https://github.com/TimurSama/NexusVita.git
```

### Шаг 4: Добавление всех файлов
```bash
git add .
```

### Шаг 5: Коммит
```bash
git commit -m "Initial commit: Nexus Vita - полная версия с демо-режимом, децентрализацией и человекоцентричностью"
```

### Шаг 6: Переключение на main
```bash
git branch -M main
```

### Шаг 7: Force push (заменит всё в репозитории)
```bash
git push -u origin main --force
```

---

## ✅ ПРОВЕРКА

После push проверьте:
- https://github.com/TimurSama/NexusVita
- Все файлы должны быть загружены
- GitHub Actions должны быть настроены

---

## ⚠️ ВАЖНО

- `--force` заменит ВСЁ содержимое репозитория
- Убедитесь, что это то, что нужно
- Все файлы из `.gitignore` будут исключены

---

## 📦 Что будет загружено

- ✅ Frontend (Next.js)
- ✅ Backend (Express)
- ✅ Документация
- ✅ GitHub Actions
- ✅ Конфигурационные файлы
- ❌ node_modules (исключены)
- ❌ .env файлы (исключены)
- ❌ .docx файлы (исключены)

---

## 🎯 После деплоя

1. Настройте GitHub Secrets (если нужны)
2. Проверьте работу GitHub Actions
3. Настройте деплой на Vercel/Railway

