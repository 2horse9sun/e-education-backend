const SectionModel = require('../models/SectionModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getAllSectionsByCourseId = async (req, res, next) => {
    const {courseId} = req.query;
    const result = await SectionModel.getAllSectionsByCourseId(courseId);
    return res.json(result);
};


const addSectionByCourseId = async (req, res, next) => {
    const {courseId, sectionName, sectionPriority} = req.body;
    const result = await SectionModel.addSectionByCourseId(courseId, sectionName, sectionPriority);
    return res.json(result);
};


const updateSectionById = async (req, res, next) => {
    const {sectionId, courseId, sectionName, sectionPriority} = req.body;
    const result = await SectionModel.updateSectionById(sectionId, courseId, sectionName, sectionPriority);
    return res.json(result);
};


const deleteSectionById = async (req, res, next) => {
    const {sectionId} = req.query;
    const result = await SectionModel.deleteSectionById(sectionId);
    return res.json(result);
};

module.exports = {
    getAllSectionsByCourseId,
    addSectionByCourseId,
    updateSectionById,
    deleteSectionById
};