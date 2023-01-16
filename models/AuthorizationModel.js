const {poolQuery} = require('../databases/MySQLFunction');


const checkUserAccessToCourse = async (userId, courseId) => {
    const statement = `
    SELECT * FROM enrollment
    WHERE enrollment.user_id = ? AND enrollment.course_id = ?
    `;
    const params = [userId, courseId];
    const result = await poolQuery(statement, params);
    return result;
};


const checkUserAccessToLesson = async (userId, lessonId) => {
    const statement = `
    SELECT * FROM lesson
    JOIN section
    ON lesson.section_id = section.id
    JOIN enrollment
    ON enrollment.course_id = section.course_id
    WHERE enrollment.user_id = ? AND lesson.id = ?
    `;
    const params = [userId, lessonId];
    const result = await poolQuery(statement, params);
    return result;
};


module.exports = {
    checkUserAccessToCourse,
    checkUserAccessToLesson
};