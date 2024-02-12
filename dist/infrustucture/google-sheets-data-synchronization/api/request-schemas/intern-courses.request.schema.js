"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createInternScheme = joi_1.default.object({
    name: joi_1.default.string().max(100),
    surname: joi_1.default.string().max(100),
    email: joi_1.default.string().max(50).email(),
    explorerId: joi_1.default.string().max(50),
    explorerMail: joi_1.default.string().max(50),
    explorerPassword: joi_1.default.string().max(50),
    discordId: joi_1.default.string().max(100).allow(null),
    discordNickname: joi_1.default.string().max(50).allow(null),
    cohort: joi_1.default.string().max(50).allow(null),
    teachableId: joi_1.default.string().max(15).allow(null),
    age: joi_1.default.number().integer(),
    city: joi_1.default.string().max(50),
    country: joi_1.default.string().max(50),
    timezone: joi_1.default.string().max(50),
});
const createCourseScheme = joi_1.default.object({
    courseCipher: joi_1.default.string().required(),
    courseName: joi_1.default.string().required(),
    startDate: joi_1.default.string().required(),
    endDate: joi_1.default.string().required(),
    linkToClassMaterials: joi_1.default.string().allow(null).required()
});
const mergingInternsDataSchema = joi_1.default.array().items(createInternScheme);
const merghinCourseDataSchema = joi_1.default.array().items(createCourseScheme);
const mergingInternCourseDataSchema = joi_1.default.object({
    courseCipher: joi_1.default.string().required(),
    participants: joi_1.default.object().pattern(joi_1.default.string(), joi_1.default.array().items(joi_1.default.string()).required()).required()
});
exports.default = {
    merghinCourseDataSchema,
    mergingInternsDataSchema,
    mergingInternCourseDataSchema
};
