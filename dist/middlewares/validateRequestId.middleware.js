"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiErrors_1 = require("@utils/exeptions/ApiErrors");
const validateRequestId = (req, res, next) => {
    const requestId = Number(req.params.id);
    if (isNaN(requestId) || requestId <= 0) {
        const { statusCode, name, description, isOperational } = new ApiErrors_1.BadRequestError('Invalid id parameter');
        return res.status(statusCode).json({ name, statusCode, description, isOperational });
    }
    next();
};
exports.default = validateRequestId;
