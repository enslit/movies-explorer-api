const { Router } = require('express');
const { login, register, logout } = require('../controllers/user');
const auth = require('../middlewares/auth');
const {
  loginValidator,
  registerValidator,
} = require('../middlewares/validators');

const router = Router();

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, register);
router.post('/signout', logout);

router.use(auth);

router.use('/users', require('./user'));
router.use('/movies', require('./movies'));

module.exports = router;
