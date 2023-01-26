const {connectionQuery, poolQuery, promisePool} = require('../databases/MySQLFunction');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');


const enrollCourse = async (userId, courseId) => {
    let connection;
    let statement;
    let params;
    let result;

    try {
        connection = await promisePool.getConnection();
        await connection.beginTransaction();
    
        statement = `
        SELECT user_id FROM enrollment
        WHERE
        user_id = ? AND course_id = ?
        `;
        params = [userId, courseId];
        const enrollments = await connectionQuery(connection, statement, params);
        if(enrollments.length > 0){
            return new ErrorResponse("Duplicate userId and courseId", STATUS_CODE.DB_DUPLICATE_KEY);
        }
    
        statement = `
        INSERT INTO enrollment(user_id, course_id)
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


const dropCourse = async (userId, courseId) => {
    const statement = `
    DELETE FROM enrollment
    WHERE
    user_id = ? AND course_id = ?
    `;
    const params = [userId, courseId];
    const result = await poolQuery(statement, params);
    return result;
};

module.exports = {
    enrollCourse,
    dropCourse
};