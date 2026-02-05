#!/bin/bash

# Скрипт для отправки проекта в GitHub репозиторий
# Использование: ./deploy-to-github.sh

echo "🚀 Начинаем деплой в GitHub..."

# Проверка, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Убедитесь, что вы в директории 'Nexus Vita/Vita Nexus'"
    exit 1
fi

# Инициализация Git (если еще не сделано)
if [ ! -d ".git" ]; then
    echo "📦 Инициализация Git репозитория..."
    git init
fi

# Добавление remote (если еще не добавлен)
if ! git remote get-url origin &> /dev/null; then
    echo "🔗 Добавление remote репозитория..."
    git remote add origin https://github.com/TimurSama/NexusVita.git
else
    echo "✅ Remote уже настроен"
    git remote set-url origin https://github.com/TimurSama/NexusVita.git
fi

# Добавление всех файлов
echo "📝 Добавление файлов..."
git add .

# Коммит
echo "💾 Создание коммита..."
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

# Переключение на main ветку
git branch -M main

# Подтверждение перед force push
echo ""
echo "⚠️  ВНИМАНИЕ: Это перезапишет все файлы в репозитории!"
read -p "Продолжить? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Отправка в GitHub..."
    git push -u origin main --force
    echo ""
    echo "✅ Готово! Репозиторий обновлен: https://github.com/TimurSama/NexusVita"
    echo ""
    echo "📋 Следующие шаги:"
    echo "1. Проверьте репозиторий на GitHub"
    echo "2. В Vercel укажите репозиторий: TimurSama/NexusVita"
    echo "3. Root Directory оставьте пустым (или укажите .)"
    echo "4. Добавьте переменные окружения и задеплойте"
else
    echo "❌ Отменено"
    exit 1
fi
