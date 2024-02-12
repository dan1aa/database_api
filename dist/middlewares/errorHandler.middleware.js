"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const ApiErrors_1 = require("@utils/exeptions/ApiErrors");
const errorHandler = (error, req, res, next) => {
    const statusCode = error instanceof ApiErrors_1.BaseApiError
        ? error.statusCode
        : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(error);
    res.status(statusCode).json({
        msg: error instanceof ApiErrors_1.BaseApiError
            ? error.message
            : 'Internal server error',
    });
};
exports.default = errorHandler;
