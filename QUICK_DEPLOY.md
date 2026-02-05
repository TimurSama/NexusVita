# 🚀 Быстрый деплой за 3 шага

## Шаг 1: Загрузите код в GitHub

```bash
cd "Nexus Vita/Vita Nexus"
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/TimurSama/NexusVita.git
git branch -M main
git push -u origin main
```

## Шаг 2: Подключите Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. **Add New Project** → выберите `TimurSama/NexusVita`
3. **Важно:** Укажите **Root Directory**: `Nexus Vita/Vita Nexus`
4. Нажмите **Deploy**

## Шаг 3: Добавьте минимум переменных

После первого деплоя в **Settings** → **Environment Variables**:

```bash
# 1. Создайте базу данных (Vercel Postgres / Supabase / Neon)
DATABASE_URL=postgresql://...

# 2. Сгенерируйте секрет
AUTH_SECRET=$(openssl rand -base64 32)

# 3. После деплоя укажите URL
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

Затем выполните миграции:
```bash
npx prisma migrate deploy
```

И передеплойте в Vercel.

---

**Готово!** Приложение будет доступно по адресу `https://your-app.vercel.app`

Подробная инструкция: [DEPLOY_MINIMAL.md](./DEPLOY_MINIMAL.md)
