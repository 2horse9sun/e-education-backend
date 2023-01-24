const {connectionQuery, poolQuery, promisePool} = require('../databases/MySQLFunction');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');


const getUserAccountInfoByEmail = async (email) => {
    const statement = `
    SELECT id, email, salt, password FROM user
    WHERE 
    email = ?
    `;
    const params = [email];
    const result = await poolQuery(statement, params);
    return result;
};


const getUserAccountInfoById = async (userId) => {
    const statement = `
    SELECT id, email, salt, password FROM user
    WHERE 
    id = ?
    `;
    const params = [userId];
    const result = await poolQuery(statement, params);
    return result;
};


const getUserProfileInfoById = async (userId) => {
    const statement = `
    SELECT id, email, first_name, last_name, nickname, avatar_url, date_of_birth, phone_number, gender FROM user
    WHERE
    id = ?
    `;
    const params = [userId];
    const result = await poolQuery(statement, params);
    return result;
};


const getMentorList = async (offset, limit) => {
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


const getMentorProfileInfoById = async (mentorId) => {
    const statement = `
    SELECT id, email, first_name, last_name, nickname, avatar_url, date_of_birth, phone_number, gender FROM user
    WHERE
    id = ? AND role = 'mentor'
    `;
    const params = [mentorId];
    const result = await poolQuery(statement, params);
    return result;
};


const getStudentListByMentorId = async (mentorId, offset, limit) => {
    let statement = `
    SELECT 
    DISTINCT student.id AS student_id, 
    student.nickname AS student_nickname,
    student.avatar_url AS student_avatar_url,
    student.first_name AS student_first_name,
    student.last_name AS student_last_name
    FROM user AS mentor
    LEFT OUTER JOIN teach
    ON teach.user_id = mentor.id
    LEFT OUTER JOIN enrollment
    ON enrollment.course_id = teach.course_id
    LEFT OUTER JOIN user AS student
    ON student.id = enrollment.user_id
    WHERE
    mentor.role = 'mentor' AND student.role = 'student' AND mentor.id = ?
    `;
    let params = [mentorId];

    statement += " LIMIT ?, ?";
    params.push(offset);
    params.push(limit);

    const result = await poolQuery(statement, params);
    return result;
};


const updateUserProfileInfoById = async (userId, firstName, lastName, nickname, dateOfBirth, phoneNumber, gender) => {
    const statement = `
    UPDATE user
    SET first_name = ?, last_name = ?, nickname = ?, date_of_birth = ?, phone_number = ?, gender = ?
    WHERE
    id = ?
    `;
    const params = [firstName, lastName, nickname, dateOfBirth, phoneNumber, gender, userId];
    const result = await poolQuery(statement, params);
    return result;
};


const updateUserAvatarById = async (userId, avatarUrl) => {
    const statement = `
    UPDATE user
    SET avatar_url = ?
    WHERE
    id = ?
    `;
    const params = [avatarUrl, userId];
    const result = await poolQuery(statement, params);
    return result;
};


const updateMyPassword = async (userId, salt, password) => {
    const statement = `
    UPDATE user
    SET salt = ?, password = ?
    WHERE
    id = ?
    `;
    const params = [salt, password, userId];
    const result = await poolQuery(statement, params);
    return result;
};


const userRegister = async (email, salt, password) => {
    let connection;
    let statement;
    let params;
    let result;

    try {
        connection = await promisePool.getConnection();
        await connection.beginTransaction();
    
        statement = `
        SELECT id FROM user
        WHERE
        email = ?
        `;
        params = [email];
        const users = await connectionQuery(connection, statement, params);
        if(users.length > 0){
            return new ErrorResponse("Duplicate email", STATUS_CODE.DB_DUPLICATE_KEY);
        }
    
        statement = `
        INSERT INTO user(email, salt, password)
        VALUES(?, ?, ?)
        `;
        params = [email, salt, password];
        await connectionQuery(connection, statement, params);

        // https://stackoverflow.com/questions/17112852/get-the-new-record-primary-key-id-from-mysql-insert-query
        statement = `
        SELECT LAST_INSERT_ID() AS id
        `;
        result = await connectionQuery(connection, statement);

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


module.exports = {
    getUserAccountInfoByEmail,
    getUserAccountInfoById,
    getUserProfileInfoById,
    getMentorList,
    getMentorProfileInfoById,
    getStudentListByMentorId,
    updateUserProfileInfoById,
    updateUserAvatarById,
    updateMyPassword,
    userRegister,
};