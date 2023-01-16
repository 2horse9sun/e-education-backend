const ReviewModel = require('../models/ReviewModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getReviewListByCourseId = async (req, res, next) => {
    let {courseId, userId, pageNumber, pageSize, ratingEqualTo, orderByRating} = req.query;
    if(userId === undefined && userId === "undefined"){
        userId = 0;
    }
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await ReviewModel.getReviewListByCourseId(courseId, userId, pageNumber*pageSize, pageSize, ratingEqualTo, orderByRating);
    return res.json(result);
};


const getReviewListByMentorId = async (req, res, next) => {
    let {mentorId, userId, pageNumber, pageSize, ratingEqualTo, orderByRating} = req.query;
    if(userId === undefined && userId === "undefined"){
        userId = 0;
    }
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await ReviewModel.getReviewListByMentorId(mentorId, userId, pageNumber*pageSize, pageSize, ratingEqualTo, orderByRating);
    return res.json(result);
};


const getMyReviewList = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    let {pageNumber, pageSize, ratingEqualTo, orderByRating} = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await ReviewModel.getMyReviewList(userId, pageNumber*pageSize, pageSize, ratingEqualTo, orderByRating);
    return res.json(result);
};


const addMyReviewByCourseId = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    const {courseId, content, rating} = req.body;
    const result = await ReviewModel.addMyReviewByCourseId(userId, courseId, content, rating);
    return res.json(result);
};


const updateMyReviewById = async (req, res, next) => {
    const {reviewId, content, rating} = req.body;
    const result = await ReviewModel.updateMyReviewById(reviewId, content, rating);
    return res.json(result);
};


const likeReviewById = async (req, res, next) => {
    const {userId, reviewId} = req.query;
    const result = await ReviewModel.likeReviewById(userId, reviewId);
    return res.json(result);
};


const cancelLikeReviewById = async (req, res, next) => {
    const {userId, reviewId} = req.query;
    const result = await ReviewModel.cancelLikeReviewById(userId, reviewId);
    return res.json(result);
};


const deleteMyReviewById = async (req, res, next) => {
    const {reviewId} = req.query;
    const result = await ReviewModel.deleteMyReviewById(reviewId);
    return res.json(result);
};


module.exports = {
    getReviewListByCourseId,
    getReviewListByMentorId,
    getMyReviewList,
    addMyReviewByCourseId,
    updateMyReviewById,
    likeReviewById,
    cancelLikeReviewById,
    deleteMyReviewById
};