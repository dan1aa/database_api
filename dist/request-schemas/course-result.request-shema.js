"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseResultScheme = exports.createCourseResultsScheme = exports.createCourseResultScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCourseResultScheme = joi_1.default.object({
    internId: joi_1.default.string().required(),
    courseId: joi_1.default.string().required(),
    masteryResult: joi_1.default.string().required(),
    englishLevel: joi_1.default.string().allow(null)
});
exports.createCourseResultsScheme = joi_1.default.object({
    data: joi_1.default.array().items(exports.createCourseResultScheme)
});
exports.updateCourseResultScheme = joi_1.default.object({
    internId: joi_1.default.number(),
    courseId: joi_1.default.number(),
    masteryResult: joi_1.default.string(),
    englishLevel: joi_1.default.string()
});
