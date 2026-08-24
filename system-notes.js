// Системные конспекты - только для чтения
const SystemNotes = {
    themes: [
        {
            id: 'system-1',
            name: 'JavaScript',
            content: `
# JavaScript

## Переменные
- **let** - изменяемая переменная
- **const** - константа
- **var** - устаревший способ

## Функции
\`\`\`javascript
const sum = (a, b) => a + b;
function multiply(a, b) {
    return a * b;
}
\`\`\`

## Массивы
- **push()** - добавить элемент
- **pop()** - удалить последний
- **map()** - преобразовать
- **filter()** - отфильтровать
- **reduce()** - свернуть

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

## Промисы
\`\`\`javascript
fetch('url')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
\`\`\`

## Async/Await
\`\`\`javascript
async function getData() {
    try {
        const response = await fetch('url');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
\`\`\`
            `
        },
        {
            id: 'system-2',
            name: 'CSS',
            content: `
# CSS

## Flexbox
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
\`\`\`css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
\`\`\`

## Анимации
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

## Псевдоклассы
- **:hover** - при наведении
- **:active** - при нажатии
- **:focus** - при фокусе
- **:first-child** - первый элемент
- **:last-child** - последний элемент
            `
        },
        {
            id: 'system-3',
            name: 'Python',
            content: `
# Python

## Переменные и типы
\`\`\`python
name = "Иван"
age = 25
height = 1.75
is_student = True
\`\`\`

## Функции
\`\`\`python
def greet(name):
    return f"Привет, {name}!"

def sum_numbers(*args):
    return sum(args)
\`\`\`

## Списки
\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers.append(6)
numbers.remove(3)
squared = [x**2 for x in numbers]
\`\`\`

## Словари
\`\`\`python
person = {
    "name": "Анна",
    "age": 25,
    "city": "Москва"
}
print(person["name"])
\`\`\`

## Классы
\`\`\`python
class Dog:
    def __init__(self, name):
        self.name = name
    
    def bark(self):
        return f"{self.name} говорит гав!"
\`\`\`

## Работа с файлами
\`\`\`python
with open("file.txt", "r") as f:
    content = f.read()
\`\`\`
            `
        },
        {
            id: 'system-4',
            name: 'HTML',
            content: `
# HTML

## Базовая структура
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Заголовок</title>
</head>
<body>
    <h1>Привет, мир!</h1>
</body>
</html>
\`\`\`

## Основные теги
- **\<div\>** - блок
- **\<span\>** - строчный элемент
- **\<p\>** - параграф
- **\<a href="url"\>** - ссылка
- **\<img src="url"\>** - изображение

## Формы
\`\`\`html
<form action="/submit" method="POST">
    <input type="text" name="username">
    <input type="password" name="password">
    <button type="submit">Отправить</button>
</form>
\`\`\`

## Семантические теги
- **\<header\>** - шапка
- **\<nav\>** - навигация
- **\<main\>** - основное содержимое
- **\<article\>** - статья
- **\<footer\>** - подвал
            `
        },
        {
            id: 'system-5',
            name: 'C++',
            content: `
# C++

## Базовая программа
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Привет, мир!" << endl;
    return 0;
}
\`\`\`

## Переменные
\`\`\`cpp
int age = 25;
float height = 1.75;
char grade = 'A';
string name = "Иван";
bool isStudent = true;
\`\`\`

## Функции
\`\`\`cpp
int sum(int a, int b) {
    return a + b;
}

void printMessage(string message) {
    cout << message << endl;
}
\`\`\`

## Классы
\`\`\`cpp
class Dog {
public:
    string name;
    
    Dog(string n) {
        name = n;
    }
    
    void bark() {
        cout << name << " говорит гав!" << endl;
    }
};
\`\`\`

## Указатели
\`\`\`cpp
int number = 10;
int* ptr = &number;
cout << *ptr << endl; // 10
\`\`\`
            `
        },
        {
            id: 'system-6',
            name: 'Web-разработка',
            content: `
# Web-разработка

## Frontend
- **HTML** - структура
- **CSS** - стили
- **JavaScript** - интерактивность
- **React/Vue/Angular** - фреймворки

## Backend
- **Node.js** - JavaScript на сервере
- **Python (Django/Flask)** - Python фреймворки
- **PHP** - классический backend
- **Ruby on Rails** - Ruby фреймворк

## Базы данных
- **MySQL** - реляционная
- **PostgreSQL** - продвинутая реляционная
- **MongoDB** - NoSQL
- **Redis** - кэширование

## DevOps
- **Git** - контроль версий
- **Docker** - контейнеризация
- **Nginx** - веб-сервер
- **CI/CD** - непрерывная интеграция

## API
- **REST** - архитектурный стиль
- **GraphQL** - язык запросов
- **WebSocket** - двусторонняя связь
            `
        }
    ],

    getAllThemes() {
        return this.themes;
    },

    getThemeById(id) {
        return this.themes.find(theme => theme.id === id);
    },

    isSystemTheme(themeId) {
        return this.themes.some(theme => theme.id === themeId);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SystemNotes;
}
