const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { corsConfig } = require('./config/cors');
const { limiter } = require('./config/rateLimiter');
require('dotenv').config();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const clientErrorHandler = require('./middlewares/clientErrorHandler');
const { NotFoundError } = require('./utils/httpErrors');

const {
  SERVER_PORT = 5000,
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'bitfilmsdb',
} = process.env;
const app = express();

app.use(corsConfig);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.use('/api/', require('./routes/index'));

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());
app.use(clientErrorHandler);

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Соединение с базой данных установлено');
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });

app.listen(SERVER_PORT, () => {
  console.log('Сервер был запущен на порту', SERVER_PORT);
});
