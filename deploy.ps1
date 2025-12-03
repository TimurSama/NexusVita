# Скрипт для деплоя Nexus Vita в GitHub
# Репозиторий: https://github.com/TimurSama/NexusVita

Write-Host "========================================" -ForegroundColor Green
Write-Host "  ДЕПЛОЙ NEXUS VITA В GITHUB" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Проверка Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ОШИБКА: Git не установлен!" -ForegroundColor Red
    Write-Host "Установите Git: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}

# Переход в директорию проекта
$projectPath = "w:\projects\NexuxVita"
if (-not (Test-Path $projectPath)) {
    Write-Host "ОШИБКА: Директория проекта не найдена!" -ForegroundColor Red
    Write-Host "Ожидаемый путь: $projectPath" -ForegroundColor Yellow
    exit 1
}

Set-Location $projectPath

Write-Host "Текущая директория: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Проверка структуры проекта
Write-Host "Проверка структуры проекта..." -ForegroundColor Cyan
$requiredFolders = @("frontend", "backend", "docs")
$allPresent = $true
foreach ($folder in $requiredFolders) {
    if (Test-Path $folder) {
        Write-Host "  ✓ $folder" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $folder отсутствует" -ForegroundColor Red
        $allPresent = $false
    }
}
if (-not $allPresent) {
    Write-Host ""
    Write-Host "ОШИБКА: Не все необходимые папки найдены!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Инициализация Git (если нужно)
if (-not (Test-Path ".git")) {
    Write-Host "Инициализация Git..." -ForegroundColor Yellow
    git init
    Write-Host "  ✓ Git инициализирован" -ForegroundColor Green
} else {
    Write-Host "Git уже инициализирован" -ForegroundColor Cyan
}

# Настройка remote
Write-Host ""
Write-Host "Настройка remote репозитория..." -ForegroundColor Yellow
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "  Удаление существующего remote..." -ForegroundColor Cyan
    git remote remove origin
}
git remote add origin https://github.com/TimurSama/NexusVita.git
Write-Host "  ✓ Remote настроен: https://github.com/TimurSama/NexusVita.git" -ForegroundColor Green

# Проверка статуса
Write-Host ""
Write-Host "Статус Git:" -ForegroundColor Cyan
git status --short

# Добавление файлов
Write-Host ""
Write-Host "Добавление всех файлов..." -ForegroundColor Yellow
git add .
$fileCount = (git ls-files | Measure-Object).Count
Write-Host "  ✓ Добавлено файлов: $fileCount" -ForegroundColor Green

# Коммит
Write-Host ""
Write-Host "Создание коммита..." -ForegroundColor Yellow
$commitMessage = "Initial commit: Nexus Vita - полная версия с демо-режимом, децентрализацией и человекоцентричностью"
git commit -m $commitMessage
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Коммит создан" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Нет изменений для коммита (возможно, уже закоммичено)" -ForegroundColor Yellow
}

# Переключение на main
Write-Host ""
Write-Host "Переключение на main ветку..." -ForegroundColor Yellow
git branch -M main
Write-Host "  ✓ Ветка main активна" -ForegroundColor Green

# Подтверждение перед push
Write-Host ""
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  ВНИМАНИЕ!" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "Следующая команда заменит ВСЁ содержимое" -ForegroundColor Yellow
Write-Host "репозитория https://github.com/TimurSama/NexusVita" -ForegroundColor Yellow
Write-Host ""
Write-Host "Команда: git push -u origin main --force" -ForegroundColor White
Write-Host ""

$confirm = Read-Host "Продолжить с force push? (y/n)"
if ($confirm -eq "y" -or $confirm -eq "Y" -or $confirm -eq "yes") {
    Write-Host ""
    Write-Host "Выполнение push..." -ForegroundColor Yellow
    git push -u origin main --force
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ✅ ДЕПЛОЙ ЗАВЕРШЁН!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Проверьте репозиторий:" -ForegroundColor Cyan
        Write-Host "https://github.com/TimurSama/NexusVita" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "ОШИБКА при push!" -ForegroundColor Red
        Write-Host "Проверьте:" -ForegroundColor Yellow
        Write-Host "  1. Доступ к репозиторию" -ForegroundColor Yellow
        Write-Host "  2. Авторизацию в Git" -ForegroundColor Yellow
        Write-Host "  3. Права на запись в репозиторий" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "Деплой отменён." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Для ручного деплоя выполните:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main --force" -ForegroundColor White
    Write-Host ""
}

