const express = require('express');
const router = express.Router();
const RecommendationController = require('../controllers/RecommendationController');


router.get('/getTopMentorList', RecommendationController.getTopMentorList);

router.get('/getPopularCourseList', RecommendationController.getPopularCourseList);


module.exports = router;