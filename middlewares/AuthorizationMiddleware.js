const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');
const AuthorizationController = require('../controllers/AuthorizationController');

const checkAccessToLessonDetail = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    const {lessonId} = req.query;

    const hasAccess = await AuthorizationController.checkUserAccessToLesson(userId, lessonId);
    if(hasAccess){
        next();
    }else{
        return res.json(new ErrorResponse("User has no access to this lesson", STATUS_CODE.ACCESS_DENIED));
    }

}

module.exports = {
    checkAccessToLessonDetail
}