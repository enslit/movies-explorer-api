const { Schema, model, Types } = require('mongoose');
const { urlRegExp, linkImageRegExp } = require('../utils/regExp');

const movieSchema = new Schema({
  owner: { type: Types.ObjectId, ref: 'User', required: true },
  movieId: { type: String, required: true },
  country: { type: String, required: false, default: 'Unknown' },
  director: { type: String, required: false, default: 'Unknown' },
  duration: { type: Number, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return linkImageRegExp.test(v);
      },
      message: 'Не корректная ссылка на изображение',
    },
  },
  trailer: {
    type: String,
    default: null,
    required: false,
    validate: {
      validator: function (v) {
        return urlRegExp.test(v);
      },
      message: 'Не корректная ссылка на трейлер',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return urlRegExp.test(v);
      },
      message: 'Не корректная ссылка на изображение',
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = model('Movie', movieSchema);
