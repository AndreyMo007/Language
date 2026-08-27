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

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ПОЛНЫЙ КУРС ОСНОВ PYTHON
=========================
Всё от установки до продвинутых тем
С подробными комментариями и примерами
"""

# ============================================
# 1. ПЕРЕМЕННЫЕ И БАЗОВЫЕ ТИПЫ ДАННЫХ
# ============================================

print("=" * 60)
print("1. ПЕРЕМЕННЫЕ И ТИПЫ ДАННЫХ")
print("=" * 60)

# --- ЦЕЛЫЕ ЧИСЛА (int) ---
# Неограниченная точность в Python 3
a = 10
b = -5
c = 0
huge_number = 123456789012345678901234567890

print(f"Целые числа: {a}, {b}, {c}")
print(f"Огромное число: {huge_number}")
print(f"Тип: {type(a)}")

# Системы счисления
binary = 0b1010    # Двоичная (10 в десятичной)
octal = 0o12       # Восьмеричная (10)
hexadecimal = 0xA  # Шестнадцатеричная (10)

print(f"Двоичная 0b1010 = {binary}")
print(f"Восьмеричная 0o12 = {octal}")
print(f"Шестнадцатеричная 0xA = {hexadecimal}")

# --- ДРОБНЫЕ ЧИСЛА (float) ---
pi = 3.14159
e = 2.71828
scientific = 1.5e3  # 1500.0

print(f"Дробные: {pi}, {e}")
print(f"Научная нотация 1.5e3 = {scientific}")

# --- КОМПЛЕКСНЫЕ ЧИСЛА (complex) ---
complex_num = 3 + 4j
print(f"Комплексное число: {complex_num}")
print(f"Действительная часть: {complex_num.real}")
print(f"Мнимая часть: {complex_num.imag}")

# --- СТРОКИ (str) ---
# Разные способы создания
s1 = 'Одинарные кавычки'
s2 = "Двойные кавычки"
s3 = '''Тройные кавычки
для многострочного
текста'''
s4 = """Ещё один способ
многострочной строки"""

print(f"Строки: {s1}, {s2}")
print(f"Многострочная:\n{s3}")

# Экранирование
escaped = "Строка с \"кавычками\" и \nпереводом строки"
raw = r"Сырая строка \n без экранирования"
print(f"Экранирование: {escaped}")
print(f"Сырая: {raw}")

# --- ЛОГИЧЕСКИЙ ТИП (bool) ---
true_val = True
false_val = False
print(f"Логические: {true_val}, {false_val}")

# Всё что не False/None/0/""/[]/{} — True
print(f"bool(1) = {bool(1)}")
print(f"bool(0) = {bool(0)}")
print(f"bool('') = {bool('')}")
print(f"bool('text') = {bool('text')}")
print(f"bool([]) = {bool([])}")
print(f"bool([1,2]) = {bool([1,2])}")

# --- None ---
none_val = None
print(f"None: {none_val}")
print(f"None это None: {none_val is None}")

# ============================================
# 2. ОПЕРАЦИИ С ЧИСЛАМИ
# ============================================

print("\n" + "=" * 60)
print("2. ОПЕРАЦИИ С ЧИСЛАМИ")
print("=" * 60)

x, y = 15, 4

print(f"x = {x}, y = {y}")
print(f"Сложение: {x} + {y} = {x + y}")
print(f"Вычитание: {x} - {y} = {x - y}")
print(f"Умножение: {x} * {y} = {x * y}")
print(f"Деление: {x} / {y} = {x / y}")  # Всегда float
print(f"Целочисленное деление: {x} // {y} = {x // y}")  # Отбрасывает дробную часть
print(f"Остаток от деления: {x} % {y} = {x % y}")
print(f"Возведение в степень: {x} ** {y} = {x ** y}")

# Сокращённые операторы
counter = 10
counter += 5   # counter = counter + 5
counter -= 3   # counter = counter - 3
counter *= 2   # counter = counter * 2
counter /= 4   # counter = counter / 4
counter //= 2  # counter = counter // 2
counter **= 2  # counter = counter ** 2

print(f"После сокращённых операций: {counter}")

# Встроенные математические функции
print(f"abs(-5) = {abs(-5)}")           # Модуль
print(f"round(3.7) = {round(3.7)}")     # Округление
print(f"round(3.14159, 2) = {round(3.14159, 2)}")  # До 2 знаков
print(f"pow(2, 10) = {pow(2, 10)}")     # Степень
print(f"min(3, 7, 1, 9) = {min(3, 7, 1, 9)}")  # Минимум
print(f"max(3, 7, 1, 9) = {max(3, 7, 1, 9)}")  # Максимум
print(f"sum([1,2,3,4,5]) = {sum([1,2,3,4,5])}")  # Сумма

# Модуль math
import math
print(f"math.pi = {math.pi}")
print(f"math.e = {math.e}")
print(f"math.sqrt(16) = {math.sqrt(16)}")
print(f"math.floor(3.7) = {math.floor(3.7)}")  # Вниз
print(f"math.ceil(3.2) = {math.ceil(3.2)}")    # Вверх
print(f"math.factorial(5) = {math.factorial(5)}")  # 5! = 120
print(f"math.gcd(12, 18) = {math.gcd(12, 18)}")  # НОД

# ============================================
# 3. РАБОТА СО СТРОКАМИ
# ============================================

print("\n" + "=" * 60)
print("3. РАБОТА СО СТРОКАМИ")
print("=" * 60)

text = "Hello, World!"

# Основные операции
print(f"Исходная строка: '{text}'")
print(f"Длина: {len(text)}")
print(f"Верхний регистр: {text.upper()}")
print(f"Нижний регистр: {text.lower()}")
print(f"Первая заглавная: {text.capitalize()}")
print(f"Каждое слово с заглавной: {text.title()}")
print(f"Перевёрнутая: {text.swapcase()}")

# Поиск и замена
print(f"Найти 'World': {text.find('World')}")  # Индекс или -1
print(f"Найти 'Python': {text.find('Python')}")
print(f"Индекс 'World': {text.index('World')}")  # Ошибка если нет
print(f"Количество 'l': {text.count('l')}")
print(f"Замена: {text.replace('World', 'Python')}")

# Проверки
print(f"Начинается с 'Hello': {text.startswith('Hello')}")
print(f"Заканчивается на '!': {text.endswith('!')}")
print(f"Все буквы: {text.isalpha()}")
print(f"Все цифры: {'123'.isdigit()}")
print(f"Буквы и цифры: {'abc123'.isalnum()}")
print(f"Пробелы: {'   '.isspace()}")
print(f"Верхний регистр: {'ABC'.isupper()}")
print(f"Нижний регистр: {'abc'.islower()}")

# Разбиение и соединение
sentence = "яблоко,банан,апельсин"
words = sentence.split(',')
print(f"Split: {words}")

joined = ' | '.join(words)
print(f"Join: {joined}")

# Удаление пробелов
padded = "   текст с пробелами   "
print(f"strip: '{padded.strip()}'")
print(f"lstrip: '{padded.lstrip()}'")
print(f"rstrip: '{padded.rstrip()}'")

# Форматирование строк
name = "Иван"
age = 25
height = 1.75

# Старый способ (%)
old_format = "Имя: %s, Возраст: %d, Рост: %.2f" % (name, age, height)

# format()
format_method = "Имя: {}, Возраст: {}, Рост: {:.2f}".format(name, age, height)

# f-строки (самый современный)
f_string = f"Имя: {name}, Возраст: {age}, Рост: {height:.2f}"

print(f"Старый формат: {old_format}")
print(f"Метод format: {format_method}")
print(f"F-строка: {f_string}")

# Выравнивание
print(f"|{'слева':<10}|{'центр':^10}|{'справа':>10}|")
print(f"С нулями: {42:05d}")

# ============================================
# 4. СПИСКИ (LIST)
# ============================================

print("\n" + "=" * 60)
print("4. СПИСКИ")
print("=" * 60)

# Создание списков
empty_list = []
numbers = [1, 2, 3, 4, 5]
mixed = [1, "два", 3.0, True, [1, 2]]
from_range = list(range(10))
from_string = list("Python")

print(f"Пустой: {empty_list}")
print(f"Числа: {numbers}")
print(f"Смешанный: {mixed}")
print(f"Из range: {from_range}")
print(f"Из строки: {from_string}")

# Доступ к элементам
fruits = ["яблоко", "банан", "апельсин", "груша", "киви"]
print(f"Первый: {fruits[0]}")
print(f"Последний: {fruits[-1]}")
print(f"Второй с конца: {fruits[-2]}")

# Срезы (slicing)
print(f"Первые 3: {fruits[:3]}")
print(f"Со 2 по 4: {fruits[1:4]}")
print(f"Все с шагом 2: {fruits[::2]}")
print(f"В обратном порядке: {fruits[::-1]}")

# Изменение элементов
fruits[0] = "мандарин"
print(f"После изменения: {fruits}")

# Добавление элементов
fruits.append("виноград")  # В конец
fruits.insert(1, "лимон")  # По индексу
fruits.extend(["персик", "слива"])  # Несколько сразу
print(f"После добавления: {fruits}")

# Удаление элементов
fruits.remove("лимон")  # По значению
deleted = fruits.pop()  # С конца
deleted_at_index = fruits.pop(0)  # По индексу
del fruits[1]  # Оператор del
print(f"После удаления: {fruits}")

# Поиск
if "киви" in fruits:
    print(f"Индекс киви: {fruits.index('киви')}")
print(f"Количество яблок: {fruits.count('яблоко')}")

# Сортировка
unsorted = [3, 1, 4, 1, 5, 9, 2, 6]
unsorted.sort()
print(f"Сортировка: {unsorted}")
unsorted.sort(reverse=True)
print(f"Обратная сортировка: {unsorted}")

# Сортировка строк по длине
words = ["кот", "собака", "жираф", "лев"]
words.sort(key=len)
print(f"Сортировка по длине: {words}")

# Копирование
original = [1, 2, 3]
shallow_copy = original.copy()
deep_copy = original[:]
reference = original  # Это НЕ копия!

original[0] = 99
print(f"Оригинал: {original}")
print(f"Копия: {shallow_copy}")
print(f"Ссылка: {reference}")  # Изменится!

# List comprehension
squares = [x**2 for x in range(10)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]
matrix = [[j for j in range(3)] for i in range(3)]

print(f"Квадраты: {squares}")
print(f"Чётные квадраты: {even_squares}")
print(f"Матрица: {matrix}")

# ============================================
# 5. КОРТЕЖИ (TUPLE)
# ============================================

print("\n" + "=" * 60)
print("5. КОРТЕЖИ")
print("=" * 60)

# Создание кортежей
empty_tuple = ()
single_element = (1,)  # Запятая обязательна!
not_tuple = (1)  # Это просто число
my_tuple = (1, 2, 3, 4, 5)
from_list = tuple([1, 2, 3])

print(f"Пустой: {empty_tuple}")
print(f"Один элемент: {single_element}")
print(f"Не кортеж: {not_tuple} (тип: {type(not_tuple)})")
print(f"Кортеж: {my_tuple}")
print(f"Из списка: {from_list}")

# Доступ к элементам (как в списках)
print(f"Первый: {my_tuple[0]}")
print(f"Последний: {my_tuple[-1]}")
print(f"Срез: {my_tuple[1:3]}")

# Кортежи неизменяемы
try:
    my_tuple[0] = 10
except TypeError as e:
    print(f"Ошибка: {e}")

# Распаковка (unpacking)
a, b, c, d, e = my_tuple
print(f"Распаковка: a={a}, b={b}, c={c}, d={d}, e={e}")

# Распаковка с *
first, *rest, last = (1, 2, 3, 4, 5)
print(f"Первый: {first}, Остальные: {rest}, Последний: {last}")

# Обмен значений
x, y = 10, 20
x, y = y, x
print(f"Обмен: x={x}, y={y}")

# ============================================
# 6. МНОЖЕСТВА (SET)
# ============================================

print("\n" + "=" * 60)
print("6. МНОЖЕСТВА")
print("=" * 60)

# Создание множеств
empty_set = set()  # Не {} — это словарь!
my_set = {1, 2, 3, 4, 5}
from_list = set([1, 2, 2, 3, 3, 3])  # Дубликаты удалятся

print(f"Пустое: {empty_set}")
print(f"Множество: {my_set}")
print(f"Из списка с дубликатами: {from_list}")

# Операции
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

print(f"Объединение: {set_a | set_b}")
print(f"Пересечение: {set_a & set_b}")
print(f"Разность: {set_a - set_b}")
print(f"Симметрическая разность: {set_a ^ set_b}")

# Методы
set_a.add(6)  # Добавить
set_a.remove(1)  # Удалить (ошибка если нет)
set_a.discard(10)  # Удалить (без ошибки)
popped = set_a.pop()  # Удалить случайный

print(f"После операций: {set_a}")

# Проверки
print(f"2 в множестве: {2 in set_a}")
print(f"Подмножество: {set_a.issubset(set_b)}")
print(f"Надмножество: {set_a.issuperset(set_b)}")

# ============================================
# 7. СЛОВАРИ (DICT)
# ============================================

print("\n" + "=" * 60)
print("7. СЛОВАРИ")
print("=" * 60)

# Создание словарей
empty_dict = {}
person = {
    "name": "Иван",
    "age": 30,
    "city": "Москва"
}
from_pairs = dict([("a", 1), ("b", 2)])
from_kwargs = dict(name="Пётр", age=25)

print(f"Пустой: {empty_dict}")
print(f"Словарь: {person}")
print(f"Из пар: {from_pairs}")
print(f"Из аргументов: {from_kwargs}")

# Доступ к элементам
print(f"Имя: {person['name']}")
print(f"Возраст: {person.get('age')}")
print(f"Несуществующий: {person.get('country', 'Нет данных')}")

# Добавление и изменение
person["email"] = "ivan@mail.ru"
person["age"] = 31
person.update({"phone": "+7-999-123-45-67", "age": 32})

print(f"После изменения: {person}")

# Удаление
del person["phone"]
email = person.pop("email")
last_item = person.popitem()  # Удаляет последний добавленный

print(f"После удаления: {person}")

# Методы
print(f"Ключи: {list(person.keys())}")
print(f"Значения: {list(person.values())}")
print(f"Пары: {list(person.items())}")

# Проверки
print(f"'name' в словаре: {'name' in person}")
print(f"'email' в словаре: {'email' in person}")

# Объединение словарей (Python 3.5+)
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = {**dict1, **dict2}
print(f"Объединение: {merged}")

# Dict comprehension
squares_dict = {x: x**2 for x in range(5)}
filtered_dict = {k: v for k, v in squares_dict.items() if v > 5}

print(f"Квадраты: {squares_dict}")
print(f"Отфильтрованные: {filtered_dict}")

# ============================================
# 8. УСЛОВНЫЕ ОПЕРАТОРЫ
# ============================================

print("\n" + "=" * 60)
print("8. УСЛОВНЫЕ ОПЕРАТОРЫ")
print("=" * 60)

# Базовые условия
age = 20

if age < 18:
    print("Несовершеннолетний")
elif age < 65:
    print("Взрослый")
else:
    print("Пенсионер")

# Вложенные условия
has_ticket = True
has_passport = True

if has_ticket:
    if has_passport:
        print("Можно лететь")
    else:
        print("Нужен паспорт")
else:
    print("Нужен билет")

# Логические операторы
is_student = True
has_discount_card = False

if is_student or has_discount_card:
    print("Есть скидка")

if is_student and not has_discount_card:
    print("Студент без карты")

# Тернарный оператор
result = "Совершеннолетний" if age >= 18 else "Несовершеннолетний"
print(result)

# Цепочки сравнения
x = 15
if 10 < x < 20:
    print("x между 10 и 20")

if x in [10, 15, 20]:
    print("x в списке")

# Truthy и Falsy значения
empty_string = ""
non_empty = "текст"

if empty_string:
    print("Не выведется")

if non_empty:
    print("Выведется, строка непустая")

# ============================================
# 9. ЦИКЛЫ
# ============================================

print("\n" + "=" * 60)
print("9. ЦИКЛЫ")
print("=" * 60)

# Цикл for
print("For по списку:")
for fruit in ["яблоко", "банан", "апельсин"]:
    print(f"  {fruit}")

print("For по строке:")
for char in "Python":
    print(f"  {char}", end='')
print()

# Range
print("range(5):", list(range(5)))
print("range(2, 10):", list(range(2, 10)))
print("range(0, 20, 3):", list(range(0, 20, 3)))
print("range(10, 0, -1):", list(range(10, 0, -1)))

# Enumerate
print("Enumerate:")
for i, fruit in enumerate(["яблоко", "банан", "апельсин"], start=1):
    print(f"  {i}. {fruit}")

# Zip
print("Zip:")
names = ["Иван", "Мария", "Пётр"]
ages = [25, 30, 35]
cities = ["Москва", "Питер", "Казань"]

for name, age, city in zip(names, ages, cities):
    print(f"  {name}, {age} лет, {city}")

# While
print("While:")
counter = 0
while counter < 5:
    print(f"  Счётчик: {counter}")
    counter += 1

# While True с break
print("While True:")
attempts = 0
while True:
    attempts += 1
    if attempts >= 3:
        break
    print(f"  Попытка {attempts}")

# Continue
print("Continue (пропуск чётных):")
for i in range(10):
    if i % 2 == 0:
        continue
    print(f"  {i}", end='')
print()

# Else в циклах
print("Else в цикле:")
for i in range(3):
    print(f"  {i}")
else:
    print("  Цикл завершён без break")

# Вложенные циклы
print("Вложенные циклы:")
for i in range(3):
    for j in range(3):
        print(f"  ({i}, {j})", end='')
    print()

# ============================================
# 10. ФУНКЦИИ
# ============================================

print("\n" + "=" * 60)
print("10. ФУНКЦИИ")
print("=" * 60)

# Базовая функция
def greet():
    """Простая функция без параметров."""
    print("Привет!")

greet()

# С параметрами
def add(a, b):
    """Сложение двух чисел."""
    return a + b

result = add(5, 3)
print(f"5 + 3 = {result}")

# Параметры по умолчанию
def greet_person(name, greeting="Здравствуйте"):
    return f"{greeting}, {name}!"

print(greet_person("Иван"))
print(greet_person("Мария", "Привет"))

# Именованные аргументы
def create_user(name, age, city="Москва", email=None):
    return {
        "name": name,
        "age": age,
        "city": city,
        "email": email
    }

user1 = create_user("Пётр", 25, email="petr@mail.ru")
user2 = create_user(age=30, name="Анна", city="Питер")

print(f"Пользователь 1: {user1}")
print(f"Пользователь 2: {user2}")

# *args — произвольное количество аргументов
def sum_all(*args):
    """Суммирует все переданные аргументы."""
    total = 0
    for arg in args:
        total += arg
    return total

print(f"Сумма: {sum_all(1, 2, 3, 4, 5)}")
print(f"Сумма: {sum_all(10, 20)}")

# **kwargs — произвольные именованные аргументы
def print_info(**kwargs):
    """Выводит все именованные аргументы."""
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print("Информация:")
print_info(name="Иван", age=25, profession="программист")

# Комбинация всех типов
def mixed_function(a, b, *args, default="стандарт", **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"default={default}")
    print(f"kwargs={kwargs}")

mixed_function(1, 2, 3, 4, 5, default="изменён", x=10, y=20)

# Lambda-функции
square = lambda x: x ** 2
add_lambda = lambda a, b: a + b
get_length = lambda s: len(s)

print(f"Lambda квадрат: {square(7)}")
print(f"Lambda сумма: {add_lambda(3, 4)}")
print(f"Lambda длина: {get_length('Python')}")

# Функции высшего порядка
def apply_twice(func, value):
    """Применяет функцию дважды."""
    return func(func(value))

result = apply_twice(square, 3)  # (3²)² = 81
print(f"Двойное применение: {result}")

# Возврат функции из функции
def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

times_3 = make_multiplier(3)
times_5 = make_multiplier(5)

print(f"3 * 7 = {times_3(7)}")
print(f"5 * 7 = {times_5(7)}")

# Документация функций
def documented_function():
    """
    Это документация функции.
    
    Она доступна через __doc__ или help().
    """
    pass

print(f"Документация: {documented_function.__doc__}")

# ============================================
# 11. ОБЛАСТИ ВИДИМОСТИ
# ============================================

print("\n" + "=" * 60)
print("11. ОБЛАСТИ ВИДИМОСТИ")
print("=" * 60)

# Глобальная переменная
global_var = "Я глобальная"

def scope_test():
    # Локальная переменная
    local_var = "Я локальная"
    print(f"Внутри функции: {global_var}")  # Доступ к глобальной
    print(f"Внутри функции: {local_var}")

scope_test()
print(f"Снаружи: {global_var}")
# print(local_var)  # Ошибка! Локальная не видна снаружи

# Изменение глобальной переменной
counter = 0

def increment():
    global counter
    counter += 1

increment()
increment()
print(f"Счётчик: {counter}")

# nonlocal для вложенных функций
def outer():
    x = "внешняя"
    
    def inner():
        nonlocal x
        x = "изменённая"
    
    inner()
    print(f"После inner: {x}")

outer()

# ============================================
# 12. КЛАССЫ И ООП
# ============================================

print("\n" + "=" * 60)
print("12. КЛАССЫ И ООП")
print("=" * 60)

# Базовый класс
class Animal:
    """Базовый класс животного."""
    
    # Классовая переменная (общая для всех экземпляров)
    kingdom = "Animalia"
    
    # Конструктор
    def __init__(self, name, age):
        self.name = name  # Публичное поле
        self._age = age   # Защищённое поле (по соглашению)
    
    # Метод
    def speak(self):
        return "Какое-то животное издаёт звук"
    
    # Свойство
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Возраст не может быть отрицательным")
        self._age = value
    
    # Статический метод
    @staticmethod
    def is_animal():
        return True
    
    # Классовый метод
    @classmethod
    def get_kingdom(cls):
        return cls.kingdom
    
    # Магические методы
    def __str__(self):
        return f"{self.name}, {self._age} лет"
    
    def __repr__(self):
        return f"Animal('{self.name}', {self._age})"
    
    def __eq__(self, other):
        return self.name == other.name and self._age == other._age

# Наследование
class Dog(Animal):
    """Класс собаки."""
    
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # Вызов родительского конструктора
        self.breed = breed
    
    # Переопределение метода
    def speak(self):
        return "Гав-гав!"
    
    def fetch(self):
        return f"{self.name} приносит мяч"

class Cat(Animal):
    """Класс кошки."""
    
    def __init__(self, name, age, color):
        super().__init__(name, age)
        self.color = color
    
    def speak(self):
        return "Мяу!"
    
    def purr(self):
        return f"{self.name} мурлычет"

# Создание объектов
dog = Dog("Шарик", 3, "овчарка")
cat = Cat("Мурка", 2, "чёрная")

print(f"Собака: {dog}")
print(f"Собака говорит: {dog.speak()}")
print(f"Порода: {dog.breed}")
print(f"{dog.fetch()}")

print(f"Кошка: {cat}")
print(f"Кошка говорит: {cat.speak()}")
print(f"Цвет: {cat.color}")
print(f"{cat.purr()}")

# Полиморфизм
animals = [dog, cat]
for animal in animals:
    print(f"{animal.name}: {animal.speak()}")

# Проверка типов
print(f"dog это Dog: {isinstance(dog, Dog)}")
print(f"dog это Animal: {isinstance(dog, Animal)}")
print(f"Dog это подкласс Animal: {issubclass(Dog, Animal)}")

# Множественное наследование
class Flyable:
    def fly(self):
        return "Летит"

class Swimmable:
    def swim(self):
        return "Плывёт"

class Duck(Animal, Flyable, Swimmable):
    def speak(self):
        return "Кря-кря!"

duck = Duck("Утка", 1)
print(f"Утка: {duck.speak()}, {duck.fly()}, {duck.swim()}")

# ============================================
# 13. ОБРАБОТКА ИСКЛЮЧЕНИЙ
# ============================================

print("\n" + "=" * 60)
print("13. ОБРАБОТКА ИСКЛЮЧЕНИЙ")
print("=" * 60)

# Базовый try-except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Деление на ноль!")

# Несколько except
try:
    number = int("не число")
    result = 10 / 0
except ValueError:
    print("Ошибка преобразования")
except ZeroDivisionError:
    print("Деление на ноль")
except Exception as e:
    print(f"Другая ошибка: {e}")

# Полная конструкция
try:
    file = open("nonexistent.txt")
except FileNotFoundError:
    print("Файл не найден")
else:
    print("Файл открыт успешно")
    file.close()
finally:
    print("Этот блок выполняется всегда")

# Создание собственных исключений
class CustomError(Exception):
    """Пользовательское исключение."""
    
    def __init__(self, message, code=None):
        super().__init__(message)
        self.code = code

class ValidationError(Exception):
    """Ошибка валидации."""
    pass

# Использование собственных исключений
def validate_age(age):
    if age < 0:
        raise ValidationError("Возраст не может быть отрицательным")
    if age > 150:
        raise CustomError("Слишком большой возраст", code=150)
    return age

try:
    validate_age(-5)
except ValidationError as e:
    print(f"Ошибка валидации: {e}")

try:
    validate_age(200)
except CustomError as e:
    print(f"Ошибка: {e}, код: {e.code}")

# Перехват нескольких исключений
try:
    risky_operation()
except (TypeError, ValueError) as e:
    print(f"Ошибка типа или значения: {e}")

# ============================================
# 14. РАБОТА С ФАЙЛАМИ
# ============================================

print("\n" + "=" * 60)
print("14. РАБОТА С ФАЙЛАМИ")
print("=" * 60)

# Режимы открытия файлов:
# 'r' - чтение (по умолчанию)
# 'w' - запись (перезаписывает)
# 'a' - дозапись
# 'x' - создание (ошибка если существует)
# 'b' - бинарный режим
# 't' - текстовый режим (по умолчанию)
# '+' - чтение и запись

# Запись в файл
with open("test.txt", "w", encoding="utf-8") as f:
    f.write("Первая строка\n")
    f.write("Вторая строка\n")
    f.writelines(["Третья строка\n", "Четвёртая строка\n"])
print("Файл записан")

# Чтение файла
with open("test.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(f"Весь файл:\n{content}")

# Построчное чтение
with open("test.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(f"Строка: {line.strip()}")

# Чтение всех строк в список
with open("test.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"Все строки: {lines}")

# Дозапись
with open("test.txt", "a", encoding="utf-8") as f:
    f.write("Пятая строка\n")

# Работа с бинарными файлами
with open("binary.dat", "wb") as f:
    f.write(bytes([65, 66, 67, 68]))

with open("binary.dat", "rb") as f:
    data = f.read()
    print(f"Бинарные данные: {data}")

# Проверка существования файла
import os
if os.path.exists("test.txt"):
    print("Файл существует")
    print(f"Размер: {os.path.getsize('test.txt')} байт")

# ============================================
# 15. ГЕНЕРАТОРЫ И ИТЕРАТОРЫ
# ============================================

print("\n" + "=" * 60)
print("15. ГЕНЕРАТОРЫ И ИТЕРАТОРЫ")
print("=" * 60)

# Функция-генератор
def countdown(n):
    """Генератор обратного отсчёта."""
    while n > 0:
        yield n
        n -= 1

print("Обратный отсчёт:")
for num in countdown(5):
    print(f"  {num}", end='')
print()

# Генератор бесконечной последовательности
def infinite_counter():
    """Бесконечный счётчик."""
    i = 0
    while True:
        yield i
        i += 1

counter = infinite_counter()
print(f"Первые 5: {next(counter)}, {next(counter)}, {next(counter)}, {next(counter)}, {next(counter)}")

# Генераторное выражение
squares_gen = (x**2 for x in range(10))
print(f"Генератор: {squares_gen}")
print(f"Первые 3: {next(squares_gen)}, {next(squares_gen)}, {next(squares_gen)}")

# Итераторы
my_list = [1, 2, 3]
iterator = iter(my_list)
print(f"Итератор: {next(iterator)}")
print(f"Итератор: {next(iterator)}")
print(f"Итератор: {next(iterator)}")

# Создание собственного итератора
class Counter:
    """Итератор-счётчик."""
    
    def __init__(self, limit):
        self.limit = limit
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current < self.limit:
            result = self.current
            self.current += 1
            return result
        raise StopIteration

print("Собственный итератор:")
for i in Counter(5):
    print(f"  {i}", end='')
print()

# ============================================
# 16. ДЕКОРАТОРЫ
# ============================================

print("\n" + "=" * 60)
print("16. ДЕКОРАТОРЫ")
print("=" * 60)

# Базовый декоратор
def simple_decorator(func):
    """Простой декоратор."""
    def wrapper(*args, **kwargs):
        print("  До вызова функции")
        result = func(*args, **kwargs)
        print("  После вызова функции")
        return result
    return wrapper

@simple_decorator
def say_hello():
    print("    Привет!")

say_hello()

# Декоратор с параметрами
def repeat(times):
    """Декоратор для повторения вызова."""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet():
    print("  Здравствуйте!")

greet()

# Декоратор для измерения времени
import time

def timer(func):
    """Измеряет время выполнения функции."""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"  Время выполнения {func.__name__}: {end - start:.6f} сек")
        return result
    return wrapper

@timer
def slow_function():
    total = 0
    for i in range(1000000):
        total += i
    return total

result = slow_function()
print(f"  Результат: {result}")

# ============================================
# 17. РАБОТА С МОДУЛЯМИ
# ============================================

print("\n" + "=" * 60)
print("17. МОДУЛИ")
print("=" * 60)

# Импорт модулей
import math
import random
import datetime
import json
import os
import sys

# math
print(f"math.pi = {math.pi}")
print(f"math.sqrt(16) = {math.sqrt(16)}")

# random
print(f"random.random() = {random.random()}")
print(f"random.randint(1, 10) = {random.randint(1, 10)}")
print(f"random.choice([1,2,3]) = {random.choice([1,2,3])}")

my_list = [1, 2, 3, 4, 5]
random.shuffle(my_list)
print(f"Перемешанный список: {my_list}")

# datetime
now = datetime.datetime.now()
print(f"Сейчас: {now}")
print(f"Год: {now.year}")
print(f"Месяц: {now.month}")
print(f"День: {now.day}")

# json
data = {"name": "Иван", "age": 30, "city": "Москва"}
json_string = json.dumps(data, ensure_ascii=False)
print(f"JSON строка: {json_string}")

parsed_data = json.loads(json_string)
print(f"Распарсенный JSON: {parsed_data}")

# os
print(f"Текущая директория: {os.getcwd()}")
print(f"Список файлов: {os.listdir('.')[:5]}")

# ============================================
# 18. РАБОТА С КОЛЛЕКЦИЯМИ
# ============================================

print("\n" + "=" * 60)
print("18. КОЛЛЕКЦИИ (collections)")
print("=" * 60)

from collections import Counter, defaultdict, OrderedDict, namedtuple, deque

# Counter — счётчик элементов
text = "абракадабра"
counter = Counter(text)
print(f"Counter: {counter}")
print(f"Самая частая буква: {counter.most_common(1)}")

# defaultdict — словарь с значением по умолчанию
dd = defaultdict(list)
dd["группа"].append("элемент")
print(f"defaultdict: {dd}")

# OrderedDict — упорядоченный словарь
od = OrderedDict()
od["first"] = 1
od["second"] = 2
od["third"] = 3
print(f"OrderedDict: {od}")

# namedtuple — именованный кортеж
Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(f"namedtuple: {p.x}, {p.y}")

# deque — двусторонняя очередь
dq = deque([1, 2, 3])
dq.append(4)
dq.appendleft(0)
dq.pop()
dq.popleft()
print(f"deque: {dq}")

# ============================================
# 19. ПОЛЕЗНЫЕ ФУНКЦИИ
# ============================================

print("\n" + "=" * 60)
print("19. ПОЛЕЗНЫЕ ФУНКЦИИ")
print("=" * 60)

# map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(f"map: {squared}")

# filter
even = list(filter(lambda x: x % 2 == 0, numbers))
print(f"filter: {even}")

# reduce
from functools import reduce
product = reduce(lambda x, y: x * y, numbers)
print(f"reduce: {product}")

# zip
list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']
zipped = list(zip(list1, list2))
print(f"zip: {zipped}")

# enumerate
for i, value in enumerate(['a', 'b', 'c']):
    print(f"  {i}: {value}")

# sorted
unsorted = [3, 1, 4, 1, 5]
sorted_list = sorted(unsorted)
reverse_sorted = sorted(unsorted, reverse=True)
print(f"sorted: {sorted_list}")
print(f"reverse sorted: {reverse_sorted}")

# any и all
print(f"any: {any([False, True, False])}")
print(f"all: {all([True, True, True])}")

# isinstance и type
x = 10
print(f"isinstance: {isinstance(x, int)}")
print(f"type: {type(x)}")

# dir и help
print(f"Методы строки: {dir('')[:10]}")
# help(str)  # Раскомментируйте для справки

# ============================================
# 20. КОНТЕКСТНЫЕ МЕНЕДЖЕРЫ
# ============================================

print("\n" + "=" * 60)
print("20. КОНТЕКСТНЫЕ МЕНЕДЖЕРЫ")
print("=" * 60)

# Создание контекстного менеджера
class ManagedFile:
    """Контекстный менеджер для файла."""
    
    def __init__(self, filename, mode='r'):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        # Вернуть False, чтобы исключения распространялись
        return False

# Использование
with ManagedFile("test.txt", "w") as f:
    f.write("Запись через контекстный менеджер")

# Контекстный менеджер с contextlib
from contextlib import contextmanager

@contextmanager
def managed_resource():
    print("  Ресурс открыт")
    try:
        yield "ресурс"
    finally:
        print("  Ресурс закрыт")

with managed_resource() as resource:
    print(f"  Используем {resource}")

# ============================================
# ИТОГОВЫЙ ПРИМЕР
# ============================================

print("\n" + "=" * 60)
print("ИТОГОВЫЙ ПРИМЕР: ВСЁ ВМЕСТЕ")
print("=" * 60)

class Student:
    """Класс студента."""
    
    def __init__(self, name, grades=None):
        self.name = name
        self.grades = grades or []
    
    def add_grade(self, grade):
        if 0 <= grade <= 100:
            self.grades.append(grade)
        else:
            raise ValueError("Оценка должна быть от 0 до 100")
    
    @property
    def average(self):
        return sum(self.grades) / len(self.grades) if self.grades else 0
    
    @property
    def is_passing(self):
        return self.average >= 60
    
    def __str__(self):
        status = "сдаёт" if self.is_passing else "не сдаёт"
        return f"{self.name}: средний балл {self.average:.1f} ({status})"

def process_students(students):
    """Обработка списка студентов."""
    passing = []
    failing = []
    
    for student in students:
        if student.is_passing:
            passing.append(student)
        else:
            failing.append(student)
    
    return passing, failing

# Создание студентов
students = [
    Student("Иван", [85, 90, 78]),
    Student("Мария", [95, 92, 88]),
    Student("Пётр", [45, 50, 55]),
    Student("Анна", [70, 75, 80])
]

# Обработка
passing, failing = process_students(students)

print("Сдающие:")
for student in passing:
    print(f"  {student}")

print("Не сдающие:")
for student in failing:
    print(f"  {student}")

# Статистика
all_grades = [grade for student in students for grade in student.grades]
print(f"Всего оценок: {len(all_grades)}")
print(f"Средний балл группы: {sum(all_grades) / len(all_grades):.1f}")
print(f"Максимальная оценка: {max(all_grades)}")
print(f"Минимальная оценка: {min(all_grades)}")

# Сохранение результатов
results = {
    "total_students": len(students),
    "passing": len(passing),
    "failing": len(failing),
    "average_grade": sum(all_grades) / len(all_grades)
}

with open("results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("\nРезультаты сохранены в results.json")
print("\n" + "=" * 60)
print("КУРС ОСНОВ PYTHON ЗАВЕРШЁН!")
print("=" * 60)
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
