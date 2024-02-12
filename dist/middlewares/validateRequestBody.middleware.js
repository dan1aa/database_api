"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiErrors_1 = require("@utils/exeptions/ApiErrors");
const validateRequestBody = (sheme) => {
    return (req, res, next) => {
        const { error } = sheme.validate(req.body);
        const details = error === null || error === void 0 ? void 0 : error.details[0];
        const errorMessage = (details === null || details === void 0 ? void 0 : details.type.includes('uknown')) ? `Field ${details === null || details === void 0 ? void 0 : details.path} is not allowed` : `Invalid type on field ${details === null || details === void 0 ? void 0 : details.path}`;
        if (error) {
            const { name, statusCode, description, isOperational } = new ApiErrors_1.BadRequestError(errorMessage);
            res.status(statusCode).json({ name, statusCode, description, isOperational });
            return;
        }
        next();
    };
};
exports.default = validateRequestBody;
