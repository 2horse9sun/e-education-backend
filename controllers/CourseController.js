const CourseModel = require('../models/CourseModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getCourseList = async (req, res, next) => {
    let {userId, pageNumber, pageSize, tagNameContains, orderByRating, orderByEnrollmentCount, orderByCurrentPrice} = req.query;
    if(userId === undefined && userId === "undefined"){
        userId = 0;
    }
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await CourseModel.getCourseList(userId, pageNumber*pageSize, pageSize, tagNameContains, orderByRating, orderByEnrollmentCount, orderByCurrentPrice);
    return res.json(result);
};


const getMyCourseList = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    let {pageNumber, pageSize} = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await CourseModel.getMyCourseList(userId, pageNumber*pageSize, pageSize);
    return res.json(result);
};


const getCourseDetailById = async (req, res, next) => {
    let {courseId, userId} = req.query;
    if(userId === undefined && userId === "undefined"){
        userId = 0;
    }
    const result = await CourseModel.getCourseDetailById(courseId, userId);
    return res.json(result);
};


const getCourseListByMentorId = async (req, res, next) => {
    let {mentorId, userId, pageNumber, pageSize} = req.query;
    if(userId === undefined && userId === "undefined"){
        userId = 0;
    }
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await CourseModel.getCourseListByMentorId(mentorId, userId, pageNumber*pageSize, pageSize);
    return res.json(result);
};


const addCourse = async (req, res, next) => {
    let {courseName, originalPrice, currentPrice, courseDescription, thumbnailUrl, duration} = req.body;
    const result = await CourseModel.addCourse(courseName, originalPrice, currentPrice, courseDescription, thumbnailUrl, duration);
    return res.json(result);
};


const updateCourseById = async (req, res, next) => {
    let {courseId, courseName, originalPrice, currentPrice, courseDescription, thumbnailUrl, duration} = req.body;
    const result = await CourseModel.updateCourseById(courseId, courseName, originalPrice, currentPrice, courseDescription, thumbnailUrl, duration);
    return res.json(result);
};


const deleteCourseById = async (req, res, next) => {
    let {courseId} = req.query;
    const result = await CourseModel.deleteCourseById(courseId);
    return res.json(result);
};


module.exports = {
    getCourseList,
    getMyCourseList,
    getCourseDetailById,
    getCourseListByMentorId,
    addCourse,
    updateCourseById,
    deleteCourseById
};