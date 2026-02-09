# 📁 Структура проекта Nexus Vita

**Дата создания:** 2025-02-09  
**Версия:** 1.0

---

## 🎯 Основная рабочая директория

**`Nexus Vita/`** — это единственная корневая директория проекта. Все файлы находятся здесь.

---

## 📂 Полная структура проекта

```
Nexus Vita/
│
├── 📱 app/                          # Next.js приложение
│   ├── (auth)/                     # Страницы аутентификации
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── (dashboard)/                # Страницы дашборда (24 страницы)
│   │   ├── page.tsx                # Главная страница
│   │   ├── social/page.tsx
│   │   ├── specialists/page.tsx
│   │   ├── marketplace/page.tsx
│   │   ├── journal/page.tsx
│   │   ├── calendar/page.tsx
│   │   ├── goals/page.tsx
│   │   ├── training/page.tsx
│   │   ├── nutrition/page.tsx
│   │   ├── medical-card/page.tsx
│   │   └── ... (еще 15 страниц)
│   │
│   ├── (public)/                   # Публичные страницы
│   │   ├── about/page.tsx          # Лендинг
│   │   ├── roadmap/page.tsx        # Дорожная карта
│   │   ├── pricing/page.tsx        # Тарифы
│   │   └── r/[code]/page.tsx       # Реферальные ссылки
│   │
│   ├── api/                        # API endpoints (61 endpoint)
│   │   ├── auth/                   # Аутентификация
│   │   ├── specialists/            # Специалисты
│   │   ├── calendar/               # Календарь
│   │   ├── referrals/              # Рефералы
│   │   ├── cashback/              # Кэшбэк
│   │   ├── ai-agent/              # AI агент
│   │   ├── knowledge/             # Библиотека знаний
│   │   ├── integrations/          # Интеграции
│   │   ├── dao/                   # DAO
│   │   └── ... (еще много endpoints)
│   │
│   ├── globals.css                # Глобальные стили
│   └── layout.tsx                 # Корневой layout
│
├── 🧩 components/                  # React компоненты
│   ├── ui/                        # UI компоненты (неоморфный дизайн)
│   │   ├── NeumorphicButton.tsx
│   │   ├── NeumorphicCard.tsx
│   │   ├── NeumorphicInput.tsx
│   │   ├── NeumorphicModal.tsx
│   │   ├── NeumorphicBadge.tsx
│   │   ├── NeumorphicProgress.tsx
│   │   ├── NeumorphicTextarea.tsx
│   │   └── NeumorphicToast.tsx
│   │
│   ├── layout/                    # Компоненты layout
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   │
│   ├── dashboard/                 # Компоненты дашборда
│   │   └── MetricLabel.tsx
│   │
│   └── vitruvian/                 # VitruvianMan компонент
│       └── VitruvianMan.tsx
│
├── 🔧 lib/                         # Утилиты и библиотеки
│   ├── auth/                      # Аутентификация
│   │   ├── password.ts
│   │   ├── session.ts
│   │   ├── token.ts
│   │   └── requireRole.ts
│   │
│   ├── payments/                  # Платежи
│   │   ├── config.ts
│   │   └── stripe.ts
│   │
│   ├── sync/                      # Синхронизация
│   │   ├── fhir.ts
│   │   ├── garmin.ts
│   │   └── oura.ts
│   │
│   ├── utils/                     # Утилиты
│   │   ├── cn.ts
│   │   └── neumorphic.ts
│   │
│   ├── achievements/              # Достижения
│   ├── audit/                    # Аудит
│   ├── db/                       # База данных
│   └── design-tokens.ts          # Дизайн-токены
│
├── 🗄️ prisma/                      # База данных
│   ├── schema.prisma              # Схема БД (все модели)
│   └── seed.ts                    # Seed данные
│
├── 🧪 tests/                       # Тесты
│   ├── auth.test.ts               # Тесты аутентификации
│   ├── e2e/                       # E2E тесты
│   │   ├── booking.test.ts
│   │   └── onboarding.test.ts
│   └── unit/                      # Unit тесты
│       └── token.test.ts
│
├── 📚 docs/                        # Документация (организована)
│   ├── deployment/                # Документы по деплою
│   │   ├── DEPLOY_FINAL.md
│   │   ├── DEPLOY_TO_GITHUB.md
│   │   ├── DEPLOYMENT.md
│   │   ├── RELEASE_PLAN.md
│   │   └── ... (еще документы)
│   │
│   ├── development/               # Документы по разработке
│   │   ├── MASTER_DEVELOPMENT_PLAN.md
│   │   ├── DEVELOPMENT_PLAN.md
│   │   ├── BUILD_FIXES.md
│   │   └── ... (еще документы)
│   │
│   ├── design/                    # Документы по дизайну
│   │   ├── DESIGN_SYSTEM_PROPOSAL.md
│   │   ├── DESIGN_IMPLEMENTATION.md
│   │   └── ... (еще документы)
│   │
│   ├── business/                  # Бизнес документы
│   │   ├── PITCH_DECK.md
│   │   ├── WHITEPAPER.md
│   │   ├── ROADMAP.md
│   │   └── ... (еще документы)
│   │
│   └── README.md                  # Индекс документации
│
├── ⚖️ LEGAL/                       # Юридические документы
│   ├── TERMS.md                   # Условия использования
│   ├── PRIVACY.md                 # Политика конфиденциальности
│   ├── MEDICAL_DATA_POLICY.md     # Политика медицинских данных
│   └── REFUND_POLICY.md           # Политика возврата
│
├── 📋 Основные файлы в корне
│   ├── README.md                  # Главный README
│   ├── TODO.md                    # Полный список задач
│   ├── QUICK_START.md             # Быстрый старт
│   ├── SETUP.md                   # Детальная настройка
│   ├── PROJECT_STRUCTURE.md       # Этот файл
│   │
│   ├── package.json               # Зависимости и скрипты
│   ├── package-lock.json
│   ├── next.config.js             # Конфигурация Next.js
│   ├── tsconfig.json              # Конфигурация TypeScript
│   ├── tailwind.config.js         # Конфигурация Tailwind
│   ├── postcss.config.js
│   ├── vitest.config.ts           # Конфигурация тестов
│   ├── vercel.json                # Конфигурация Vercel
│   ├── middleware.ts              # Next.js middleware
│   │
│   ├── sentry.client.config.ts    # Sentry (клиент)
│   ├── sentry.server.config.ts    # Sentry (сервер)
│   ├── sentry.edge.config.ts      # Sentry (edge)
│   │
│   ├── deploy-to-github.bat       # Скрипт деплоя (Windows)
│   └── deploy-to-github.sh        # Скрипт деплоя (Linux/Mac)
│
└── 📄 Документы в корне (будут перемещены в docs/)
    ├── DEPLOY_CHECK.md
    ├── DEPLOY_MINIMAL.md
    ├── GITHUB_DEPLOY.md
    ├── QUICK_DEPLOY.md
    ├── DEPLOYMENT_CHECKLIST.md
    ├── RELEASE_CHECKLIST.md
    ├── RELEASE_TODO_FIRST.md
    ├── VERCEL_ENV.md
    ├── DESIGN_IMPLEMENTATION.md
    ├── DESIGN_STATUS.md
    ├── DESIGN_UPDATE_CHECKLIST.md
    ├── INTEGRATIONS.md
    └── UPDATE_PROGRESS.md
```

