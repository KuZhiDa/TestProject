# Система бронирования мест на мероприятия

## Описание проекта

REST API для системы бронирования мест на мероприятия с проверкой доступности мест и защитой от двойного бронирования.

## Технологии

- NestJS 11
- Sequelize ORM
- PostgreSQL
- TypeScript
- class-validator

## Установка и запуск

1. Установите зависимости: `npm install`
2. Настройте базу данных PostgreSQL и создайте файл .env:
   PORT=5000
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USERNAME=postgres
   POSTGRES_PASSWORD=12345
   POSTGRES_DB=testBd
3. Запустите приложение: `npm run start:dev`
   Приложение будет доступно по адресу: http://localhost:5000

## API Endpoints

### Создание мероприятия

POST /api/event
Content-Type: application/json
{
"name": "Концерт",
"total_seats": 100
}

### Бронирование места

POST /api/bookings/reserve
Content-Type: application/json
{
"event_id": 1,
"user_id": "user123"
}

## Ответы API

### Успешное создание мероприятия:

{"message": "Мероприятие успешно создано."}

### Успешное бронирование:

{"message": "Бронь прошла успешно."}

### Ошибки:

- 400: "Данное мероприятие уже существует."
- 400: "Такого мероприятия нет."
- 400: "Нет мест на данное мероприятие."
- 400: "Вы уже забронировали место."

## Структура базы данных

### Таблица events:

- id (SERIAL PRIMARY KEY)
- name (VARCHAR(100))
- total_seats (INTEGER)

### Таблица bookings:

- id (SERIAL PRIMARY KEY)
- event_id (INTEGER REFERENCES events(id))
- user_id (VARCHAR(1000))
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

## Бизнес-логика

### При создании мероприятия:

- Проверка на уникальность названия мероприятия

### При бронировании:

- Проверка существования мероприятия
- Проверка доступности мест (количество броней < total_seats)
- Проверка дублирования брони (один пользователь не может бронировать дважды)
- Создание записи о бронировании

## Скрипты package.json

- `npm run start` - запуск приложения
- `npm run start:dev` - запуск в режиме разработки
- `npm run build` - сборка проекта
- `npm run test` - запуск тестов

## Архитектура проекта

src/
├── model/
│ ├── events.model.ts
│ └── bookings.model.ts
├── event/
│ ├── event.controller.ts
│ ├── event.service.ts
│ └── dto/
├── bookings/
│ ├── bookings.controller.ts
│ ├── bookings.service.ts
│ └── dto/
├── app.module.ts
└── main.ts
