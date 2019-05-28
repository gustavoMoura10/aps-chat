const router = require('express').Router();
const roomController = require('../controllers/roomController');
router.post('/',roomController.createRoom);
router.get('/',roomController.findAllRooms);
module.exports = router;