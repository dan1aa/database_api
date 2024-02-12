"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCohorScheduleScheme = exports.createCohortSchedulesScheme = exports.createCohorScheduleScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCohorScheduleScheme = joi_1.default.object({
    eventDate: joi_1.default.string().allow(null),
    eventName: joi_1.default.string().required(),
    cohort: joi_1.default.string().required(),
});
exports.createCohortSchedulesScheme = joi_1.default.object({
    data: joi_1.default.array().items(exports.createCohorScheduleScheme)
});
exports.updateCohorScheduleScheme = joi_1.default.object({
    eventDate: joi_1.default.string().allow(null),
    eventName: joi_1.default.string(),
    cohort: joi_1.default.string(),
});