---

## 📊 Статистика проекта

- **Страниц:** 30+ (24 дашборд + 6 публичных)
- **API Endpoints:** 61
- **Компоненты:** 13+ UI компонентов
- **Модели БД:** 30+ (Prisma schema)
- **Тесты:** 4+ (unit + E2E)
- **Документы:** 33+ MD файла

---

## 🎯 Основные директории

### ✅ Рабочие директории (не трогать)
- `app/` — код приложения
- `components/` — React компоненты
- `lib/` — утилиты
- `prisma/` — база данных
- `tests/` — тесты
- `LEGAL/` — юридические документы

### 📚 Документация (организована)
- `docs/deployment/` — деплой
- `docs/development/` — разработка
- `docs/design/` — дизайн
- `docs/business/` — бизнес

### 📋 Корневые файлы (важные)
- `README.md` — главный README
- `TODO.md` — список задач
- `QUICK_START.md` — быстрый старт
- `SETUP.md` — настройка
- `package.json` — зависимости
- Конфигурационные файлы

---

## ⚠️ Важные замечания

1. **Единственная корневая директория:** `Nexus Vita/`
2. **Папка "Vita Nexus" не существует** — это устаревшие ссылки в документации
3. **Все файлы проекта находятся в `Nexus Vita/`**
4. **Документация организована в `docs/`** по категориям

---

## 🔄 План реорганизации

### Выполнено ✅
- Создана структура `docs/` с подпапками
- Создан единый `TODO.md` со всеми задачами
- Обновлен `README.md` с правильной структурой
- Создан `PROJECT_STRUCTURE.md` (этот файл)

### Осталось сделать 🔄
- Переместить оставшиеся документы из корня в `docs/`
- Обновить ссылки в документах на новую структуру
- Создать `.env.example` файл

---

**Последнее обновление:** 2025-02-09
