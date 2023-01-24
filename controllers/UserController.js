const UserModel = require('../models/UserModel');
const jwt = require("jsonwebtoken");
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {generatePasswordHash, generateRandomSalt} = require('../utils/Crypto');
const {STATUS_CODE} = require('../configs/StatusCode');

const JWT_EXPRIES_IN = "7d";


const checkIfEmailExists = async (req, res, next) => {
    const {email} = req.query;
    const result = await UserModel.getUserAccountInfoByEmail(email);
    if(result.statusCode !== 0){
        return result;
    } 
    const count = result.data.length;
    if(count > 0){
        return res.json(new SuccessResponse({emailExists: true}));
    } else {
        return res.json(new SuccessResponse({emailExists: false}));
    }
};


const getUserProfileInfoById = async (req, res, next) => {
    const {userId} = req.query;
    const result = await UserModel.getUserProfileInfoById(userId);
    return res.json(result);
};


const getMyUserProfileInfo = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    const result = await UserModel.getUserProfileInfoById(userId);
    return res.json(result);
};


const getMentorList = async (req, res, next) => {
    let {pageNumber, pageSize} = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await UserModel.getMentorList(pageNumber*pageSize, pageSize);
    return res.json(result);
};


const getMentorProfileInfoById = async (req, res, next) => {
    const {mentorId} = req.query;
    const result = await UserModel.getMentorProfileInfoById(mentorId);
    return res.json(result);
};


const getStudentListByMentorId = async (req, res, next) => {
    let {mentorId, pageNumber, pageSize} = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    const result = await UserModel.getStudentListByMentorId(mentorId, pageNumber*pageSize, pageSize);
    return res.json(result);
};


const updateUserProfileInfoById = async (req, res, next) => {
    const {userId, firstName, lastName, nickname, dateOfBirth, phoneNumber, gender} = req.body;
    const result = await UserModel.updateUserProfileInfoById(userId, firstName, lastName, nickname, dateOfBirth, phoneNumber, gender);
    return res.json(result);
};


const updateMyUserProfileInfo = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    const {firstName, lastName, nickname, dateOfBirth, phoneNumber, gender} = req.body;
    const result = await UserModel.updateUserProfileInfoById(userId, firstName, lastName, nickname, dateOfBirth, phoneNumber, gender);
    return res.json(result);
};


const updateUserAvatarById = async (req, res, next) => {
    const {userId, avatarUrl} = req.body;
    const result = await UserModel.updateUserAvatarById(userId, avatarUrl);
    return res.json(result);
};


const updateMyUserAvatar = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    const {avatarUrl} = req.body;
    const result = await UserModel.updateUserAvatarById(userId, avatarUrl);
    return res.json(result);
};


const updateMyPassword = async (req, res, next) => {
    const {userId} = req.userAccountInfo;
    const {oldPassword, newPassword} = req.body;
    let result = await UserModel.getUserAccountInfoById(userId);
        if(result.statusCode !== 0){
            return result;
        } 
        if(result.data.length === 0){
            return res.json(new ErrorResponse("User does not exist", STATUS_CODE.DB_RECORD_NOT_EXIST));
        }
        const accountInfo = result.data[0];
    
        let salt = accountInfo.salt;
        const realPasswordHash = accountInfo.password;
        const passwordHashToBeChecked = generatePasswordHash(oldPassword, salt);
        if(realPasswordHash === passwordHashToBeChecked){
            salt = generateRandomSalt();
            const passwordHash = generatePasswordHash(newPassword, salt);
            result = await UserModel.updateMyPassword(userId, salt, passwordHash);
            return res.json(result);
        }else {
            return res.json(new ErrorResponse("Wrong password", STATUS_CODE.WRONG_PASSWORD))
        }

};


const userRegister = async (req, res, next) => {
    const {email, password} = req.body;
    const salt = generateRandomSalt();
    const passwordHash = generatePasswordHash(password, salt);
    const result = await UserModel.userRegister(email, salt, passwordHash);
    if(result.statusCode !== 0){
        return result;
    }

    const userId = result.data[0].id;
    const token = jwt.sign({
        userId,
        email
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: JWT_EXPRIES_IN
    });
    return res.json(new SuccessResponse({
        userId,
        email,
        token
    }));
};


const userLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const result = await UserModel.getUserAccountInfoByEmail(email);
        if(result.statusCode !== 0){
            return result;
        } 
        if(result.data.length === 0){
            return res.json(new ErrorResponse("User does not exist", STATUS_CODE.DB_RECORD_NOT_EXIST));
        }
        const accountInfo = result.data[0];
    
        const salt = accountInfo.salt;
        const realPasswordHash = accountInfo.password;
        const passwordHashToBeChecked = generatePasswordHash(password, salt);
        if(realPasswordHash === passwordHashToBeChecked){
            const token = jwt.sign({
                userId: accountInfo.id,
                email: accountInfo.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: JWT_EXPRIES_IN
            });
            return res.json(new SuccessResponse({
                userId: accountInfo.id,
                email: accountInfo.email,
                token
            }));
        } else {
            return res.json(new ErrorResponse("Wrong password", STATUS_CODE.WRONG_PASSWORD));
        }
    } catch (error) {
        console.log(error);
        return res.json(new ErrorResponse(error.toString()));
    }

};


module.exports = {
    checkIfEmailExists,
    getUserProfileInfoById,
    getMyUserProfileInfo,
    getMentorList,
    getMentorProfileInfoById,
    getStudentListByMentorId,
    updateUserProfileInfoById,
    updateMyUserProfileInfo,
    updateUserAvatarById,
    updateMyUserAvatar,
    updateMyPassword,
    userRegister,
    userLogin
};