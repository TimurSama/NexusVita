# 📋 Список проблемных модулей и страниц

## 🔴 КРИТИЧЕСКИЕ ПРОБЛЕМЫ (блокируют деплой)

### 1. Страницы с ошибками статической генерации

#### `app/(public)/demo/page.tsx`
**Проблемы:**
- ❌ `TypeError: Cannot read properties of undefined (reading 'map')` - строка 282
- ❌ `Error: Unsupported Server Component type: {...}` - проблема сериализации
- ⚠️ Использует `export const dynamic = 'force-dynamic'` в клиентском компоненте (не работает)
- ⚠️ Множество неиспользуемых импортов (ESLint warnings)

**Статус:** ✅ Частично исправлено (добавлены safeModules/safeSectors, но проблема сериализации остается)

---

#### `app/(public)/presentation/page.tsx`
**Проблемы:**
- ❌ `Error: Unsupported Server Component type: {...}` - проблема сериализации
- ⚠️ Импортирует данные из `components/presentation/data.tsx` с React компонентами

**Статус:** ⚠️ Требует исправления

---

### 2. Модуль данных с проблемами сериализации

#### `components/presentation/data.tsx`
**Проблемы:**
- ❌ Содержит React компоненты (иконки) в данных, которые не могут быть сериализованы
- ❌ Используется в `/demo` и `/presentation` страницах
- ⚠️ Иконки хранятся как `React.ComponentType`, но Next.js все равно пытается сериализовать

**Статус:** ⚠️ Требует рефакторинга

---

### 3. API роуты без динамической конфигурации

#### ✅ Исправлено (добавлен `export const dynamic = 'force-dynamic'`):
- `app/api/achievements/user/route.ts` ✅
- `app/api/auth/me/route.ts` ✅
- `app/api/calendar/ics/route.ts` ✅
- `app/api/integrations/ingestions/route.ts` ✅
- `app/api/oauth/garmin/callback/route.ts` ✅
- `app/api/oauth/oura/callback/route.ts` ✅
- `app/api/referrals/code/route.ts` ✅
- `app/api/specialists/route.ts` ✅
- `app/api/achievements/route.ts` ✅
- `app/api/rewards/route.ts` ✅

---

## ⚠️ ПРЕДУПРЕЖДЕНИЯ (не блокируют, но показывают проблемы)

### 4. Dashboard страницы с ESLint warnings

#### `app/(dashboard)/access/page.tsx`
- ⚠️ Неиспользуемые импорты: `Upload`, `cn`
- ⚠️ Неиспользуемая переменная: `isAuthed`

#### `app/(dashboard)/achievements/page.tsx`
- ⚠️ Неиспользуемые импорты: `Star`, `CheckCircle`
- ⚠️ Использование `any` типов (строки 38, 39)

#### `app/(dashboard)/calendar/page.tsx`
- ⚠️ Неиспользуемые импорты: `Plus`, `cn`
- ⚠️ Неиспользуемая переменная: `setMockEvents`, `err`
- ⚠️ Проблемы с React Hooks зависимостями (строка 109)
- ⚠️ Использование `any` типов (строки 217, 291)

#### `app/(dashboard)/dao/page.tsx`
- ⚠️ Использование `any` типа (строка 57)

#### `app/(dashboard)/ecosystem/page.tsx`
- ⚠️ Неиспользуемые импорты: `Sparkles`, `Users`, `TrendingUp`, `Calendar`, `cn`

#### `app/(dashboard)/goals/page.tsx`
- ⚠️ Неиспользуемые переменные: `selectedGoal`, `setMetrics`
- ⚠️ Неиспользуемый импорт: `cn`
- ⚠️ Использование `any` типа (строка 78)

#### `app/(dashboard)/imports/page.tsx`
- ⚠️ Неиспользуемый импорт: `NeumorphicInput`

#### `app/(dashboard)/journal/page.tsx`
- ⚠️ Неиспользуемая переменная: `isAuthenticated`

#### `app/(dashboard)/knowledge/page.tsx`
- ⚠️ Неиспользуемые импорты: `XCircle`, `cn`

#### `app/(dashboard)/marketplace/page.tsx`
- ⚠️ Использование `any` типа (строка 69)

#### `app/(dashboard)/medical-card/page.tsx`
- ⚠️ Неиспользуемые импорты: `FileText`
- ⚠️ Неиспользуемые переменные: `user`, `loading`

#### `app/(dashboard)/metrics/weight/page.tsx`
- ⚠️ Неиспользуемые переменные: `setCurrentWeight`, `setTargetWeight`

#### `app/(dashboard)/monitoring/analyses/page.tsx`
- ⚠️ Неиспользуемые импорты: `TrendingUp`, `cn`

#### `app/(dashboard)/nutrition/page.tsx`
- ⚠️ Неиспользуемые импорты: `TrendingUp`, `cn`
- ⚠️ Неиспользуемые переменные: `setDailyCalories`, `setTargetCalories`, `setProtein`, `setCarbs`, `setFats`, `colorClasses`

#### `app/(dashboard)/page.tsx`
- ⚠️ Неиспользуемый импорт: `Calendar`

#### `app/(dashboard)/profile/page.tsx`
- ⚠️ Неиспользуемый импорт: `cn`

#### `app/(dashboard)/referrals/page.tsx`
- ⚠️ Неиспользуемый импорт: `cn`
- ⚠️ Неиспользуемые переменные: `userId`, `setType`, `handleInvite`

