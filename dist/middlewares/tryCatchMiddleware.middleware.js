"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiErrors_1 = require("@utils/exeptions/ApiErrors");
const http_status_codes_1 = require("http-status-codes");
const tryCatchMiddleware = (handler) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield handler(req, res, next);
        }
        catch (error) {
            switch (error === null || error === void 0 ? void 0 : error.code) {
                case 'P2025': return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new ApiErrors_1.NotFoundError);
                case 'P2002': return res.status(http_status_codes_1.StatusCodes.CONFLICT).json(new ApiErrors_1.ConflictError);
                case 'P1008': return res.status(http_status_codes_1.StatusCodes.GATEWAY_TIMEOUT).json(new ApiErrors_1.GatewayTimeoutError);
            }
            next(error);
        }
    });
};
exports.default = tryCatchMiddleware;
