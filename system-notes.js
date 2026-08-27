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

#include <iostream>   // для ввода/вывода
#include <string>     // для работы со строками
#include <vector>     // для динамического массива
#include <array>      // для статического массива
#include <fstream>    // для работы с файлами
#include <stdexcept>  // для исключений
#include <cmath>      // для математических функций

// ========== 1. ПРОСТРАНСТВО ИМЕН ==========
namespace Math {
    const double PI = 3.14159;
    double square(double x) { return x * x; }
}

// ========== 2. СТРУКТУРА ==========
struct Point {
    int x;
    int y;
    
    // Метод в структуре
    void print() const {
        std::cout << "Point(" << x << ", " << y << ")" << std::endl;
    }
};

// ========== 3. КЛАСС ==========
class Rectangle {
private:
    double width;
    double height;
    
public:
    // Конструктор
    Rectangle(double w, double h) : width(w), height(h) {
        std::cout << "Создан прямоугольник " << width << "x" << height << std::endl;
    }
    
    // Деструктор
    ~Rectangle() {
        std::cout << "Уничтожен прямоугольник " << width << "x" << height << std::endl;
    }
    
    // Методы
    double area() const {
        return width * height;
    }
    
    double perimeter() const {
        return 2 * (width + height);
    }
    
    // Геттеры
    double getWidth() const { return width; }
    double getHeight() const { return height; }
};

// ========== 4. ФУНКЦИИ ==========
// Простая функция
int add(int a, int b) {
    return a + b;
}

// Перегруженная функция
double add(double a, double b) {
    return a + b;
}

// Функция с параметром по умолчанию
int multiply(int a, int b = 2) {
    return a * b;
}

// Функция с ссылками
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// Функция с указателями
void incrementByPointer(int* ptr) {
    if (ptr != nullptr) {
        (*ptr)++;
    }
}

// Функция, бросающая исключение
double divide(double a, double b) {
    if (b == 0) {
        throw std::runtime_error("Деление на ноль!");
    }
    return a / b;
}

