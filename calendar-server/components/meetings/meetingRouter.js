const express = require('express');

const controller = require('./meetingController');
const router = express.Router();

router.get('/', controller.getMeetings);
router.post('/', controller.createMeeting);
router.get('/:id', controller.getMeetingById);
router.delete('/:id', controller.deleteMeeting);

module.exports = router;