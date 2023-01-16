const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const {loginVerification} = require('../middlewares/AuthenticationMiddleware');
const {checkAccessToCourse} = require('../middlewares/AuthorizationMiddleware');


router.get('/getCourseList', CourseController.getCourseList);
router.get('/getMyCourseList', loginVerification, CourseController.getMyCourseList);
router.get('/getCourseDetailById', CourseController.getCourseDetailById);
router.get('/getCourseListByMentorId', CourseController.getCourseListByMentorId);

router.post('/addCourse', CourseController.addCourse);

router.put('/updateCourseById', CourseController.updateCourseById);

router.delete('/deleteCourseById', CourseController.deleteCourseById);


module.exports = router;