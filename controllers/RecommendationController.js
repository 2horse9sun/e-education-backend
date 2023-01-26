const RecommendationModel = require('../models/RecommendationModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getTopMentorList = async (req, res, next) => {
    let {pageNumber, pageSize} = req.query;

    if(pageNumber == undefined || pageNumber == "undefined"){
        pageNumber = 0;
    }
    if(pageSize == undefined || pageSize == "undefined"){
        pageSize = 10;
    }
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await RecommendationModel.getTopMentorList(pageNumber*pageSize, pageSize);
    return res.json(result);
};

const getPopularCourseList = async (req, res, next) => {
    let {userId, pageNumber, pageSize, tagNameContains, orderByRating, orderByEnrollmentCount, orderByCurrentPrice} = req.query;

    if(pageNumber == undefined || pageNumber == "undefined"){
        pageNumber = 0;
    }
    if(pageSize == undefined || pageSize == "undefined"){
        pageSize = 10;
    }
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await RecommendationModel.getPopularCourseList(userId, pageNumber*pageSize, pageSize, tagNameContains, orderByRating, orderByEnrollmentCount, orderByCurrentPrice);
    return res.json(result);
};

module.exports = {
    getTopMentorList,
    getPopularCourseList
};