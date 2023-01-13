const TagModel = require('../models/TagModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getAllTags = async (req, res, next) => {
    const allTagsRes = await TagModel.getAllTags();
    return res.json(allTagsRes);
};


const putTag = async (req, res, next) => {
    const {name} = req.body;
    const putTagRes = await TagModel.putTag(name);
    return res.json(putTagRes);
};


const updateTagByName = async (req, res, next) => {
    const {oldTagName, newTagName} = req.body;
    const updateTagByNameRes = await TagModel.updateTagByName(oldTagName, newTagName);
    return res.json(updateTagByNameRes);
};


const deleteTagByName = async (req, res, next) => {
    const {name} = req.body;
    const deleteTagRes = await TagModel.deleteTagByName(name);
    return res.json(deleteTagRes);
};

module.exports = {
    getAllTags,
    putTag,
    updateTagByName,
    deleteTagByName
};