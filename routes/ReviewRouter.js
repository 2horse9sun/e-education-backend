const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const {loginVerification} = require('../middlewares/AuthenticationMiddleware');
const {checkAccessToCourse} = require('../middlewares/AuthorizationMiddleware');


router.get('/getReviewListByCourseId', ReviewController.getReviewListByCourseId);
router.get('/getReviewListByMentorId', ReviewController.getReviewListByMentorId);
router.get('/getMyReviewList', loginVerification, ReviewController.getMyReviewList);

router.post('/addMyReviewByCourseId', loginVerification, checkAccessToCourse, ReviewController.addMyReviewByCourseId);

router.put('/updateMyReviewById', loginVerification, ReviewController.updateMyReviewById);
router.put('/likeReviewById', loginVerification, ReviewController.likeReviewById);


router.delete('/cancelLikeReviewById', loginVerification, ReviewController.cancelLikeReviewById);
router.delete('/deleteMyReviewById', loginVerification, ReviewController.deleteMyReviewById);


module.exports = router;