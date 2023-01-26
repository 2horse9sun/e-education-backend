const express = require('express');
const router = express.Router();
const EnrollmentController = require('../controllers/EnrollmentController');


router.post('/enrollCourse', EnrollmentController.enrollCourse);

router.delete('/dropCourse', EnrollmentController.dropCourse);


module.exports = router;