const SearchModel = require('../models/SearchModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const searchMentor = async (req, res, next) => {
    let {pageNumber, pageSize, key} = req.query;

    if(pageNumber == undefined || pageNumber == "undefined"){
        pageNumber = 0;
    }
    if(pageSize == undefined || pageSize == "undefined"){
        pageSize = 10;
    }
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await SearchModel.searchMentor(pageNumber*pageSize, pageSize, key);
    return res.json(result);
};

const searchCourse = async (req, res, next) => {
    let {userId, pageNumber, pageSize, key, tagNameContains, orderByRating, orderByEnrollmentCount, orderByCurrentPrice} = req.query;

    if(pageNumber == undefined || pageNumber == "undefined"){
        pageNumber = 0;
    }
    if(pageSize == undefined || pageSize == "undefined"){
        pageSize = 10;
    }
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await SearchModel.searchCourse(userId, pageNumber*pageSize, pageSize, key, tagNameContains, orderByRating, orderByEnrollmentCount, orderByCurrentPrice);
    return res.json(result);
};

module.exports = {
    searchMentor,
    searchCourse
};