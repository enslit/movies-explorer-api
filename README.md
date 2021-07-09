# Movies Explorer API
API для поиска и хранения избранных фильмов пользователей.

## Функционал
- Регистрация / Авторизация пользователей
- Сохранение / удаление фильмов

## Конфигурация 

Для задания конфигурации, необходимо создать в корне файл `.env` и указать там параметры формата `NODE_ENV=development` 

Параметр | Значение | По умолчанию | Описание
--- | --- | --- | ---
EXPRESS_PORT | 1024-65535 | 5000 | Порт веб сервера Express
NODE_ENV | production ИЛИ development | development | Режим сервера.
JWT_SECRET_TOKEN | Любая строка | undefined | Секретная строка для JWT. Чем сложней, тем лучше. Можно использовать команду `node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"` скопировать и вставить результат выполнения команды
DB_HOST | URL MongoDB | localhost | Адрес хоста базы данных Mongo
DB_PORT | 1024-65535 | 27017 | Порт хоста базы данных Mongo
DB_NAME | Любая строка | bitfilmsdb | Название базы данных. Будет создана если не существует.

## Планы по развитию
- Переход на TypeScript
- Регистрация пользователей с подтверждением email

## Ссылки
- api.enslit-movies.nomoredomains.club
- [Swagger](https://app.swaggerhub.com/apis/enslit/MoviesExplorer/1.0.0)
