const express = require('express');
const { createMessage, getMessages, deleteMessage } = require('../controller/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/send', createMessage);
router.get('/', authMiddleware, getMessages);
router.delete('/:id', authMiddleware, deleteMessage);

module.exports = router;
