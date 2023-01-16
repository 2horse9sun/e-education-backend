const express = require('express');
const router = express.Router();
const TagController = require('../controllers/TagController');


router.get('/getAllTags', TagController.getAllTags);

router.put('/addTag', TagController.addTag);

router.put('/updateTagById', TagController.updateTagById);

router.delete('/deleteTagById', TagController.deleteTagById);


module.exports = router;