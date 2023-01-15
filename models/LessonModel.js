const {poolQuery} = require('../databases/MySQLFunction');


const getAllLessonsByCourseId = async (courseId) => {
    const statement = `
    SELECT lesson.*, section.id AS section_id, section.name AS section_name FROM course
    LEFT OUTER JOIN section
    ON section.course_id = course.id
    LEFT OUTER JOIN lesson
    ON lesson.section_id = section.id
    WHERE course.id = ?
    `;
    const params = [courseId];
    const result = await poolQuery(statement, params);
    return result;
};


const getAllMyLessonsByCourseId = async (courseId, userId) => {
    const statement = `
    SELECT lesson.*, section.id AS section_id, section.name AS section_name, lesson_progress.progress AS lesson_progress FROM course
    LEFT OUTER JOIN section
    ON section.course_id = course.id
    LEFT OUTER JOIN lesson
    ON lesson.section_id = section.id
    LEFT OUTER JOIN lesson_progress
    ON lesson_progress.user_id = ? AND lesson_progress.lesson_id = lesson.id
    WHERE course.id = ?
    `;
    const params = [userId, courseId];
    const result = await poolQuery(statement, params);
    return result;
};


const getLessonDetailById = async (lessonId) => {
    const statement = `
    SELECT lesson.*, lesson_file.name AS file_name, lesson_file.type AS file_type, lesson_file.size AS file_size FROM lesson
    LEFT OUTER JOIN lesson_file
    ON lesson_file.lesson_id = lesson.id
    WHERE lesson.id = ?
    `;
    const params = [lessonId];
    const result = await poolQuery(statement, params);
    return result;
};


const getMyLessonDetailById = async (lessonId, userId) => {
    const statement = `
    SELECT lesson.*, lesson_file.name AS file_name, lesson_file.type AS file_type, 
    lesson_file.size AS file_size, lesson_progress.progress AS lesson_progress FROM lesson
    LEFT OUTER JOIN lesson_file
    ON lesson_file.lesson_id = lesson.id
    LEFT OUTER JOIN lesson_progress
    ON lesson_progress.user_id = ? AND lesson_progress.lesson_id = lesson.id
    WHERE lesson.id = ?
    `;
    const params = [userId, lessonId];
    const result = await poolQuery(statement, params);
    return result;
};


const addLessonBySectionId = async (sectionId, lessonName, lessonPriority, lessonDuration, lessonType) => {
    const statement = `
    INSERT INTO lesson(section_id, name, priority, duration, type)
    VALUES(?, ?, ?, ?, ?)
    `;
    const params = [sectionId, lessonName, lessonPriority, lessonDuration, lessonType];
    const result = await poolQuery(statement, params);
    return result;
};


const addLessonFileByLessonId = async (lessonId, fileName, fileType, fileSize) => {
    const statement = `
    INSERT INTO lesson_file(lesson_id, name, type, size)
    VALUES(?, ?, ?, ?)
    `;
    const params = [lessonId, fileName, fileType, fileSize];
    const result = await poolQuery(statement, params);
    return result;
};


const updateLessonById = async (lessonId, lessonName, lessonPriority, lessonDuration, lessonType) => {
    const statement = `
    UPDATE lesson
    SET name = ?, priority = ?, duration = ?, type = ?
    WHERE id = ?
    `;
    const params = [lessonName, lessonPriority, lessonDuration, lessonType, lessonId];
    const result = await poolQuery(statement, params);
    return result;
};


const updateLessonFileById = async (lessonFileId, fileName, fileType, fileSize) => {
    const statement = `
    UPDATE lesson_file
    SET name = ?, type = ?, size = ?
    WHERE id = ?
    `;
    const params = [fileName, fileType, fileSize, lessonFileId];
    const result = await poolQuery(statement, params);
    return result;
};


const deleteLessonById = async (lessonId) => {
    const statement = `
    DELETE FROM lesson
    WHERE id=?
    `;
    const params = [lessonId];
    const result = await poolQuery(statement, params);
    return result;
};


const deleteLessonFileById = async (lessonFileId) => {
    const statement = `
    DELETE FROM lesson_file
    WHERE id=?
    `;
    const params = [lessonFileId];
    const result = await poolQuery(statement, params);
    return result;
};


module.exports = {
    getAllLessonsByCourseId,
    getAllMyLessonsByCourseId,
    getLessonDetailById,
    getMyLessonDetailById,
    addLessonBySectionId,
    addLessonFileByLessonId,
    updateLessonById,
    updateLessonFileById,
    deleteLessonById,
    deleteLessonFileById
};