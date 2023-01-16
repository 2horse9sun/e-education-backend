const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');
const AuthorizationController = require('../controllers/AuthorizationController');


const checkAccessToCourse = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    let courseId;
    const courseId1 = req.query.courseId;
    const courseId2 = req.body.courseId;
    if(courseId1 !== undefined) courseId = courseId1;
    if(courseId2 !== undefined) courseId = courseId2;
    const hasAccess = await AuthorizationController.checkUserAccessToCourse(userId, courseId);
    if(hasAccess){
        next();
    }else{
        return res.json(new ErrorResponse("User has no access to this course", STATUS_CODE.ACCESS_DENIED));
    }
}


const checkAccessToLessonDetail = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    let lessonId;
    const lessonId1 = req.query.courseId;
    const lessonId2 = req.body.courseId;
    if(lessonId1 !== undefined) lessonId = lessonId1;
    if(lessonId2 !== undefined) lessonId = lessonId2;
    const hasAccess = await AuthorizationController.checkUserAccessToLesson(userId, lessonId);
    if(hasAccess){
        next();
    }else{
        return res.json(new ErrorResponse("User has no access to this lesson", STATUS_CODE.ACCESS_DENIED));
    }
}

module.exports = {
    checkAccessToCourse,
    checkAccessToLessonDetail
}