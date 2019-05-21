const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = require('express').Router();
router.post('/register', userController.createUser);
router.post('/signIn', authController.signIn);
router.post('/validate', authController.validate);
module.exports = router;