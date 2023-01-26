const BookmarkModel = require('../models/BookmarkModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getMyBookmarkList = async (req, res, next) => {
    const {userId, tagIds} = req.query;
    const result = await BookmarkModel.getMyBookmarkList(userId, tagIds);
    return res.json(result);
};


const addMyBookmark = async (req, res, next) => {
    const {userId, courseId} = req.body;
    const result = await BookmarkModel.addMyBookmark(userId, courseId);
    return res.json(result);
};


const deleteMyBookmark = async (req, res, next) => {
    const {userId, courseId} = req.query;
    const result = await BookmarkModel.deleteMyBookmark(userId, courseId);
    return res.json(result);
};

module.exports = {
    getMyBookmarkList,
    addMyBookmark,
    deleteMyBookmark
};