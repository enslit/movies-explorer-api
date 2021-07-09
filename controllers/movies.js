const Movie = require('../models/movie');
const ForbiddenError = require('../utils/httpErrors/ForbiddenError');
const NotFountError = require('../utils/httpErrors/NotFountError');

const getMovies = (req, res, next) =>
  Movie.find({ owner: req.userId })
    .then((movies) => {
      res.json({ movies });
    })
    .catch(next);

const saveMovie = (req, res, next) =>
  Movie.create({ ...req.body, owner: req.userId })
    .then((movie) => res.json(movie))
    .catch(next);

const deleteMovie = (req, res, next) =>
  Movie.findById(req.params.movieId)
    .exec()
    .then((movie) => {
      if (!movie) {
        throw new NotFountError(`Фильм с ID: ${req.params.movieId} не найден`);
      }

      if (String(movie.owner) !== req.userId) {
        throw new ForbiddenError('Нарушение доступа');
      }

      return Movie.findByIdAndDelete(req.params.movieId);
    })
    .then((movie) => res.json(movie))
    .catch(next);

module.exports = {
  getMovies,
  saveMovie,
  deleteMovie,
};
