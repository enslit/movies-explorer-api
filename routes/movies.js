const { Router } = require('express');
const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');
const { saveMovieValidator, deleteMovieValidator } = require('../middlewares/validators');

const router = Router();

router.get('/', getMovies);
router.post('/', saveMovieValidator, saveMovie);
router.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
