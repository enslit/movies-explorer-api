const { celebrate, Segments, Joi } = require('celebrate');

module.exports.loginValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(25).required(),
    }),
  },
  { abortEarly: false }
);

module.exports.registerValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(25).required(),
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
      image: Joi.link().required(),
      trailer: Joi.link().required(),
      thumbnail: Joi.link().required(),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
  { abortEarly: false }
);
