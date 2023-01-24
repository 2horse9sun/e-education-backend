const {connectionQuery, poolQuery, promisePool} = require('../databases/MySQLFunction');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');


const getMyBookmarkList = async (userId, tagIds) => {
    let statement = `
    SELECT 
    course.id AS course_id,
    course.thumbnail_url AS course_thumbnail_url,
    course.original_price AS course_original_price,
    course.current_price AS course_current_price,
    course.name AS course_name,
    IFNULL(course_rating.course_avg_rating, 0) AS course_avg_rating,
    IFNULL(course_enrollment_count.count, 0) AS enrollment_count,
    course_tags.course_tag_array AS course_tag_array
    FROM course
    RIGHT JOIN 
    (
        SELECT course_id FROM bookmark
        WHERE bookmark.user_id = ?
    ) AS bookmark
    ON bookmark.course_id = course.id
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
        SELECT course.id AS course_id, GROUP_CONCAT(tag.name SEPARATOR ',') AS course_tag_array FROM course
        JOIN course_tag
        ON course_tag.course_id = course.id
        JOIN tag
        ON tag.id = course_tag.tag_id
    `;

    const params = [userId];

    if(tagIds !== undefined && tagIds !== "undefined"){
        statement += "WHERE tag.id in (?)";
        params.push(tagIds);
    }

    statement += `
        GROUP BY course.id
    ) AS course_tags
    ON course_tags.course_id = course.id
    `;

    const result = await poolQuery(statement, params);
    return result;
};


const addMyBookmark = async (userId, courseId) => {
    let connection;
    let statement;
    let params;
    let result;

    try {
        connection = await promisePool.getConnection();
        await connection.beginTransaction();
    
        statement = `
        SELECT user_id FROM bookmark
        WHERE
        user_id = ? AND course_id = ?
        `;
        params = [userId, courseId];
        const bookmarks = await connectionQuery(connection, statement, params);
        if(bookmarks.length > 0){
            return new ErrorResponse("Duplicate userId and courseId", STATUS_CODE.DB_DUPLICATE_KEY);
        }
    
        statement = `
        INSERT INTO bookmark(user_id, course_id)
        VALUES(?, ?)
        `;
        
        result = await connectionQuery(connection, statement, params);

        await connection.commit();
    } catch (error) {
        console.log(error);
        // await connection.rollback();
        return new ErrorResponse(error.toString(), STATUS_CODE.DB_ERROR);
    } finally {
        await connection.release();
    }

    return new SuccessResponse(result);
};


const deleteMyBookmark = async (userId, courseId) => {
    const statement = `
    DELETE FROM bookmark
    WHERE
    user_id = ? AND course_id = ?
    `;
    const params = [userId, courseId];
    const result = await poolQuery(statement, params);
    return result;
};

module.exports = {
    getMyBookmarkList,
    addMyBookmark,
    deleteMyBookmark
};