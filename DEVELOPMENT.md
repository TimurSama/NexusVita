# Nexus Vita - Руководство по разработке

## 🚀 Быстрый старт

### Установка зависимостей

```bash
# Установить все зависимости
npm install

# Установить зависимости для конкретного workspace
cd apps/api && npm install
cd ../web && npm install
```

### Запуск в режиме разработки

```bash
# Запустить все приложения
npm run dev

# Или запустить отдельно
npm run dev --workspace=apps/api
npm run dev --workspace=apps/web
```

### База данных

```bash
# Запустить PostgreSQL и Redis через Docker
docker-compose up -d postgres redis

# Применить миграции
cd apps/api
npx prisma migrate dev
npx prisma generate

# Открыть Prisma Studio
npx prisma studio
```

## 📁 Структура проекта

```
app/
├── apps/
│   ├── api/              # Backend API (Express.js + Prisma)
│   │   ├── src/
│   │   │   ├── routes/   # API маршруты (21 модуль)
│   │   │   ├── services/ # Бизнес-логика
│   │   │   ├── middleware/
│   │   │   └── utils/
│   │   └── prisma/       # Схема БД
│   │
│   └── web/              # Frontend (Next.js 14)
│       └── src/
│           ├── app/      # Страницы и роутинг
│           ├── components/
│           ├── lib/      # API клиент
│           └── stores/   # Zustand стейт
│
├── packages/             # Общие пакеты (будущее)
└── docker-compose.yml    # Docker конфигурация
```

## 🛠 Технологический стек

### Backend
- **Express.js** - Web framework
- **Prisma** - ORM и миграции БД
- **PostgreSQL** - Основная БД
- **Redis** - Кэширование и сессии
- **Socket.IO** - WebSocket для чата
- **JWT** - Аутентификация
- **Zod** - Валидация схем

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **Zustand** - Управление состоянием
- **React Query** - Управление серверным состоянием (планируется)

## 📊 База данных

### Модели данных

Схема включает 30+ моделей для всех модулей:
- Пользователи и профили
- Тренеры и специалисты
- Тренировки и программы
- Питание и нутрициология
- Медицинские записи
- Психология и ментальное здоровье
- Сексология
- Привычки и рутины
- Образование и курсы
- Социальная сеть
- Маркетплейс
- DAO и токеномика
- Реферальная система

### Миграции

```bash
# Создать новую миграцию
npx prisma migrate dev --name migration_name

# Применить миграции в продакшене
npx prisma migrate deploy

# Сбросить БД (только для разработки!)
npx prisma migrate reset
```

## 🔐 Аутентификация

### JWT токены

Токены хранятся в localStorage и отправляются в заголовке `Authorization: Bearer <token>`.

### Роли пользователей

- `GUEST` - Гость
- `USER` - Обычный пользователь
- `TRAINER` - Тренер
- `DOCTOR` - Врач
- `NUTRITIONIST` - Нутрициолог
- `PSYCHOLOGIST` - Психолог
- `SEXOLOGIST` - Сексолог
- `SPECIALIST` - Специалист
- `LOCATION_ADMIN` - Администратор локации
- `ADMIN` - Администратор

## 📝 API Документация

### Основные endpoints

- `/api/auth` - Авторизация
- `/api/users` - Пользователи
- `/api/profiles` - Профили
- `/api/workouts` - Тренировки
- `/api/nutrition` - Питание
- `/api/medical` - Медицина
- `/api/psychology` - Психология
- `/api/habits` - Привычки
- `/api/social` - Социальная сеть
- `/api/trainers` - Специалисты
- `/api/locations` - Локации
- `/api/marketplace` - Маркетплейс
- `/api/dao` - DAO управление
- `/api/referrals` - Реферальная система

### Формат запросов

Все запросы используют JSON формат. Ответы также в JSON.

### Обработка ошибок

Ошибки возвращаются в формате:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 🎨 Дизайн-система

### Цветовая палитра

- **Primary**: Violet/Purple (#8b5cf6)
- **Accent**: Cyan (#06b6d4)
- **Secondary**: Rose (#f43f5e)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Error**: Red (#ef4444)

### Компоненты

Все UI компоненты находятся в `apps/web/src/components/ui/`:
- Button
- Card
- Input
- Badge
- Avatar
- Toast

### Анимации

Используются CSS переменные для переходов:
- `--transition-fast`: 150ms
- `--transition-base`: 250ms
- `--transition-slow`: 350ms

## 🧪 Тестирование

```bash
# Запустить тесты
npm run test

# Запустить тесты с покрытием
npm run test:coverage
```

## 🚢 Деплой

### Production build

```bash
# Собрать все приложения
npm run build

# Собрать отдельно
npm run build --workspace=apps/api
npm run build --workspace=apps/web
```

### Docker

```bash
# Собрать образы
docker-compose build

# Запустить в продакшене
docker-compose up -d
```

## 📦 Переменные окружения

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nexusvita"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key"
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WS_URL=ws://localhost:5000
```

## 🔧 Полезные команды

```bash
# Форматирование кода
npm run format

# Линтинг
npm run lint

# Проверка типов
npm run type-check

# Очистка кэша
npm run clean
```

## 📚 Дополнительные ресурсы

- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Docs](https://expressjs.com/)

## 🤝 Вклад в проект

1. Создайте ветку для фичи
2. Внесите изменения
3. Создайте Pull Request
4. Дождитесь ревью

## 📞 Поддержка

Если у вас возникли вопросы, создайте issue в репозитории или свяжитесь с командой разработки.

