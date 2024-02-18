"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventFeedbackSheme = exports.createEventFeedbacksSheme = exports.createEventFeedbackSheme = void 0;
const joi_1 = __importDefault(require("joi"));
const updateEventFeedbackObject = {
    classEventId: joi_1.default.number(),
    feedback: joi_1.default.string()
};
exports.createEventFeedbackSheme = joi_1.default.object({
    meetNumber: joi_1.default.number().required(),
    courseId: joi_1.default.string().required(),
    feedback: joi_1.default.string().required()
});
exports.createEventFeedbacksSheme = joi_1.default.object({
    data: joi_1.default.array().items(exports.createEventFeedbackSheme),
});
exports.updateEventFeedbackSheme = joi_1.default.object(updateEventFeedbackObject);
