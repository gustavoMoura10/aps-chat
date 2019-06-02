/**
 * Controllers de user e auth
 */
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
/**
 * Módulo do express para rotas em HTTP
 */
const router = require('express').Router();
/**
 * URLS para registrar e logar
 * um usuário
 */
router.post('/register', userController.createUser);
router.post('/signIn', authController.signIn);
/**
 * Exporta o router para que
 * seja usado na API pelo express
 */
module.exports = router;