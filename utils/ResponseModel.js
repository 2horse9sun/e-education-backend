const {STATUS_CODE} = require('../configs/StatusCode');

class SuccessResponse{
    constructor(data) {
        this.data = data;
        this.statusCode = STATUS_CODE.SUCCESS;
    }
}

class ErrorResponse{
    constructor(error, statusCode = STATUS_CODE.ERROR) {
        this.error = error;
        this.statusCode = statusCode;
    }
}

module.exports = {
    SuccessResponse,
    ErrorResponse
}