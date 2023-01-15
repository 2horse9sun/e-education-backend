const LessonModel = require('../models/LessonModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getAllLessonsByCourseId = async (req, res, next) => {
    const {courseId} = req.query;
    const result = await LessonModel.getAllLessonsByCourseId(courseId);
    return res.json(result);
};


const getAllMyLessonsByCourseId = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    const {courseId} = req.query;
    const result = await LessonModel.getAllMyLessonsByCourseId(courseId, userId);
    return res.json(result);
};


const getLessonDetailById = async (req, res, next) => {
    const {lessonId} = req.query;
    const result = await LessonModel.getLessonDetailById(lessonId);
    return res.json(result);
};


const getMyLessonDetailById = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    const {lessonId} = req.query;
    const result = await LessonModel.getMyLessonDetailById(lessonId, userId);
    return res.json(result);
};


const addLessonBySectionId = async (req, res, next) => {
    const {sectionId, lessonName, lessonPriority, lessonDuration, lessonType} = req.body;
    const result = await LessonModel.addLessonBySectionId(sectionId, lessonName, lessonPriority, lessonDuration, lessonType);
    return res.json(result);
};


const addLessonFileByLessonId = async (req, res, next) => {
    const {lessonId, fileName, fileType, fileSize} = req.body;
    const result = await LessonModel.addLessonFileByLessonId(lessonId, fileName, fileType, fileSize);
    return res.json(result);
};


const updateLessonById = async (req, res, next) => {
    const {lessonId, lessonName, lessonPriority, lessonDuration, lessonType} = req.body;
    const result = await LessonModel.updateLessonById(lessonId, lessonName, lessonPriority, lessonDuration, lessonType);
    return res.json(result);
};


const updateLessonFileById = async (req, res, next) => {
    const {lessonFileId, fileName, fileType, fileSize} = req.body;
    const result = await LessonModel.updateLessonFileById(lessonFileId, fileName, fileType, fileSize);
    return res.json(result);
};


const deleteLessonById = async (req, res, next) => {
    const {lessonId} = req.query;
    const result = await LessonModel.deleteLessonById(lessonId);
    return res.json(result);
};


const deleteLessonFileById = async (req, res, next) => {
    const {lessonFileId} = req.query;
    const result = await LessonModel.deleteLessonFileById(lessonFileId);
    return res.json(result);
};


module.exports = {
    getAllLessonsByCourseId,
    getAllMyLessonsByCourseId,
    getLessonDetailById,
    getMyLessonDetailById,
    addLessonBySectionId,
    addLessonFileByLessonId,
    updateLessonById,
    updateLessonFileById,
    deleteLessonById,
    deleteLessonFileById
};