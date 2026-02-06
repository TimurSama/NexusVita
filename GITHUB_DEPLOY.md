# 🚀 Отправка в GitHub репозиторий

## Быстрая отправка (Windows PowerShell)

Откройте PowerShell в директории `Nexus Vita/Vita Nexus` и выполните:

```powershell
# 1. Инициализация Git
git init

# 2. Добавление remote репозитория
git remote add origin https://github.com/TimurSama/NexusVita.git

# 3. Добавление всех файлов
git add .

# 4. Создание коммита
git commit -m "Initial commit: Full Nexus Vita platform ready for deployment

- Complete Next.js application with all features
- Authentication and authorization
- AI Health+ agent
- Social network features
- Calendar and booking system
- Achievements and rewards
- Referral and cashback system
- Knowledge library
- Specialist management
- Ready for Vercel deployment"

# 5. Переключение на main ветку
git branch -M main

# 6. Отправка в GitHub (перезапишет все файлы)
git push -u origin main --force
```

## Или используйте готовый скрипт

### Windows:
```powershell
.\deploy-to-github.bat
```

### Linux/Mac:
```bash
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

## После отправки

1. ✅ Проверьте репозиторий: https://github.com/TimurSama/NexusVita
2. ✅ Убедитесь, что все файлы на месте
3. ✅ В Vercel теперь можно просто указать репозиторий `TimurSama/NexusVita` **без Root Directory**

## Структура после коммита

После коммита структура репозитория будет:

```
NexusVita/
├── app/              # Next.js App Router
├── components/        # React компоненты
├── lib/              # Утилиты и библиотеки
├── prisma/           # Схема базы данных
├── tests/            # Тесты
├── package.json      # Зависимости
├── next.config.js    # Конфигурация Next.js
├── vercel.json       # Конфигурация Vercel
├── README.md         # Документация
└── ... (все файлы проекта)
```

## Настройка Vercel

После отправки в GitHub:

1. Зайдите на [vercel.com](https://vercel.com)
2. **Add New Project** → выберите `TimurSama/NexusVita`
3. **Root Directory**: оставьте **пустым** (или укажите `.`)
4. Нажмите **Deploy**
5. Добавьте переменные окружения (см. [DEPLOY_MINIMAL.md](./DEPLOY_MINIMAL.md))

## Важно

- ⚠️ Команда `git push --force` **перезапишет все существующие файлы** в репозитории
- 💾 Если в репозитории есть важные файлы, сначала сделайте backup
- ✅ После отправки структура репозитория будет соответствовать структуре проекта

---

**Готово!** После выполнения команд ваш проект будет в GitHub и готов к деплою на Vercel.
