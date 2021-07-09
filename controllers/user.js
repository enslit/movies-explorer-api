const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../utils/httpErrors/ConflictError');

const getUserInfo = (req, res, next) =>
  User.findById(req.userId)
    .then(({ _id, email, name }) => {
      res.json({ _id, email, name });
    })
    .catch(next);

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (user && String(user._id) !== req.userId) {
        throw new ConflictError(
          'Пользователь с таким email уже зарегистрирован'
        );
      }

      return User.findByIdAndUpdate(
        req.userId,
        { name, email },
        { runValidators: true }
      );
    })
    .then(() => res.json({ message: 'Обновлено' }))
    .catch(next);
};

const login = (req, res, next) =>
  User.findUserByCredentials(req.body.email, req.body.password)
    .then(({ _id }) => {
      const JWT_SECRET =
        process.env.NODE_ENV !== 'production'
          ? 'dev-key'
          : process.env.JWT_SECRET;
      const token = jwt.sign({ _id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      return res.json({ message: 'Авторизован' });
    })
    .catch(next);

const register = async (req, res, next) => {
  const { email, password, name } = req.body;

  return User.findOne({ email })
    .exec()
    .then((user) => {
      if (user) {
        throw new ConflictError(
          'Пользователь с таким email уже зарегистрирован'
        );
      }
    })
    .then(() => bcrypt.hash(password, 10))
    .then((passwordHash) =>
      User.create({
        email,
        password: passwordHash,
        name,
      })
    )
    .then(({ _id }) => res.status(201).json({ _id }))
    .catch(next);
};

const logout = (req, res) =>
  res.clearCookie('jwt').json({ message: 'Выход выполнен' });

module.exports = {
  getUserInfo,
  updateUser,
  logout,
  login,
  register,
};
