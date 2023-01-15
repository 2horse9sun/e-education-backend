const {poolQuery} = require('../databases/MySQLFunction');


const checkUserAccessToLesson = async (userId, lessonId) => {
    const statement = `
    SELECT * FROM lesson
    JOIN section
    ON lesson.section_id = section.id
    JOIN course
    ON section.course_id = course.id
    JOIN enrollment
    ON enrollment.course_id = course.id
    WHERE enrollment.user_id = ? AND lesson.id = ?
    `;
    const params = [userId, lessonId];
    const result = await poolQuery(statement, params);
    return result;
};


module.exports = {
    checkUserAccessToLesson
};