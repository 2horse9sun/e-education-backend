const express = require('express');
const router = express.Router();
const TagController = require('../controllers/TagController');


router.get('/getAllTags', TagController.getAllTags);

router.put('/putTag', TagController.putTag);

router.post('/updateTagByName', TagController.updateTagByName);

router.delete('/deleteTagByName', TagController.deleteTagByName);


module.exports = router;