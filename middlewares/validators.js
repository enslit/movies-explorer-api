const { celebrate, Segments, Joi } = require('celebrate');
const { urlRegExp, linkImageRegExp } = require('../utils/regExp');

module.exports.loginValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  { abortEarly: false }
);

module.exports.registerValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  },
  { abortEarly: false }
);

module.exports.updateUserInfoValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  },
  { abortEarly: false }
);

module.exports.saveMovieValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().min(4).max(4).required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(linkImageRegExp),
      thumbnail: Joi.string().required().regex(linkImageRegExp),
      trailer: Joi.string().required().regex(urlRegExp),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
  { abortEarly: false }
);

module.exports.deleteMovieValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    movieId: Joi.string().required().length(24).hex(),
  }),
});
