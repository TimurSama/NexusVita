# Руководство по деплою Nexus Vita

## Подготовка к деплою

### 1. Переменные окружения

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.nexusvita.com
```

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:5432/nexus_vita
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://nexusvita.com
```

### 2. База данных

1. Создайте PostgreSQL базу данных
2. Запустите миграции:
```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

### 3. Сборка

#### Frontend
```bash
cd frontend
npm run build
npm start
```

#### Backend
```bash
cd backend
npm run build
npm start
```

## Деплой на Vercel (Frontend)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Vercel автоматически соберёт и задеплоит приложение

## Деплой на Railway/Render (Backend)

1. Подключите репозиторий
2. Настройте переменные окружения
3. Укажите команду запуска: `npm start`
4. Настройте базу данных PostgreSQL

## GitHub Actions

CI/CD настроен через GitHub Actions:
- Автоматическая проверка линтера
- Проверка типов TypeScript
- Сборка приложения

## Проверка перед деплоем

- [ ] Все переменные окружения настроены
- [ ] База данных создана и миграции применены
- [ ] Тесты проходят (если есть)
- [ ] Линтер не показывает ошибок
- [ ] TypeScript компилируется без ошибок
- [ ] Демо-режим работает
- [ ] Все страницы доступны

