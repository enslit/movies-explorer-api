const { Router } = require('express');
const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');
const { saveMovieValidator } = require('../middlewares/validators/index');

const router = Router();

router.get('/', getMovies);
router.post('/', saveMovieValidator, saveMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
