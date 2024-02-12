"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactArraySchema = exports.updateContactScheme = exports.createContactScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createContactScheme = joi_1.default.object({
    firstName: joi_1.default.string().allow(null).required(),
    lastName: joi_1.default.string().allow(null).required(),
    email: joi_1.default.string().allow(null).required(),
    age: joi_1.default.number().allow(null).required(),
    country: joi_1.default.string().allow(null).required(),
    timezone: joi_1.default.string().allow(null).required(),
    sourceOfReferral: joi_1.default.string().allow(null).required(),
    birthDate: joi_1.default.date().allow(null).required(),
    occupation: joi_1.default.string().allow(null).required(),
    gender: joi_1.default.string().allow(null).required(),
    eduQuestSelectedDateTime: joi_1.default.date().allow(null).required(),
    eduQuestDecision: joi_1.default.string().allow(null).required()
});
exports.updateContactScheme = joi_1.default.object({
    firstName: joi_1.default.string().allow(null),
    lastName: joi_1.default.string().allow(null),
    email: joi_1.default.string().allow(null),
    age: joi_1.default.number().allow(null),
    country: joi_1.default.string().allow(null),
    timezone: joi_1.default.string().allow(null),
    sourceOfReferral: joi_1.default.string().allow(null),
    birthDate: joi_1.default.date().allow(null).required(),
    occupation: joi_1.default.string().allow(null).required(),
    gender: joi_1.default.string().allow(null).required(),
    eduQuestSelectedDateTime: joi_1.default.date().allow(null),
    eduQuestDecision: joi_1.default.string().allow(null)
});
exports.createContactArraySchema = joi_1.default.array().items(exports.createContactScheme);
