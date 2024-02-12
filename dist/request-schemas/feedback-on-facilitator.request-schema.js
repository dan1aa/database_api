"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeedbackOnFacilitatorScheme = exports.createFeedbacksOnFacilitatorScheme = exports.createFeedbackOnFacilitatorScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createFeedbackOnFacilitatorScheme = joi_1.default.object({
    attendance: joi_1.default.bool().required(),
    techCheck: joi_1.default.string().required(),
    english: joi_1.default.string().required(),
    isEncouraging: joi_1.default.boolean().required(),
    isOpenAsked: joi_1.default.boolean().required(),
    naturalCommunications: joi_1.default.string().required(),
    isPrepared: joi_1.default.boolean().required(),
    isCheckedUnderstanding: joi_1.default.boolean().required(),
    isFacilitatorBrief: joi_1.default.boolean().required(),
    publicSpeakingSkills: joi_1.default.string().required(),
    isPunctual: joi_1.default.boolean().required(),
    isOnTimeAttendanceFeedback: joi_1.default.boolean().required(),
    isOptimalScreenPresentation: joi_1.default.boolean().required(),
    internId: joi_1.default.number().required(),
    classEventId: joi_1.default.number().required(),
    senderId: joi_1.default.number().required()
});
exports.createFeedbacksOnFacilitatorScheme = joi_1.default.object({
    data: joi_1.default.array().items(exports.createFeedbackOnFacilitatorScheme)
});
exports.updateFeedbackOnFacilitatorScheme = joi_1.default.object({
    attendance: joi_1.default.bool(),
    techCheck: joi_1.default.string(),
    english: joi_1.default.string(),
    isEncouraging: joi_1.default.boolean(),
    isOpenAsked: joi_1.default.boolean(),
    naturalCommunications: joi_1.default.string(),
    isPrepared: joi_1.default.boolean(),
    isCheckedUnderstanding: joi_1.default.boolean(),
    isFacilitatorBrief: joi_1.default.boolean(),
    publicSpeakingSkills: joi_1.default.string(),
    isPunctual: joi_1.default.boolean(),
    isOnTimeAttendanceFeedback: joi_1.default.boolean(),
    isOptimalScreenPresentation: joi_1.default.boolean(),
    internId: joi_1.default.number(),
    classEventId: joi_1.default.number(),
    senderId: joi_1.default.number()
});
