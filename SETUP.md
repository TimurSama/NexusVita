# Инструкция по установке и запуску Nexus Vita

## Требования

- Node.js 18+ 
- PostgreSQL 14+
- npm или yarn

## Установка

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка базы данных

Создайте файл `.env` в корне проекта:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nexus_vita?schema=public"
NEXT_PUBLIC_APP_URL=http://localhost:3001
AUTH_SECRET=your-secret-key-here
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
KYC_PROVIDER=disabled
KYC_API_KEY=
OURA_CLIENT_ID=
OURA_CLIENT_SECRET=
OURA_REDIRECT_URI=
OURA_API_BASE_URL=https://api.ouraring.com
GARMIN_CLIENT_ID=
GARMIN_CLIENT_SECRET=
GARMIN_AUTHORIZE_URL=
GARMIN_TOKEN_URL=
GARMIN_REDIRECT_URI=
GARMIN_API_BASE_URL=
GARMIN_SLEEP_ENDPOINT=
GARMIN_STEPS_ENDPOINT=
GARMIN_HR_ENDPOINT=
SENTRY_DSN=
CRON_SECRET=
AI_PROVIDER=fallback
OPENAI_API_KEY=
OPENAI_MODEL=
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=
```

### 3. Инициализация базы данных

```bash
# Генерация Prisma клиента
npm run db:generate

# Применение схемы к базе данных
npm run db:push

# (Опционально) Заполнение тестовыми данными
npm run db:seed
```

### 4. Запуск приложения

```bash
# Режим разработки
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
nexus-vita/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard страницы
│   │   ├── page.tsx       # Главная страница с Витрувианским человеком
│   │   ├── training/      # Страница тренировок
│   │   ├── nutrition/     # Страница питания
│   │   ├── monitoring/    # Мониторинг и анализы
│   │   └── metrics/       # Детальные метрики
│   ├── api/               # API routes
│   │   ├── metrics/       # API для метрик
│   │   └── analyses/      # API для анализов
│   ├── layout.tsx         # Главный layout
│   └── globals.css        # Глобальные стили
├── components/            # React компоненты
│   ├── vitruvian/         # Витрувианский человек
│   ├── dashboard/         # Dashboard компоненты
│   └── ui/                # UI компоненты
├── lib/                   # Утилиты и конфигурация
│   ├── db/                # Prisma клиент
│   └── utils/             # Вспомогательные функции
├── prisma/                # Prisma схемы
│   ├── schema.prisma      # Схема базы данных
│   └── seed.ts            # Скрипт для заполнения тестовыми данными
└── types/                 # TypeScript типы
```

## Основные функции (Фаза 1 - MVP)

✅ **Реализовано:**

- Главная страница Dashboard с Витрувианским человеком
- Интерактивные метки-ссылки для навигации
- Страница отслеживания веса
- Страница медицинских анализов
- Страница питания
- Страница тренировок с визуализацией упражнений
- Стилистика пергамента/пожелтевшей бумаги
- Базовая структура базы данных

## Следующие шаги (Фаза 2+)

- [ ] Модуль токеномики (NXT токены)
- [ ] Система подписок на профессионалов
- [ ] Социальная сеть (лента, друзья, чаты)
- [ ] Поиск профессионалов и локаций
- [ ] Система наград и достижений
- [ ] Магазин
- [ ] Энциклопедия
- [ ] Инвестиции в исследования

## Разработка

### Команды

```bash
# Разработка
npm run dev

# Сборка
npm run build

# Запуск production версии
npm start

# Проверка типов
npm run type-check

# Линтинг
npm run lint

# Тесты
npm run test

# Работа с базой данных
npm run db:generate    # Генерация Prisma клиента
npm run db:push        # Применение изменений схемы
npm run db:migrate     # Создание миграции
npm run db:seed        # Заполнение тестовыми данными
```

## Технологии

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Animations**: Framer Motion
- **Icons**: Lucide React


