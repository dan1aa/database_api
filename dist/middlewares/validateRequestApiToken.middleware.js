"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiErrors_1 = require("@utils/exeptions/ApiErrors");
const validateRequestApiToken = (req, res, next) => {
    const apiToken = req.headers['api-token'];
    if (!apiToken) {
        throw new ApiErrors_1.Unauthorized('Unauthorized: Missing token');
    }
    if (apiToken !== process.env.API_TOKEN) {
        throw new ApiErrors_1.Forbidden('Forbidden: Invalid token');
    }
    next();
};
exports.default = validateRequestApiToken;
