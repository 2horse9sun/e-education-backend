const mysql = require('mysql2');
const {AWS_RDS_MYSQL_CONFIG} = require('../configs/DBConfig');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: AWS_RDS_MYSQL_CONFIG.host,
    user: AWS_RDS_MYSQL_CONFIG.user,
    password: AWS_RDS_MYSQL_CONFIG.password,
    database: AWS_RDS_MYSQL_CONFIG.database,
    port: AWS_RDS_MYSQL_CONFIG.port
});
const promisePool = pool.promise();


const connectionQuery = async (connection, statement, params) => {
    let rows;
    if(typeof params === "undefined"){
        [rows] = await connection.query(statement);
    }else{
        [rows] = await connection.query(statement, params);
    }
    return rows;
};


const poolQuery = async (statement, params) => {
    let connection;
    let rows;
    try {
        connection = await promisePool.getConnection();
        rows = await connectionQuery(connection, statement, params);
        return new SuccessResponse(rows);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error.toString(), STATUS_CODE.DB_ERROR);
    } finally {
        connection.release(); 
    }
};



module.exports = {
    connectionQuery,
    poolQuery,
    promisePool
};