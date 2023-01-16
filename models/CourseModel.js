const {poolQuery} = require('../databases/MySQLFunction');


const getCourseList = async (userId, offset, limit, tagNameContains, orderByRating, orderByEnrollmentCount, orderByCurrentPrice) => {
    let statement = `
    SELECT 
    course.id AS course_id,
    course.thumbnail_url AS course_thumbnail_url,
    course.original_price AS course_original_price,
    course.current_price AS course_current_price,
    course.name AS course_name,
    IFNULL(course_rating.course_avg_rating, 0) AS course_avg_rating,
    IFNULL(course_enrollment_count.count, 0) AS enrollment_count,
    IFNULL(course_user_bookmarked.user_bookmarked, false) AS user_bookmarked,
    course_tags.course_tag_array AS course_tag_array
    FROM course
    LEFT OUTER JOIN 
    (
        SELECT course.id AS course_id, AVG(rating) AS course_avg_rating FROM review
        JOIN course
        ON review.course_id = course.id
        GROUP BY course.id
    ) AS course_rating
    ON course_rating.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, COUNT(*) AS count FROM enrollment
        JOIN course
        ON course.id = enrollment.course_id
        GROUP BY course.id
    ) AS course_enrollment_count
    ON course_enrollment_count.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, true AS user_bookmarked FROM bookmark
        JOIN course
        ON course.id = bookmark.course_id
        WHERE bookmark.user_id = ?
    ) AS course_user_bookmarked
    ON course_user_bookmarked.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, GROUP_CONCAT(tag.name SEPARATOR ',') AS course_tag_array FROM course
        JOIN course_tag
        ON course_tag.course_id = course.id
        JOIN tag
        ON tag.id = course_tag.tag_id
        GROUP BY course.id
    ) AS course_tags
    ON course_tags.course_id = course.id
    WHERE 1 = 1
    `;

    let params = [userId];
    
    if(tagNameContains !== undefined && tagNameContains !== "undefined"){
        statement += " AND course_tag_array LIKE CONCAT('%', ?, '%')";
        params.push(tagNameContains);
    }
    if(orderByRating === "DESC"){
        statement += " ORDER BY course_avg_rating DESC";
    }else if(orderByRating === "ASC"){
        statement += " ORDER BY course_avg_rating ASC";
    }else if(orderByCurrentPrice === "DESC"){
        statement += " ORDER BY course_avg_rating DESC";
    }else if(orderByCurrentPrice === "ASC"){
        statement += " ORDER BY course_avg_rating ASC";
    } else {
        statement += " ORDER BY course_name";
    }

    statement += " LIMIT ?, ?";
    params.push(offset);
    params.push(limit);
    
    const result = await poolQuery(statement, params);
    return result;
};


const getMyCourseList = async (userId, offset, limit) => {
    let statement = `
    SELECT 
    course.id AS course_id,
    course.thumbnail_url AS course_thumbnail_url,
    course.name AS course_name,
    course.duration AS course_duration,
    IFNULL(course_finished_lesson.finished_lesson_count, 0) AS finished_lesson_count,
    IFNULL(course_lessons.lesson_count, 0) AS lesson_count
    FROM enrollment
    LEFT OUTER JOIN course
    ON course.id = enrollment.course_id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, COUNT(*) AS finished_lesson_count FROM enrollment
        LEFT OUTER JOIN course
        ON course.id = enrollment.course_id
        LEFT OUTER JOIN section
        ON section.course_id = course.id
        LEFT OUTER JOIN lesson
        ON lesson.section_id = section.id
        LEFT OUTER JOIN lesson_progress
        ON lesson_progress.lesson_id = lesson.id
        WHERE enrollment.user_id = ? AND lesson_progress.user_id = ? AND lesson_progress.progress = 100
        GROUP BY course.id
    ) AS course_finished_lesson
    ON course_finished_lesson.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, COUNT(*) AS lesson_count FROM enrollment
        LEFT OUTER JOIN course
        ON course.id = enrollment.course_id
        LEFT OUTER JOIN section
        ON section.course_id = course.id
        LEFT OUTER JOIN lesson
        ON lesson.section_id = section.id
        GROUP BY course.id
    ) AS course_lessons
    ON course_lessons.course_id = course.id
    WHERE enrollment.user_id = ?
    `;

    let params = [userId, userId, userId];

    statement += " LIMIT ?, ?";
    params.push(offset);
    params.push(limit);
    
    const result = await poolQuery(statement, params);
    return result;
};


