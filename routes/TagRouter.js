const express = require('express');
const router = express.Router();
const TagController = require('../controllers/TagController');


router.get('/getAllTags', (req, res, next) => TagController.getAllTags(req, res, next));

router.put('/putTag', (req, res, next) => TagController.putTag(req, res, next));

router.post('/updateTagByName', (req, res, next) => TagController.updateTagByName(req, res, next));

router.delete('/deleteTagByName', (req, res, next) => TagController.deleteTagByName(req, res, next));


module.exports = router;