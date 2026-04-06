cookies + response

# 1. Инициализация репозитория
git init

# 2. Добавление всех файлов
git add .

# 3. Первый коммит
git commit -m "Первый коммит"

# 4. Переименование ветки master → main (если нужно)
git branch -M main

# 5. Привязка удалённого репозитория
git remote add origin https://github.com/easywork2026first/cookies.git

# 6. Отправка проекта на GitHub
git push -u origin main
