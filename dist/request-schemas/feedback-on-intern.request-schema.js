"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeedbackOnInternScheme = exports.createFeedbacksOnInternScheme = exports.createFeedbackOnInternScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createFeedbackOnInternScheme = joi_1.default.object({
    attendance: joi_1.default.boolean().required(),
    techCheck: joi_1.default.string().required(),
    participationActivity: joi_1.default.string().required(),
    comment: joi_1.default.string(),
    internId: joi_1.default.number().required(),
    classEventId: joi_1.default.number().required(),
    senderId: joi_1.default.number().required()
});
exports.createFeedbacksOnInternScheme = joi_1.default.object({
    data: joi_1.default.array().items(exports.createFeedbackOnInternScheme)
});
exports.updateFeedbackOnInternScheme = joi_1.default.object({
    attendance: joi_1.default.boolean(),
    techCheck: joi_1.default.string(),
    participationActivity: joi_1.default.string(),
    comment: joi_1.default.string(),
    internId: joi_1.default.number(),
    classEventId: joi_1.default.number(),
    senderId: joi_1.default.number()
});
