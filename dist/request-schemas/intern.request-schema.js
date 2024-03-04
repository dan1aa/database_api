"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDiscordDataScheme = exports.updateInternScheme = exports.createInternsScheme = void 0;
const joi_1 = __importDefault(require("joi"));
const createInternSchemeItem = joi_1.default.object({
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
exports.createInternsScheme = joi_1.default.object({
    data: joi_1.default.array().items(createInternSchemeItem),
});
exports.updateInternScheme = joi_1.default.object({
    name: joi_1.default.string().max(100).allow(null),
    surname: joi_1.default.string().max(100).allow(null),
    email: joi_1.default.string().max(50).email().allow(null),
    explorerId: joi_1.default.string().max(50).allow(null),
    explorerMail: joi_1.default.string().max(50).allow(null),
    explorerPassword: joi_1.default.string().max(50).allow(null),
    discordId: joi_1.default.string().max(100).allow(null),
    discordNickname: joi_1.default.string().max(50).allow(null),
    cohort: joi_1.default.string().max(50).allow(null),
    teachableId: joi_1.default.string().max(15).allow(null),
    age: joi_1.default.number().integer().allow(null),
    city: joi_1.default.string().max(50).allow(null),
    country: joi_1.default.string().max(50).allow(null),
    timezone: joi_1.default.string().max(50).allow(null),
});
const insertDiscordData = joi_1.default.object({
    explorerId: joi_1.default.string().required(),
    discordNickname: joi_1.default.string().required(),
    discordId: joi_1.default.string().allow(null)
});
exports.insertDiscordDataScheme = joi_1.default.object({
    data: joi_1.default.array().items(insertDiscordData)
});
