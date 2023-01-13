const STATUS_CODE = {
    SUCCESS: 0,
    ERROR: -1,
    DB_ERROR: -100,
    DB_DUPLICATE_KEY: -110,
    DB_RECORD_NOT_EXIST: -120,
    S3_ERROR: -200,

    NOT_LOGIN: -800,
    WRONG_PASSWORD: -900
};

module.exports = {STATUS_CODE};