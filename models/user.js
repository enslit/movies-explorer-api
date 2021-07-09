const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');
const Movie = require('./movie');
const { isEmail } = require('../utils/regExpValidators');

const UnauthorizedError = require('../utils/httpErrors/UnauthorizedError');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: 'Не корректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .orFail(() => {
      throw new UnauthorizedError('Неверный email или пароль');
    })
    .select('+password')
    .then((user) =>
      bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неверный email или пароль');
        }

        return user;
      })
    );
};

userSchema.pre('remove', function (next) {
  Movie.remove({ owner: this._id })
    .exec()
    .then(() => next())
    .catch(next);
});

module.exports = model('User', userSchema);
