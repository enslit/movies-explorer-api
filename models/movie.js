const { Schema, model, Types } = require('mongoose');
const {
  isLinkImage,
  isUrl,
  isCyrillicText,
  isLatinText,
} = require('../utils/regExpValidators');

const movieSchema = new Schema({
  owner: { type: Types.ObjectId, ref: 'User', required: true },
  movieId: { type: String, required: true },
  country: { type: String, required: true },
  director: { type: String, required: true },
  duration: { type: Number, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isLinkImage,
      message: 'Не корректная ссылка на изображение',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
      message: 'Не корректная ссылка на трейлер',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: isLinkImage,
      message: 'Не корректная ссылка на изображение',
    },
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: isCyrillicText,
      message: 'Название должно быть написано кириллицей',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: isLatinText,
      message: 'Название должно быть написано латиницей',
    },
  },
});

module.exports = model('Movie', movieSchema);
