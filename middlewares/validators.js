const { urlRegExp, linkImageRegExp, textRuRegExp, textEnRegExp } = require('../utils/regExp');
const { celebrate, Segments, Joi } = require('celebrate');

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

module.exports.logoutValidator = celebrate({
  [Segments.COOKIES]: Joi.object({
    jwt: Joi.string().required(),
  }),
});

module.exports.updateUserInfoValidator = celebrate(
  {
    [Segments.COOKIES]: Joi.object({
      jwt: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  },
  { abortEarly: false }
);

module.exports.saveMovieValidator = celebrate(
  {
    [Segments.COOKIES]: Joi.object({
      jwt: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(linkImageRegExp),
      thumbnail: Joi.string().required().regex(linkImageRegExp),
      trailer: Joi.string().required().regex(urlRegExp),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required().regex(textRuRegExp),
      nameEN: Joi.string().required().regex(textEnRegExp),
    }),
  }, { abortEarly: false }
);

module.exports.deleteMovieValidator = celebrate({
  [Segments.COOKIES]: Joi.object({
    jwt: Joi.string().required(),
  }),
  [Segments.PARAMS]: Joi.object({
    movieId: Joi.string().required().length(24).hex()
  })
})