const AWS_RDS_MYSQL_CONFIG = {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
};

module.exports = {
    AWS_RDS_MYSQL_CONFIG
};