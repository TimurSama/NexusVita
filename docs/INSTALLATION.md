# Установка и запуск Nexus Vita

## Требования

- Node.js 18+ 
- PostgreSQL 14+
- npm или yarn

## Установка

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd nexus-vita
```

### 2. Установка зависимостей

```bash
npm run install:all
```

Или отдельно:

```bash
# Корневая директория
npm install

# Фронтенд
cd frontend
npm install

# Бэкенд
cd ../backend
npm install
```

### 3. Настройка базы данных

1. Создайте базу данных PostgreSQL:
```sql
CREATE DATABASE nexus_vita;
```

2. Настройте переменные окружения в `backend/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/nexus_vita?schema=public"
JWT_SECRET=your-secret-key
PORT=3001
FRONTEND_URL=http://localhost:3000
```

3. Запустите миграции:
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 4. Запуск приложения

#### Режим разработки

Из корневой директории:
```bash
npm run dev
```

Или отдельно:

```bash
# Терминал 1 - Бэкенд
cd backend
npm run dev

# Терминал 2 - Фронтенд
cd frontend
npm run dev
```

#### Продакшн

```bash
# Сборка
npm run build

# Запуск
cd backend
npm start

cd frontend
npm start
```

## Доступ к приложению

- Фронтенд: http://localhost:3000
- Бэкенд API: http://localhost:3001
- Prisma Studio: `cd backend && npx prisma studio`

## Первый запуск

1. Откройте http://localhost:3000
2. Зарегистрируйте нового пользователя
3. Или используйте демо-режим: http://localhost:3000/demo

## Troubleshooting

### Ошибки подключения к БД

- Проверьте `DATABASE_URL` в `.env`
- Убедитесь, что PostgreSQL запущен
- Проверьте права доступа к БД

### Ошибки портов

- Убедитесь, что порты 3000 и 3001 свободны
- Измените порты в конфигурации при необходимости

### Проблемы с зависимостями

```bash
# Очистка и переустановка
rm -rf node_modules package-lock.json
npm install
```

