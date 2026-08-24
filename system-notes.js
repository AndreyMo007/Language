// Системные конспекты - только для чтения
// Здесь вы можете добавлять свои системные темы и конспекты

const SystemNotes = {
    // Коллекция системных тем
    themes: [
        {
            id: 'system-1',
            name: 'Основы JavaScript',
            isSystem: true,
            isReadOnly: true,
            content: `
# Основы JavaScript

## Переменные

### Типы переменных:
- **let** - изменяемая переменная
- **const** - константа (не изменяется)
- **var** - устаревший способ (не рекомендуется)

### Примеры:
\`\`\`javascript
let name = "Иван";
const PI = 3.14;
var oldVar = "устарело";
\`\`\`

## Функции

### Стрелочные функции:
\`\`\`javascript
const sum = (a, b) => a + b;
const multiply = (a, b) => {
    return a * b;
};
\`\`\`

## Массивы

### Основные методы:
- **push()** - добавить элемент
- **pop()** - удалить последний элемент
- **map()** - преобразовать массив
- **filter()** - отфильтровать массив
- **reduce()** - свернуть массив

### Пример:
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const even = numbers.filter(n => n % 2 === 0);
\`\`\`

## Объекты

\`\`\`javascript
const person = {
    name: "Анна",
    age: 25,
    greet() {
        console.log("Привет!");
    }
};
\`\`\`

---
*Этот конспект доступен только для чтения*
            `
        },
        {
            id: 'system-2',
            name: 'CSS Шпаргалка',
            isSystem: true,
            isReadOnly: true,
            content: `
# CSS Шпаргалка

## Flexbox

### Основные свойства контейнера:
- **display: flex** - включить flexbox
- **flex-direction** - направление (row, column)
- **justify-content** - выравнивание по главной оси
- **align-items** - выравнивание по поперечной оси
- **gap** - расстояние между элементами

### Пример:
\`\`\`css
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}
\`\`\`

## Grid

### Основные свойства:
\`\`\`css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 10px;
}
\`\`\`

## Анимации

### Transition:
\`\`\`css
.button {
    transition: all 0.3s ease;
}
.button:hover {
    transform: scale(1.1);
    background-color: #4CAF50;
}
\`\`\`

## Медиа-запросы

\`\`\`css
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}
\`\`\`

---
*Этот конспект доступен только для чтения*
            `
        },
        {
            id: 'system-3',
            name: 'Linux Команды',
            isSystem: true,
            isReadOnly: true,
            content: `
# Основные команды Linux

## Работа с файлами

### Навигация:
- **pwd** - показать текущую директорию
- **ls** - список файлов
- **cd** - сменить директорию
- **mkdir** - создать директорию
- **rm** - удалить файл
- **rm -rf** - удалить директорию рекурсивно

### Копирование и перемещение:
- **cp** - копировать
- **mv** - переместить/переименовать
- **touch** - создать пустой файл

## Права доступа

### Изменение прав:
\`\`\`bash
chmod 755 script.sh
chmod +x script.sh
chown user:group file.txt
\`\`\`

## Системная информация

### Просмотр информации:
- **top** - процессы в реальном времени
- **df -h** - свободное место на дисках
- **free -h** - использование памяти
- **uname -a** - информация о системе

## Поиск

### Поиск файлов:
\`\`\`bash
find / -name "*.log"
grep -r "текст" /path/to/search
which command
\`\`\`

---
*Этот конспект доступен только для чтения*
            `
        },
        {
            id: 'system-4',
            name: 'Git Команды',
            isSystem: true,
            isReadOnly: true,
            content: `
# Основные команды Git

## Настройка

### Первоначальная настройка:
\`\`\`bash
git config --global user.name "Ваше Имя"
git config --global user.email "your@email.com"
\`\`\`

## Основные команды

### Создание репозитория:
- **git init** - инициализировать новый репозиторий
- **git clone <url>** - клонировать существующий

### Работа с изменениями:
- **git status** - проверить статус
- **git add .** - добавить все изменения
- **git commit -m "message"** - закоммитить
- **git push** - отправить на сервер
- **git pull** - получить с сервера

## Ветвление

### Работа с ветками:
\`\`\`bash
git branch feature-new
git checkout feature-new
git merge feature-new
git branch -d feature-new
\`\`\`

## Отмена изменений

### Откат:
\`\`\`bash
git reset --hard HEAD~1
git revert <commit-hash>
git checkout -- file.txt
\`\`\`

## Полезные команды

### История и логи:
- **git log --oneline** - краткая история
- **git diff** - посмотреть изменения
- **git stash** - временно скрыть изменения
- **git stash pop** - вернуть скрытые изменения

---
*Этот конспект доступен только для чтения*
            `
        }
    ],

    // Метод для получения всех системных тем
    getAllThemes() {
        return this.themes;
    },

    // Метод для получения конкретной темы по ID
    getThemeById(id) {
        return this.themes.find(theme => theme.id === id);
    },

    // Метод для проверки, является ли тема системной
    isSystemTheme(themeId) {
        return this.themes.some(theme => theme.id === themeId);
    }
};

// Экспорт для использования в основном приложении
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SystemNotes;
}
