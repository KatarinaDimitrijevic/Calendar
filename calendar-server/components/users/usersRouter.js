const express = require('express');

const controller = require('./usersController');
const router = express.Router();

router.get('/', controller.getUsers);
router.post('/', controller.createUser);


module.exports = router;