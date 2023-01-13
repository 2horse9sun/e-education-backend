const S3Model = require('../models/S3Model');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');
const fs = require('fs').promises;
const S3Function = require('../storages/S3Function');


const signedGetObjectUrl = async (req, res, next) => {
    try {
        const {objectPath, expiresIn} = req.query;
        const url = await S3Function.signedGetObjectUrl(objectPath, expiresIn);
        return res.json(new SuccessResponse(url));
    } catch (error) {
        console.log(error);
        return res.json(new ErrorResponse(error.message, STATUS_CODE.S3_ERROR));
    }
};


const getObject = async (req, res, next) => {
    try {
        const {srcPath, destPath} = req.query;
        await S3Model.getObject(srcPath, destPath);
        return res.json(new SuccessResponse());
    } catch (error) {
        console.log(error);
        return res.json(new ErrorResponse(error.message, STATUS_CODE.S3_ERROR));
    }
};


const getObjectBySignedUrl = async (req, res, next) => {
    try {
        const {srcPath, destPath} = req.query;
        const url = await S3Function.signedGetObjectUrl(srcPath);
        await S3Model.getObjectBySignedUrl(url, destPath);
        return res.json(new SuccessResponse());
    } catch (error) {
        console.log(error);
        return res.json(new ErrorResponse(error.message, STATUS_CODE.S3_ERROR));
    }
};


const signedPutObjectUrl = async (req, res, next) => {
    try {
        const {objectPath, expiresIn} = req.query;
        const url = await S3Function.signedPutObjectUrl(objectPath, expiresIn);
        return res.json(new SuccessResponse(url));
    } catch (error) {
        console.log(error);
        return res.json(new ErrorResponse(error.message, STATUS_CODE.S3_ERROR));
    }
};


const putObject = async (req, res, next) => {
    try {
        const {srcPath, destPath} = req.query;
        await S3Model.putObject(srcPath, destPath);
        return res.json(new SuccessResponse());
    } catch (error) {
        console.log(error);
        return res.json(new ErrorResponse(error.message, STATUS_CODE.S3_ERROR));
    }
};


const putObjectBySignedUrl = async (req, res, next) => {
    try {
        const {srcPath, destPath} = req.query;
        const url = await S3Function.signedPutObjectUrl(destPath);
        await S3Model.putObjectBySignedUrl(url, srcPath);
        return res.json(new SuccessResponse());
    } catch (error) {
        console.log(error);
        return res.json(new ErrorResponse(error.message, STATUS_CODE.S3_ERROR));
    }
};


const signedDeleteObjectUrl = async (req, res, next) => {
    try {
        const {objectPath, expiresIn} = req.query;
        const url = await S3Function.signedDeleteObjectUrl(objectPath, expiresIn);
        return res.json(new SuccessResponse(url));
    } catch (error) {
        console.log(error);
        return res.json(new ErrorResponse(error.message, STATUS_CODE.S3_ERROR));
    }
};


const deleteObject = async (req, res, next) => {
    try {
        const {objectPath} = req.query;
        await S3Model.deleteObject(objectPath);
        return res.json(new SuccessResponse());
    } catch (error) {
        console.log(error);
        return res.json(new ErrorResponse(error.message, STATUS_CODE.S3_ERROR));
    }
};


const deleteObjectBySignedUrl = async (req, res, next) => {
    try {
        const {objectPath} = req.query;
        const url = await S3Function.signedDeleteObjectUrl(objectPath);
        await S3Model.deleteObjectBySignedUrl(url);
        return res.json(new SuccessResponse());
    } catch (error) {
        console.log(error);
        return res.json(new ErrorResponse(error.message, STATUS_CODE.S3_ERROR));
    }
};


module.exports = {
    signedGetObjectUrl,
    getObject,
    getObjectBySignedUrl,
    signedPutObjectUrl,
    putObject,
    putObjectBySignedUrl,
    signedDeleteObjectUrl,
    deleteObject,
    deleteObjectBySignedUrl
};