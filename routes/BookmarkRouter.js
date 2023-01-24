const express = require('express');
const router = express.Router();
const BookmarkController = require('../controllers/BookmarkController');


router.get('/getMyBookmarkList', BookmarkController.getMyBookmarkList);

router.post('/addMyBookmark', BookmarkController.addMyBookmark);

router.delete('/deleteMyBookmark', BookmarkController.deleteMyBookmark);


module.exports = router;