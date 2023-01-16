const TagModel = require('../models/TagModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getAllTags = async (req, res, next) => {
    const result = await TagModel.getAllTags();
    return res.json(result);
};


const putTag = async (req, res, next) => {
    const {name} = req.body;
    const result = await TagModel.putTag(name);
    return res.json(result);
};


const updateTagByName = async (req, res, next) => {
    const {oldTagName, newTagName} = req.body;
    const result = await TagModel.updateTagByName(oldTagName, newTagName);
    return res.json(result);
};


const deleteTagByName = async (req, res, next) => {
    const {name} = req.body;
    const result = await TagModel.deleteTagByName(name);
    return res.json(result);
};

module.exports = {
    getAllTags,
    putTag,
    updateTagByName,
    deleteTagByName
};