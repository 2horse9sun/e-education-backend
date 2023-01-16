const AuthorizationModel = require('../models/AuthorizationModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const checkUserAccessToCourse = async (userId, courseId) => {
    const result = await AuthorizationModel.checkUserAccessToCourse(userId, courseId);
    if(result.data.length > 0){
        return true;
    }else{
        return false
    }
};


const checkUserAccessToLesson = async (userId, lessonId) => {
    const result = await AuthorizationModel.checkUserAccessToLesson(userId, lessonId);
    if(result.data.length > 0){
        return true;
    }else{
        return false
    }
};



module.exports = {
    checkUserAccessToCourse,
    checkUserAccessToLesson
};