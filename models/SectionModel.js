const {poolQuery} = require('../databases/MySQLFunction');


const getAllSectionsByCourseId = async (courseId) => {
    const statement = `
    SELECT * FROM section
    WHERE section.course_id = ?
    `;
    const params = [courseId];
    const result = await poolQuery(statement, params);
    return result;
};


const addSectionByCourseId = async (courseId, sectionName, sectionPriority) => {
    const statement = `
    INSERT INTO section(course_id, name, priority)
    VALUES(?, ?, ?)
    `;
    const params = [courseId, sectionName, sectionPriority];
    const result = await poolQuery(statement, params);
    return result;
};


const updateSectionById = async (sectionId, courseId, sectionName, sectionPriority) => {
    const statement = `
    UPDATE section
    SET course_id = ?, name = ?, priority = ?
    WHERE id = ?
    `;
    const params = [courseId, sectionName, sectionPriority, sectionId];
    const result = await poolQuery(statement, params);
    return result;
};


const deleteSectionById = async (sectionId) => {
    const statement = `
    DELETE FROM section
    WHERE id = ?
    `;
    const params = [sectionId];
    const result = await poolQuery(statement, params);
    return result;
};

module.exports = {
    getAllSectionsByCourseId,
    addSectionByCourseId,
    updateSectionById,
    deleteSectionById
};