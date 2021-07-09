const { Router } = require('express');
const { getUserInfo, updateUser } = require('../controllers/user');
const { updateUserInfoValidator } = require('../middlewares/validators/index');

const router = Router();

router.get('/me', getUserInfo);
router.patch('/me', updateUserInfoValidator, updateUser);

module.exports = router;