// ========== ГЛАВНАЯ ФУНКЦИЯ ==========
int main() {
    std::cout << "========== ДЕМОНСТРАЦИЯ ОСНОВ C++ ==========" << std::endl;
    
    // ========== 5. ПЕРЕМЕННЫЕ И ТИПЫ ДАННЫХ ==========
    std::cout << "\n--- Переменные и типы данных ---" << std::endl;
    
    int age = 25;
    double pi = 3.14159;
    float temperature = 36.6f;
    char letter = 'A';
    bool isRaining = false;
    std::string name = "Иван";
    
    // Современная инициализация
    int count {10};
    double height {1.75};
    
    std::cout << "age = " << age << std::endl;
    std::cout << "pi = " << pi << std::endl;
    std::cout << "temperature = " << temperature << std::endl;
    std::cout << "letter = " << letter << std::endl;
    std::cout << "isRaining = " << std::boolalpha << isRaining << std::endl;
    std::cout << "name = " << name << std::endl;
    std::cout << "count = " << count << std::endl;
    std::cout << "height = " << height << std::endl;
    
    // Константы
    const int MAX_SIZE = 100;
    std::cout << "MAX_SIZE = " << MAX_SIZE << std::endl;
    
    // ========== 6. ОПЕРАТОРЫ ==========
    std::cout << "\n--- Операторы ---" << std::endl;
    
    int a = 10, b = 3;
    std::cout << "a = " << a << ", b = " << b << std::endl;
    std::cout << "a + b = " << a + b << std::endl;
    std::cout << "a - b = " << a - b << std::endl;
    std::cout << "a * b = " << a * b << std::endl;
    std::cout << "a / b = " << a / b << " (целочисленное деление)" << std::endl;
    std::cout << "a % b = " << a % b << " (остаток)" << std::endl;
    std::cout << "a / b (дробное) = " << static_cast<double>(a) / b << std::endl;
    
    // Составные операторы
    int x = 5;
    x += 3;  // x = 8
    x *= 2;  // x = 16
    std::cout << "x после +=3, *=2: " << x << std::endl;
    
    // Инкремент/декремент
    int i = 0;
    std::cout << "i++ = " << i++ << " (i теперь " << i << ")" << std::endl;
    std::cout << "++i = " << ++i << std::endl;
    
    // ========== 7. УСЛОВНЫЕ КОНСТРУКЦИИ ==========
    std::cout << "\n--- Условные конструкции ---" << std::endl;
    
    int number = 15;
    
    // if-else
    if (number > 10) {
        std::cout << number << " больше 10" << std::endl;
    } else if (number == 10) {
        std::cout << number << " равно 10" << std::endl;
    } else {
        std::cout << number << " меньше 10" << std::endl;
    }
    
    // Тернарный оператор
    std::string result = (number % 2 == 0) ? "четное" : "нечетное";
    std::cout << number << " - " << result << " число" << std::endl;
    
    // switch
    char grade = 'B';
    switch (grade) {
        case 'A':
            std::cout << "Оценка: Отлично!" << std::endl;
            break;
        case 'B':
            std::cout << "Оценка: Хорошо" << std::endl;
            break;
        case 'C':
            std::cout << "Оценка: Удовлетворительно" << std::endl;
            break;
        default:
            std::cout << "Оценка: Неизвестно" << std::endl;
    }
    
    // ========== 8. ЦИКЛЫ ==========
    std::cout << "\n--- Циклы ---" << std::endl;
    
    // for
    std::cout << "Цикл for: ";
    for (int i = 0; i < 5; ++i) {
        std::cout << i << " ";
    }
    std::cout << std::endl;
    
    // while
    std::cout << "Цикл while: ";
    int counter = 0;
    while (counter < 5) {
        std::cout << counter << " ";
        ++counter;
    }
    std::cout << std::endl;
    
    // do-while
    std::cout << "Цикл do-while: ";
    int counter2 = 0;
    do {
        std::cout << counter2 << " ";
        ++counter2;
    } while (counter2 < 5);
    std::cout << std::endl;
    
    // break и continue
    std::cout << "Цикл с break: ";
    for (int i = 0; i < 10; ++i) {
        if (i == 5) break;
        std::cout << i << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Цикл с continue: ";
    for (int i = 0; i < 10; ++i) {
        if (i % 2 == 0) continue;
        std::cout << i << " ";
    }
    std::cout << std::endl;
    
    // ========== 9. МАССИВЫ ==========
    std::cout << "\n--- Массивы ---" << std::endl;
    
    // C-style массив
    int arr[5] = {1, 2, 3, 4, 5};
    std::cout << "C-style массив: ";
    for (int i = 0; i < 5; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    
    // std::array
    std::array<int, 5> stdArr = {10, 20, 30, 40, 50};
    std::cout << "std::array: ";
    for (size_t i = 0; i < stdArr.size(); ++i) {
        std::cout << stdArr[i] << " ";
    }
    std::cout << std::endl;
    std::cout << "Размер std::array: " << stdArr.size() << std::endl;
    
    // std::vector
    std::vector<int> vec;
    vec.push_back(100);
    vec.push_back(200);
    vec.push_back(300);
    vec.push_back(400);
    
    std::cout << "std::vector: ";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i] << " ";
    }
    std::cout << std::endl;
    std::cout << "Размер vector: " << vec.size() << std::endl;
    
    // Range-based for (C++11)
    std::cout << "Range-based for: ";
    for (int val : vec) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    // ========== 10. СТРОКИ ==========
    std::cout << "\n--- Строки ---" << std::endl;
    
    std::string str1 = "Hello";
    std::string str2 = "World";
    std::string str3 = str1 + ", " + str2 + "!";
    
    std::cout << "Строка: " << str3 << std::endl;
    std::cout << "Длина: " << str3.length() << std::endl;
    std::cout << "Первый символ: " << str3[0] << std::endl;
    std::cout << "Последний символ: " << str3[str3.length() - 1] << std::endl;
    std::cout << "Подстрока (0-5): " << str3.substr(0, 5) << std::endl;
    
    // Поиск в строке
    size_t pos = str3.find("World");
    if (pos != std::string::npos) {
        std::cout << "'World' найдено на позиции " << pos << std::endl;
    }
    
    // ========== 11. УКАЗАТЕЛИ И ССЫЛКИ ==========
    std::cout << "\n--- Указатели и ссылки ---" << std::endl;
    
    int value = 42;
    int* ptr = &value;
    
    std::cout << "Значение: " << value << std::endl;
    std::cout << "Адрес: " << ptr << std::endl;
    std::cout << "Значение через указатель: " << *ptr << std::endl;
    
    *ptr = 100;  // изменение через указатель
    std::cout << "Новое значение: " << value << std::endl;
    
    // Ссылки
    int original = 10;
    int& ref = original;
    ref = 20;
    std::cout << "После изменения ссылки: " << original << std::endl;
    
    // Демонстрация swap
    int num1 = 5, num2 = 10;
    std::cout << "До swap: " << num1 << ", " << num2 << std::endl;
    swap(num1, num2);
    std::cout << "После swap: " << num1 << ", " << num2 << std::endl;
    
    // Указатель в функцию
    int num = 10;
    incrementByPointer(&num);
    std::cout << "После incrementByPointer: " << num << std::endl;
    
    // ========== 12. ФУНКЦИИ ==========
    std::cout << "\n--- Функции ---" << std::endl;
    
    std::cout << "add(3, 4) = " << add(3, 4) << std::endl;
    std::cout << "add(3.5, 4.5) = " << add(3.5, 4.5) << std::endl;
    std::cout << "multiply(5) = " << multiply(5) << " (использует b=2 по умолчанию)" << std::endl;
    std::cout << "multiply(5, 3) = " << multiply(5, 3) << std::endl;
    
    // Использование namespace
    std::cout << "Math::PI = " << Math::PI << std::endl;
    std::cout << "Math::square(5) = " << Math::square(5) << std::endl;
    
    // ========== 13. СТРУКТУРЫ И КЛАССЫ ==========
    std::cout << "\n--- Структуры и классы ---" << std::endl;
    
    Point p1;
    p1.x = 10;
    p1.y = 20;
    p1.print();
    
    Point p2 {30, 40};  // агрегатная инициализация
    p2.print();
    
    Rectangle rect(5.0, 3.0);
    std::cout << "Площадь: " << rect.area() << std::endl;
    std::cout << "Периметр: " << rect.perimeter() << std::endl;
    std::cout << "Ширина: " << rect.getWidth() << std::endl;
    
    // ========== 14. ДИНАМИЧЕСКАЯ ПАМЯТЬ ==========
    std::cout << "\n--- Динамическая память ---" << std::endl;
    
    // Выделение одного объекта
    int* dynamicInt = new int(42);
    std::cout << "Динамический int: " << *dynamicInt << std::endl;
    delete dynamicInt;
    
    // Выделение массива
    int* dynamicArray = new int[3];
    dynamicArray[0] = 1;
    dynamicArray[1] = 2;
    dynamicArray[2] = 3;
    
    std::cout << "Динамический массив: ";
    for (int i = 0; i < 3; ++i) {
        std::cout << dynamicArray[i] << " ";
    }
    std::cout << std::endl;
    delete[] dynamicArray;
    
    // ========== 15. ОБРАБОТКА ИСКЛЮЧЕНИЙ ==========
    std::cout << "\n--- Исключения ---" << std::endl;
    
    try {
        double result = divide(10, 0);
        std::cout << "Результат: " << result << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Ошибка: " << e.what() << std::endl;
    }
    
    try {
        double result = divide(10, 4);
        std::cout << "10 / 4 = " << result << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Ошибка: " << e.what() << std::endl;
    }
    
    // ========== 16. РАБОТА С ФАЙЛАМИ ==========
    std::cout << "\n--- Работа с файлами ---" << std::endl;
    
    // Запись в файл
    std::ofstream outFile("test.txt");
    if (outFile.is_open()) {
        outFile << "Первая строка файла" << std::endl;
        outFile << "Вторая строка файла" << std::endl;
        outFile << "Число: " << 42 << std::endl;
        outFile.close();
        std::cout << "Файл test.txt успешно записан" << std::endl;
    }
    
    // Чтение из файла
    std::ifstream inFile("test.txt");
    std::string line;
    if (inFile.is_open()) {
        std::cout << "Содержимое файла test.txt:" << std::endl;
        while (std::getline(inFile, line)) {
            std::cout << "  " << line << std::endl;
        }
        inFile.close();
    }
    
    std::cout << "\n========== ПРОГРАММА ЗАВЕРШЕНА ==========" << std::endl;
    
    return 0;
}
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
