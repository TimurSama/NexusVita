# Настройка Telegram Mini App и Бота

## 📱 Telegram Mini App

### 1. Создание бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Сохраните полученный токен в `.env`:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_BOT_USERNAME=your_bot_username
   ```

### 2. Настройка Mini App

1. Отправьте команду `/newapp` в [@BotFather](https://t.me/BotFather)
2. Выберите вашего бота
3. Укажите название приложения: `Nexus Vita`
4. Укажите описание: `Экосистема здоровья и фитнеса`
5. Загрузите иконку (512x512px)
6. Укажите URL приложения: `https://nexusvita.io/telegram`
7. Сохраните полученный URL Mini App

### 3. Настройка Webhook

```bash
# Установить webhook для бота
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.com/api/telegram/webhook",
    "secret_token": "your_secret_token_here"
  }'
```

Или используйте API endpoint:
```bash
POST /api/telegram/webhook/setup
{
  "url": "https://your-domain.com/api/telegram/webhook",
  "secretToken": "your_secret_token"
}
```

Добавьте в `.env`:
```
TELEGRAM_WEBHOOK_SECRET=your_secret_token_here
```

## 🔐 Авторизация через Telegram

### Как это работает

1. Пользователь открывает Mini App в Telegram
2. Telegram передаёт `initData` с данными пользователя
3. Backend проверяет подпись данных
4. Создаётся или находится пользователь в системе
5. Генерируется JWT токен для авторизации

### Реферальная система

- При переходе по ссылке `https://t.me/bot?start=REFERRAL_CODE` код передаётся в `start_param`
- При регистрации пользователя через эту ссылку автоматически создаётся реферальная запись
- Реферер получает 100 NVT токенов за каждого активного реферала

## 📤 Отправка приглашений

### Через Telegram Bot API

```typescript
// Отправить приглашение конкретному пользователю
POST /api/telegram/invite/send
{
  "telegramId": "123456789", // Опционально, если не указан - используется подключённый аккаунт
  "chatId": 123456789 // Опционально, для отправки в конкретный чат
}
```

### Через команды бота

- `/start REFERRAL_CODE` - Регистрация с реферальным кодом
- `/invite` - Получить свою реферальную ссылку и отправить приглашение

## 🎨 Карточка приглашения

Карточка включает:
- Аватар пользователя
- Имя приглашающего
- Список преимуществ платформы
- Реферальную ссылку
- Кнопки для действий:
  - Присоединиться
  - Открыть приложение
  - Поделиться

## 🔗 Реферальные ссылки

### Формат ссылок

- **Telegram**: `https://t.me/BOT_USERNAME?start=REFERRAL_CODE`
- **Web**: `https://nexusvita.io/register?ref=REFERRAL_CODE`
- **Mini App**: `https://nexusvita.io/telegram?ref=REFERRAL_CODE`

### Получение ссылки

```typescript
GET /api/telegram/referral-link

Response:
{
  "code": "ABC123",
  "telegramLink": "https://t.me/bot?start=ABC123",
  "webLink": "https://nexusvita.io/register?ref=ABC123",
  "shareText": "Текст для соцсетей..."
}
```

## 📱 Использование в Frontend

### Проверка Telegram Web App

```typescript
import { isTelegramWebApp, initTelegramWebApp } from '@/lib/telegram';

if (isTelegramWebApp()) {
  const tg = initTelegramWebApp();
  // Использовать Telegram API
}
```

### Авторизация

```typescript
const tg = initTelegramWebApp();
if (tg) {
  const response = await fetch('/api/telegram/mini-app/auth', {
    method: 'POST',
    body: JSON.stringify({ initData: tg.initData }),
  });
  const { token } = await response.json();
  // Сохранить токен
}
```

## 🛠 Переменные окружения

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_BOT_USERNAME=your_bot_username
TELEGRAM_WEBHOOK_SECRET=your_webhook_secret

# URLs
WEB_APP_URL=https://nexusvita.io
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your_bot_username
```

## 📝 Примеры использования

### Отправка приглашения из приложения

```typescript
import { telegramApi } from '@/lib/api';

// Отправить приглашение
await telegramApi.sendInvite({
  telegramId: '123456789', // Опционально
});

// Получить реферальную ссылку
const { data } = await telegramApi.getReferralLink();
console.log(data.telegramLink);
```

### Компонент приглашения

```tsx
import { InviteCard } from '@/components/invite/InviteCard';

<InviteCard
  user={{
    name: 'Иван Иванов',
    avatarUrl: '/avatar.jpg',
    referralCode: 'ABC123',
  }}
/>
```

## 🔒 Безопасность

1. **Проверка подписи**: Все `initData` проверяются на сервере
2. **Секретный токен**: Webhook защищён секретным токеном
3. **Валидация данных**: Все данные валидируются через Zod
4. **JWT токены**: Авторизация через JWT с истечением

## 🚀 Деплой

1. Убедитесь, что все переменные окружения установлены
2. Настройте webhook для бота
3. Проверьте доступность Mini App URL
4. Протестируйте авторизацию и отправку приглашений

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи бота в Telegram
2. Проверьте логи сервера
3. Убедитесь, что все переменные окружения установлены
4. Проверьте доступность webhook URL

