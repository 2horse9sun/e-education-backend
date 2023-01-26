const {connectionQuery, poolQuery, promisePool} = require('../databases/MySQLFunction');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');


const getTopMentorList = async (offset, limit) => {
    let statement = `
    SELECT id, avatar_url, nickname, first_name, last_name, gender FROM user
    WHERE role = 'mentor'
    `;

    let params = [];

    statement += " LIMIT ?, ?";
    params.push(offset);
    params.push(limit);
    
    const result = await poolQuery(statement, params);
    return result;
};


const getPopularCourseList = async (userId, offset, limit, tagNameContains, orderByRating, orderByEnrollmentCount, orderByCurrentPrice) => {
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
    }else if(orderByEnrollmentCount === "DESC"){
        statement += " ORDER BY enrollment_count DESC";
    }else if(orderByEnrollmentCount === "ASC"){
        statement += " ORDER BY enrollment_count ASC";
    }else if(orderByCurrentPrice === "DESC"){
        statement += " ORDER BY course_current_price DESC";
    }else if(orderByCurrentPrice === "ASC"){
        statement += " ORDER BY course_current_price ASC";
    } else {
        statement += " ORDER BY course_name";
    }

    statement += " LIMIT ?, ?";
    params.push(offset);
    params.push(limit);
    
    const result = await poolQuery(statement, params);
    return result;
};

module.exports = {
    getTopMentorList,
    getPopularCourseList
};