/**
 * Módulo do express para rotas em HTTP
 */
const router = require('express').Router();
/**
 * Controller de room
 */
const roomController = require('../controllers/roomController');
/**
 * URLS para criar uma room e 
 * buscar todas as rooms
 */
router.post('/',roomController.createRoom);
router.get('/',roomController.findAllRooms);
/**
 * Exporta o router para que
 * seja usado na API pelo express
 */
module.exports = router;