"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassEventsScheme = exports.createClassEventScheme = exports.updateClassEventScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateClassEventScheme = joi_1.default.object({
    meetNumber: joi_1.default.number(),
    eventDate: joi_1.default.date(),
    googleMeetLink: joi_1.default.string(),
    courseId: joi_1.default.string(),
});
exports.createClassEventScheme = joi_1.default.object({
    meetNumber: joi_1.default.number().required(),
    eventDate: joi_1.default.string().required(),
    googleMeetLink: joi_1.default.string().required(),
    courseId: joi_1.default.string().required(),
});
exports.createClassEventsScheme = joi_1.default.object({
    data: joi_1.default.array().items(exports.createClassEventScheme)
});
