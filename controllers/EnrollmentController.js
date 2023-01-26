const EnrollmentModel = require('../models/EnrollmentModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const enrollCourse = async (req, res, next) => {
    const {userId, courseId} = req.body;
    const result = await EnrollmentModel.enrollCourse(userId, courseId);
    return res.json(result);
};


const dropCourse = async (req, res, next) => {
    const {userId, courseId} = req.query;
    const result = await EnrollmentModel.dropCourse(userId, courseId);
    return res.json(result);
};

module.exports = {
    enrollCourse,
    dropCourse
};