const getCourseDetailById = async (courseId, userId) => {
    let statement = `
    SELECT 
    course.id AS course_id,
    course.thumbnail_url AS course_thumbnail_url,
    course.original_price AS course_original_price,
    course.current_price AS course_current_price,
    course.name AS course_name,
    course.description AS course_description,
    course.duration AS course_duration,
    IFNULL(course_rating.course_avg_rating, 0) AS course_avg_rating,
    IFNULL(course_enrollment_count.count, 0) AS enrollment_count,
    IFNULL(course_user_bookmarked.user_bookmarked, false) AS user_bookmarked,
    course_tags.course_tag_array AS course_tag_array,
    (
        SELECT COUNT(*) FROM course
        JOIN review
        ON review.course_id = course.id
        WHERE course.id = ?
    ) AS review_count
    FROM course
    LEFT OUTER JOIN 
    (
        SELECT course.id AS course_id, AVG(rating) AS course_avg_rating FROM review
        JOIN course
        ON review.course_id = course.id
        WHERE course.id = ?
    ) AS course_rating
    ON course_rating.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, COUNT(*) AS count FROM enrollment
        JOIN course
        ON course.id = enrollment.course_id
        WHERE course.id = ?
    ) AS course_enrollment_count
    ON course_enrollment_count.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, true AS user_bookmarked FROM bookmark
        JOIN course
        ON course.id = bookmark.course_id
        WHERE course.id = ? AND bookmark.user_id = ? 
    ) AS course_user_bookmarked
    ON course_user_bookmarked.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, GROUP_CONCAT(tag.name SEPARATOR ',') AS course_tag_array FROM course
        JOIN course_tag
        ON course_tag.course_id = course.id
        JOIN tag
        ON tag.id = course_tag.tag_id
        WHERE course.id = ?
    ) AS course_tags
    ON course_tags.course_id = course.id
    WHERE course.id = ?
    `;

    let params = [courseId, courseId, courseId, courseId, userId, courseId, courseId];    
    const result = await poolQuery(statement, params);
    return result;
};


const getCourseListByMentorId = async (mentorId, userId, offset, limit) => {
    let statement = `
    SELECT 
    course.id AS course_id,
    course.thumbnail_url AS course_thumbnail_url,
    course.original_price AS course_original_price,
    course.current_price AS course_current_price,
    course.name AS course_name,
    IFNULL(course_rating.course_avg_rating, 0) AS course_avg_rating,
    IFNULL(course_enrollment_count.count, 0) AS enrollment_count,
    IFNULL(course_user_bookmarked.user_bookmarked, false) AS user_bookmarked,
    course_tags.course_tag_array AS course_tag_array
    FROM course
    LEFT OUTER JOIN teach
    ON teach.course_id = course.id
    LEFT OUTER JOIN user
    ON user.id = teach.user_id
    LEFT OUTER JOIN 
    (
        SELECT course.id AS course_id, AVG(rating) AS course_avg_rating FROM review
        JOIN course
        ON review.course_id = course.id
        GROUP BY course.id
    ) AS course_rating
    ON course_rating.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, COUNT(*) AS count FROM enrollment
        JOIN course
        ON course.id = enrollment.course_id
        GROUP BY course.id
    ) AS course_enrollment_count
    ON course_enrollment_count.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, true AS user_bookmarked FROM bookmark
        JOIN course
        ON course.id = bookmark.course_id
        WHERE bookmark.user_id = ?
    ) AS course_user_bookmarked
    ON course_user_bookmarked.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT course.id AS course_id, GROUP_CONCAT(tag.name SEPARATOR ',') AS course_tag_array FROM course
        JOIN course_tag
        ON course_tag.course_id = course.id
        JOIN tag
        ON tag.id = course_tag.tag_id
        GROUP BY course.id
    ) AS course_tags
    ON course_tags.course_id = course.id
    WHERE teach.user_id = ?
    `;

    let params = [userId, mentorId];

    statement += " LIMIT ?, ?";
    params.push(offset);
    params.push(limit);
    
    const result = await poolQuery(statement, params);
    return result;
};


const addCourse = async (courseName, originalPrice, currentPrice, courseDescription, thumbnailUrl, duration) => {
    const statement = `
    INSERT INTO course(name, original_price, current_price, description, thumbnail_url, duration)
    VALUES(?, ?, ?, ?, ?, ?)
    `;
    const params = [courseName, originalPrice, currentPrice, courseDescription, thumbnailUrl, duration];
    const result = await poolQuery(statement, params);
    return result;
};


const updateCourseById = async (courseId, courseName, originalPrice, currentPrice, courseDescription, thumbnailUrl, duration) => {
    const statement = `
    UPDATE course
    SET name = ?, original_price = ?, current_price = ?, description = ?, thumbnail_url = ?, duration = ?
    WHERE course.id = ?
    `;
    const params = [courseName, originalPrice, currentPrice, courseDescription, thumbnailUrl, duration, courseId];
    const result = await poolQuery(statement, params);
    return result;
};


const deleteCourseById = async (courseId) => {
    const statement = `
    DELETE FROM course
    WHERE course.id = ?
    `;
    const params = [courseId];
    const result = await poolQuery(statement, params);
    return result;
};


module.exports = {
    getCourseList,
    getMyCourseList,
    getCourseDetailById,
    getCourseListByMentorId,
    addCourse,
    updateCourseById,
    deleteCourseById
};