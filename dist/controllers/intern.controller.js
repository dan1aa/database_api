"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDiscordData = exports.getAllInternBadges = exports.getInternBadgesListByCourseId = exports.getCohortScheduleByExplorerId = exports.deleteInternById = exports.getFilteredInternsList = exports.getInternById = exports.updateInternById = exports.createInterns = void 0;
const http_status_codes_1 = require("http-status-codes");
const InternService = __importStar(require("@services/intern.service"));
const createInterns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const createdInterns = yield InternService.createInterns(data);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(createdInterns).end();
});
exports.createInterns = createInterns;
const updateInternById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const internId = Number(req.params.id);
    const internData = req.body;
    const updatedIntern = yield InternService.updateInternById(internId, internData);
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedIntern).end();
});
exports.updateInternById = updateInternById;
const getInternById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const internId = Number(req.params.id);
    const intern = yield InternService.getInternById(internId);
    res.status(http_status_codes_1.StatusCodes.OK).json(intern).end();
});
exports.getInternById = getInternById;
const getFilteredInternsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filteringParams = req.query;
    const internsList = yield InternService.getInternsList(filteringParams);
    res.status(http_status_codes_1.StatusCodes.OK).json(internsList).end();
});
exports.getFilteredInternsList = getFilteredInternsList;
const deleteInternById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const internId = Number(req.params.id);
    const deletedIntern = yield InternService.deleteInternById(internId);
    res.status(http_status_codes_1.StatusCodes.OK).send(deletedIntern).end();
});
exports.deleteInternById = deleteInternById;
const getCohortScheduleByExplorerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const explorerId = req.params.explorerId;
    const cohortSchedule = yield InternService.getCohortScheduleByExplorerId(explorerId);
    res.status(http_status_codes_1.StatusCodes.OK).json(cohortSchedule).end();
});
exports.getCohortScheduleByExplorerId = getCohortScheduleByExplorerId;
const getInternBadgesListByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { explorerId } = req.params;
    const { courseCipher } = req.params;
    const cohortSchedule = yield InternService.getInternBadgesListByCourseId(explorerId, courseCipher);
    res.status(http_status_codes_1.StatusCodes.OK).json(cohortSchedule).end();
});
exports.getInternBadgesListByCourseId = getInternBadgesListByCourseId;
const getAllInternBadges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { explorerId } = req.params;
    const internBadges = yield InternService.getAllInternBadges(explorerId);
    res.status(http_status_codes_1.StatusCodes.OK).json(internBadges).end();
});
exports.getAllInternBadges = getAllInternBadges;
const insertDiscordData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const insertedDiscords = yield InternService.insertDiscordData(data);
    res.status(http_status_codes_1.StatusCodes.OK).json(insertedDiscords).end();
});
exports.insertDiscordData = insertDiscordData;