#### `app/(dashboard)/social/page.tsx`
- ⚠️ Неиспользуемые импорты: `Link`, `Plus`, `X`
- ⚠️ Проблемы с React Hooks зависимостями (строки 91, 125)

#### `app/(dashboard)/specialist-dashboard/page.tsx`
- ⚠️ Неиспользуемый импорт: `cn`
- ⚠️ Неиспользуемая переменная: `userId`
- ⚠️ Использование `any` типов (строки 25, 28)

#### `app/(dashboard)/specialists/page.tsx`
- ⚠️ Неиспользуемые импорты: `MapPin`, `Filter`, `MessageCircle`, `Award`, `NeumorphicCarousel`, `cn`
- ⚠️ Неиспользуемые переменные: `offers`, `selectedCategory`, `setSelectedCategory`, `err`
- ⚠️ Проблемы с React Hooks зависимостями (строка 115)
- ⚠️ Множественное использование `any` типов (строки 86, 87, 88, 92, 93, 94, 95, 124, 211)

#### `app/(dashboard)/subscriptions/page.tsx`
- ⚠️ Неиспользуемые импорты: `CheckCircle`, `XCircle`, `Clock`

#### `app/(dashboard)/training/page.tsx`
- ⚠️ Использование `any` типа (строка 71)

---

### 5. Public страницы с ESLint warnings

#### `app/(public)/about/page.tsx`
- ⚠️ Неиспользуемые импорты: `useEffect`, `Calendar`, `BookOpen`, `Gift`, `Zap`, `Activity`, `Shield`, `BarChart3`, `NeumorphicProgress`
- ⚠️ Неиспользуемые переменные: `formData`, `setFormData`

#### `app/(public)/demo/page.tsx`
- ⚠️ Неиспользуемые импорты: `useEffect`, `useMemo`, `useTransform`, `Brain`, `Droplets`, `ArrowRight`, `Info`, `ChevronRight`, `ShieldCheck`, `Stethoscope`, `Microscope`, `Calendar`, `Settings`, `ShoppingBag`, `Layers`, `Plus`, `TrendingUp`, `Target`, `BarChart3`, `Clock`, `X`, `NeumorphicCarousel`
- ⚠️ Неиспользуемые переменные: `generateMockEvents`, `generateMockGoals`, `generateMockMetrics`, `Lang`, `setChatContext`, `lang` (в нескольких местах)
- ⚠️ Использование `any` типов (строки 114, 781, 807, 1054, 1144, 1215, 1386)

---

### 6. Components с ESLint warnings

#### `components/dashboard/ProgressWidget.tsx`
- ⚠️ Неиспользуемый импорт: `Target`
- ⚠️ Неиспользуемая переменная: `i` (строка 13)

#### `components/presentation/BodyExplorerSection.tsx`
- ⚠️ Неиспользуемый импорт: `NeumorphicButton`

#### `components/presentation/ChatWidget.tsx`
- ⚠️ Неиспользуемая переменная: `remainingQuestions`

#### `components/presentation/DashboardPreviewSection.tsx`
- ⚠️ Неиспользуемый параметр: `onSubscribeClick`

#### `components/presentation/ExecutiveSummarySection.tsx`
- ⚠️ Неиспользуемый импорт: `NeumorphicButton`

#### `components/presentation/HeroSection.tsx`
- ⚠️ Неиспользуемая переменная: `ringsRotation`

#### `components/presentation/InteractiveDashboard.tsx`
- ⚠️ Неиспользуемые импорты: `Edit`, `X`, `ChevronRight`, `BarChart3`, `PieChart`, `LineChart`

#### `components/presentation/InteractiveElements.tsx`
- ⚠️ Неиспользуемые импорты: `Calendar`, `TrendingUp`, `Brain`
- ⚠️ Неиспользуемый тип: `InteractiveElementProps`
- ⚠️ Использование `any` типа (строка 162)

#### `components/presentation/InteractiveTimeline.tsx`
- ⚠️ Неиспользуемый импорт: `AnimatePresence`

---

### 7. Библиотеки и утилиты

#### `lib/auth/token.ts`
- ⚠️ Использует Node.js модуль `crypto`, который не поддерживается в Edge Runtime
- ⚠️ Предупреждение при сборке, но не блокирует деплой

---

## 📊 Статистика проблем

### По приоритету:
- 🔴 **Критические (блокируют деплой):** 3 файла
- ⚠️ **Предупреждения (не блокируют):** ~40+ файлов

### По типу:
- **Ошибки компиляции:** 2 файла (`demo/page.tsx`, `presentation/page.tsx`)
- **Проблемы сериализации:** 1 файл (`data.tsx`)
- **ESLint warnings:** ~40+ файлов
- **Edge Runtime warnings:** 1 файл (`lib/auth/token.ts`)

---

## ✅ Что уже исправлено

1. ✅ API роуты - добавлен `export const dynamic = 'force-dynamic'`
2. ✅ `safeModules` и `safeSectors` - добавлены проверки на undefined
3. ✅ `next.config.js` - убрана неправильная конфигурация
4. ✅ Layout для `(public)` группы - отключена статическая генерация

---

## 🔧 Что нужно исправить

1. ❌ Проблема сериализации в `data.tsx` - React компоненты в данных
2. ❌ `export const dynamic` в клиентских компонентах - не работает, нужно убрать
3. ⚠️ Очистить неиспользуемые импорты (опционально)
4. ⚠️ Заменить `any` на конкретные типы (опционально)
