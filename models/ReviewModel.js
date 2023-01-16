const {poolQuery} = require('../databases/MySQLFunction');


const getReviewListByCourseId = async (courseId, userId, offset, limit, ratingEqualTo, orderByRating) => {
    let statement = `
    SELECT 
    user.id AS reviewer_id,
    user.nickname AS reviewer_nickname,
    user.avatar_url AS reviewer_avatar_url,
    review.id AS review_id,
    review.content AS review_content,
    review.rating AS review_rating,
    review.update_time AS review_update_time,
    IFNULL(review_like_count.like_count, 0) AS like_count,
    IFNULL(user_liked_review.is_liked, false) AS user_liked
    FROM course
    LEFT OUTER JOIN review
    ON review.course_id = course.id
    LEFT OUTER JOIN user
    ON user.id = review.user_id
    LEFT OUTER JOIN
    (
        SELECT review.id AS review_id, COUNT(*) AS like_count FROM review
        JOIN like_review
        ON like_review.review_id = review.id
    ) AS review_like_count
    ON review_like_count.review_id = review.id
    LEFT OUTER JOIN
    (
        SELECT like_review.user_id AS liked_user_id, like_review.review_id AS user_liked_review_id, true AS is_liked FROM like_review
        WHERE like_review.user_id = ?
    ) AS user_liked_review
    ON user_liked_review.user_liked_review_id = review.id
    WHERE course.id = ?
    `;

    let params = [userId, courseId];
    

    if(ratingEqualTo !== undefined && ratingEqualTo !== "undefined"){
        statement += " AND rating = ?";
        params.push(ratingEqualTo);
    }
    if(orderByRating === "DESC"){
        statement += " ORDER BY rating DESC";
    }else if(orderByRating === "ASC"){
        statement += " ORDER BY rating ASC";
    } else {
        statement += " ORDER BY review.update_time DESC";
    }

    statement += " LIMIT ?, ?";
    params.push(offset);
    params.push(limit);
    
    const result = await poolQuery(statement, params);
    return result;
};


const getReviewListByMentorId = async (mentorId, userId, offset, limit, ratingEqualTo, orderByRating) => {
    let statement = `
    SELECT 
    course.id AS course_id,
    course.name AS course_name,
    user.id AS reviewer_id,
    user.nickname AS reviewer_nickname,
    user.avatar_url AS reviewer_avatar_url,
    review.id AS review_id,
    review.content AS review_content,
    review.rating AS review_rating,
    review.update_time AS review_update_time,
    IFNULL(review_like_count.like_count, 0) AS like_count,
    IFNULL(user_liked_review.is_liked, false) AS user_liked
    FROM teach
    LEFT OUTER JOIN course
    ON teach.course_id = course.id
    LEFT OUTER JOIN review
    ON review.course_id = course.id
    LEFT OUTER JOIN user
    ON user.id = review.user_id
    LEFT OUTER JOIN
    (
        SELECT review.id AS review_id, COUNT(*) AS like_count FROM review
        JOIN like_review
        ON like_review.review_id = review.id
    ) AS review_like_count
    ON review_like_count.review_id = review.id
    LEFT OUTER JOIN
    (
        SELECT like_review.user_id AS liked_user_id, like_review.review_id AS user_liked_review_id, true AS is_liked FROM like_review
        WHERE like_review.user_id = ?
    ) AS user_liked_review
    ON user_liked_review.user_liked_review_id = review.id
    WHERE teach.user_id = ? 
    `;

    let params = [userId, mentorId];
    

    if(ratingEqualTo !== undefined && ratingEqualTo !== "undefined"){
        statement += " AND rating = ?";
        params.push(ratingEqualTo);
    }
    if(orderByRating === "DESC"){
        statement += " ORDER BY rating DESC";
    }else if(orderByRating === "ASC"){
        statement += " ORDER BY rating ASC";
    } else {
        statement += " ORDER BY review.update_time DESC";
    }

    statement += " LIMIT ?, ?";
    params.push(offset);
    params.push(limit);
    
    const result = await poolQuery(statement, params);
    return result;
};


const getMyReviewList = async (userId, offset, limit, ratingEqualTo, orderByRating) => {
    let statement = `
    SELECT 
    course.id AS course_id,
    course.name AS course_name,
    review.id AS review_id,
    review.content AS review_content,
    review.rating AS review_rating,
    review.update_time AS review_update_time,
    IFNULL(review_like_count.like_count, 0) AS like_count,
    IFNULL(user_liked_review.is_liked, false) AS user_liked
    FROM review
    LEFT OUTER JOIN course
    ON review.course_id = course.id
    LEFT OUTER JOIN
    (
        SELECT review.id AS review_id, COUNT(*) AS like_count FROM review
        JOIN like_review
        ON like_review.review_id = review.id
        WHERE review.user_id = ? 
    ) AS review_like_count
    ON review_like_count.review_id = review.id
    LEFT OUTER JOIN
    (
        SELECT like_review.user_id AS liked_user_id, like_review.review_id AS user_liked_review_id, true AS is_liked FROM like_review
        WHERE like_review.user_id = ?
    ) AS user_liked_review
    ON user_liked_review.user_liked_review_id = review.id
    WHERE review.user_id = ? 
    `;

    let params = [userId, userId, userId];
    

    if(ratingEqualTo !== undefined && ratingEqualTo !== "undefined"){
        statement += " AND rating = ?";
        params.push(ratingEqualTo);
    }
    if(orderByRating === "DESC"){
        statement += " ORDER BY rating DESC";
    }else if(orderByRating === "ASC"){
        statement += " ORDER BY rating ASC";
    } else {
        statement += " ORDER BY review.update_time DESC";
    }

    statement += " LIMIT ?, ?";
    params.push(offset);
    params.push(limit);
    
    const result = await poolQuery(statement, params);
    return result;
};


const addMyReviewByCourseId = async (userId, courseId, content, rating) => {
    const statement = `
    INSERT INTO review(user_id, course_id, content, rating)
    VALUES(?, ?, ?, ?)
    `;
    const params = [userId, courseId, content, rating];
    const result = await poolQuery(statement, params);
    return result;
};


const updateMyReviewById = async (reviewId, content, rating) => {
    const statement = `
    UPDATE review
    SET content = ?, rating = ?
    WHERE id = ?
    `;
    const params = [content, rating, reviewId];
    const result = await poolQuery(statement, params);
    return result;
};


const likeReviewById = async (userId, reviewId) => {
    const statement = `
    REPLACE INTO like_review(user_id, review_id)
    VALUES(?, ?)
    `;
    const params = [userId, reviewId];
    const result = await poolQuery(statement, params);
    return result;
};


const cancelLikeReviewById = async (userId, reviewId) => {
    const statement = `
    DELETE FROM like_review
    WHERE user_id = ? AND review_id = ?
    `;
    const params = [userId, reviewId];
    const result = await poolQuery(statement, params);
    return result;
};


const deleteMyReviewById = async (reviewId) => {
    const statement = `
    DELETE FROM review
    WHERE id = ?
    `;
    const params = [reviewId];
    const result = await poolQuery(statement, params);
    return result;
};



module.exports = {
    getReviewListByCourseId,
    getReviewListByMentorId,
    getMyReviewList,
    addMyReviewByCourseId,
    updateMyReviewById,
    likeReviewById,
    cancelLikeReviewById,
    deleteMyReviewById
};