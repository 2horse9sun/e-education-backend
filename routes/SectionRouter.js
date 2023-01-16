const express = require('express');
const router = express.Router();
const SectionController = require('../controllers/SectionController');


router.get('/getAllSectionsByCourseId', SectionController.getAllSectionsByCourseId);

router.post('/addSectionByCourseId', SectionController.addSectionByCourseId);

router.put('/updateSectionById', SectionController.updateSectionById);

router.delete('/deleteSectionById', SectionController.deleteSectionById);


module.exports = router;