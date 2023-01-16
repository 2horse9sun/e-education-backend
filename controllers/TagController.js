const TagModel = require('../models/TagModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getAllTags = async (req, res, next) => {
    const result = await TagModel.getAllTags();
    return res.json(result);
};


const addTag = async (req, res, next) => {
    const {tagName} = req.body;
    const result = await TagModel.addTag(tagName);
    return res.json(result);
};


const updateTagById = async (req, res, next) => {
    const {tagId, tagName} = req.body;
    const result = await TagModel.updateTagById(tagId, tagName);
    return res.json(result);
};


const deleteTagById = async (req, res, next) => {
    const {tagId} = req.query;
    const result = await TagModel.deleteTagById(tagId);
    return res.json(result);
};

module.exports = {
    getAllTags,
    addTag,
    updateTagById,
    deleteTagById
};