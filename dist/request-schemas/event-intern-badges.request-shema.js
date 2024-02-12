"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventInternBadgesSheme = exports.createEventInternBadgeSheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createEventInternBadgeSheme = joi_1.default.object({
    classEventId: joi_1.default.number().required(),
    internId: joi_1.default.number().required(),
    badgeId: joi_1.default.number().required()
});
exports.createEventInternBadgesSheme = joi_1.default.object({
    data: joi_1.default.array().items(exports.createEventInternBadgeSheme),
});
