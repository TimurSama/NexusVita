# API Документация

## Базовый URL
```
http://localhost:3001/api
```

## Аутентификация

Большинство эндпоинтов требуют JWT токен в заголовке:
```
Authorization: Bearer <token>
```

## Эндпоинты

### Аутентификация

#### POST /auth/register
Регистрация нового пользователя

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "Иван",
  "lastName": "Иванов",
  "role": "USER"
}
```

**Ответ:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "firstName": "Иван",
    "role": "USER"
  }
}
```

#### POST /auth/login
Вход в систему

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET /auth/me
Получение текущего пользователя (требует токен)

---

### Тренеры

#### GET /trainers
Получение списка всех тренеров

#### GET /trainers/:slug
Получение страницы тренера по slug

#### POST /trainers/:trainerId/page
Создание/обновление страницы тренера (требует токен, роль TRAINER)

---

### Публикации

#### GET /posts
Получение публикаций

**Query параметры:**
- `authorId` - ID автора
- `category` - категория
- `limit` - лимит (по умолчанию 20)
- `offset` - смещение

#### POST /posts
Создание публикации (требует токен)

**Тело запроса:**
```json
{
  "type": "PHOTO",
  "content": "Текст поста",
  "media": ["url1", "url2"],
  "category": "personal",
  "tags": ["tag1", "tag2"]
}
```

---

### Тренировки

#### GET /workouts/plans
Получение программ тренировок

**Query параметры:**
- `trainerId` - ID тренера
- `userId` - ID пользователя

#### POST /workouts/records
Создание записи о тренировке (требует токен)

---

### Питание

#### GET /nutrition/plans
Получение планов питания

---

### Локации

#### GET /locations
Получение списка локаций

**Query параметры:**
- `type` - тип локации
- `city` - город

---

### Магазин

#### GET /shop/products
Получение товаров

#### POST /shop/orders
Создание заказа (требует токен)

---

### Чат

#### GET /chat
Получение чатов пользователя (требует токен)

#### POST /chat/:chatId/messages
Отправка сообщения (требует токен)

---

### События

#### GET /events
Получение событий

#### POST /events/:eventId/register
Регистрация на событие (требует токен)

---

### Челленджи

#### GET /challenges
Получение челленджей

#### POST /challenges/:challengeId/join
Участие в челлендже (требует токен)

---

### Токены

#### GET /tokens/balance
Получение баланса токенов (требует токен)

#### GET /tokens/transactions
Получение истории транзакций (требует токен)

---

### Темы

#### GET /themes
Получение всех публичных тем

#### POST /themes
Создание темы (требует токен)

---

## Коды ответов

- `200` - Успешно
- `201` - Создано
- `400` - Неверный запрос
- `401` - Не авторизован
- `403` - Недостаточно прав
- `404` - Не найдено
- `500` - Ошибка сервера

