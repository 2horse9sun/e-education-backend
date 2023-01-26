const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/SearchController');


router.get('/searchMentor', SearchController.searchMentor);

router.get('/searchCourse', SearchController.searchCourse);


module.exports = router;