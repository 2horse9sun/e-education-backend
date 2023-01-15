const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/LessonController');
const {loginVerification} = require('../middlewares/AuthenticationMiddleware');
const {checkAccessToLessonDetail} = require('../middlewares/AuthorizationMiddleware');


router.get('/getAllLessonsByCourseId', LessonController.getAllLessonsByCourseId);
router.get('/getAllMyLessonsByCourseId', loginVerification, LessonController.getAllMyLessonsByCourseId);
router.get('/getLessonDetailById', LessonController.getLessonDetailById);
router.get('/getMyLessonDetailById', loginVerification, checkAccessToLessonDetail, LessonController.getMyLessonDetailById);

router.post('/addLessonBySectionId', LessonController.addLessonBySectionId);
router.post('/addLessonFileByLessonId', LessonController.addLessonFileByLessonId);

router.put('/updateLessonById', LessonController.updateLessonById);
router.put('/updateLessonFileById', LessonController.updateLessonFileById);

router.delete('/deleteLessonById', LessonController.deleteLessonById);
router.delete('/deleteLessonFileById', LessonController.deleteLessonFileById);


module.exports = router;