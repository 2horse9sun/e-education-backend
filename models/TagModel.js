const {connectionQuery, poolQuery, promisePool} = require('../databases/MySQLFunction');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');


const getAllTags = async () => {
    const statement = `
    SELECT * FROM tag
    `;
    const result = await poolQuery(statement);
    return result;
};


const addTag = async (tagName) => {
    let connection;
    let statement;
    let params;
    let result;

    try {
        connection = await promisePool.getConnection();
        await connection.beginTransaction();
    
        statement = `
        SELECT id FROM tag
        WHERE
        name = ?
        `;
        params = [tagName];
        const tags = await connectionQuery(connection, statement, params);
        if(tags.length > 0){
            return new ErrorResponse("Duplicate tag name", STATUS_CODE.DB_DUPLICATE_KEY);
        }
    
        statement = `
        INSERT INTO tag(name)
        VALUES(?)
        `;
        params = [tagName];
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


const updateTagById = async (tagId, tagName) => {
    const statement = `
    UPDATE tag
    SET name = ?
    WHERE id = ?
    `;
    const params = [tagName, tagId];
    const result = await poolQuery(statement, params);
    return result;
};


const deleteTagById = async (tagId) => {
    const statement = `
    DELETE FROM tag
    WHERE id = ?
    `;
    const params = [tagId];
    const result = await poolQuery(statement, params);
    return result;
};

module.exports = {
    getAllTags,
    addTag,
    updateTagById,
    deleteTagById
};