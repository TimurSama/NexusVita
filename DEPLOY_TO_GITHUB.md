# Инструкция по отправке в GitHub

## Шаг 1: Подготовка

Убедитесь, что вы в правильной директории:

```bash
cd "Nexus Vita/Vita Nexus"
```

## Шаг 2: Инициализация Git (если еще не сделано)

```bash
git init
```

## Шаг 3: Добавление remote репозитория

```bash
git remote add origin https://github.com/TimurSama/NexusVita.git
```

Если remote уже существует, обновите его:

```bash
git remote set-url origin https://github.com/TimurSama/NexusVita.git
```

## Шаг 4: Добавление всех файлов

```bash
git add .
```

## Шаг 5: Коммит

```bash
git commit -m "Initial commit: Full Nexus Vita platform ready for deployment"
```

## Шаг 6: Отправка в GitHub

```bash
git branch -M main
git push -u origin main --force
```

**Внимание:** `--force` перезапишет все существующие файлы в репозитории. Это нужно, если вы хотите заменить старую структуру на новую.

## Альтернатива: Если хотите сохранить старую структуру

Если в репозитории есть важные файлы, которые нужно сохранить, сначала сделайте backup:

```bash
# Создайте backup ветку
git checkout -b backup-old-structure
git push origin backup-old-structure

# Вернитесь на main
git checkout main

# Теперь можно делать force push
```

## После отправки

1. Проверьте репозиторий: https://github.com/TimurSama/NexusVita
2. Убедитесь, что все файлы на месте
3. В Vercel теперь можно просто указать репозиторий без Root Directory

## Структура после коммита

После коммита структура репозитория будет:

```
NexusVita/
├── app/
├── components/
├── lib/
├── prisma/
├── tests/
├── package.json
├── next.config.js
├── vercel.json
├── README.md
└── ... (все файлы из "Nexus Vita/Vita Nexus")
```

Теперь в Vercel можно просто указать репозиторий `TimurSama/NexusVita` без Root Directory!
