"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentInternsScheme = exports.updateCourseScheme = exports.createCoursesScheme = exports.createCourseScheme = void 0;
const joi_1 = __importDefault(require("joi"));
const updateCourseObject = {
    courseCipher: joi_1.default.string(),
    courseName: joi_1.default.string(),
    startDate: joi_1.default.string(),
    endDate: joi_1.default.string(),
    linkToClassMaterials: joi_1.default.string().allow(null)
};
exports.createCourseScheme = joi_1.default.object({
    courseCipher: joi_1.default.string().required(),
    courseName: joi_1.default.string().required(),
    startDate: joi_1.default.string().required(),
    endDate: joi_1.default.string().required(),
    linkToClassMaterials: joi_1.default.string().allow(null).required()
});
exports.createCoursesScheme = joi_1.default.object({
    data: joi_1.default.array().items(exports.createCourseScheme),
});
exports.updateCourseScheme = joi_1.default.object(updateCourseObject);
exports.enrollmentInternsScheme = joi_1.default.object({
    data: joi_1.default.array().items(joi_1.default.object({
        internId: joi_1.default.number().required(),
        classRoleId: joi_1.default.number().required(),
    })),
});
