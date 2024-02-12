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
exports.createEventInternBadges = exports.getResultsByClassEventId = exports.getClassEventByGoogleMeetCode = exports.getListOfClassEvents = exports.deleteClassEventById = exports.updateClassEventById = exports.getClassEventById = exports.createClassEvents = void 0;
const http_status_codes_1 = require("http-status-codes");
const ClassEventService = __importStar(require("@services/class-event.service"));
const createClassEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const createdClassEvents = yield ClassEventService.createClassEvents(data);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(createdClassEvents).end();
});
exports.createClassEvents = createClassEvents;
const getClassEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classEventId = Number(req.params.id);
    const classEvent = yield ClassEventService.getClassEventById(classEventId);
    res.status(http_status_codes_1.StatusCodes.OK).json(classEvent).end();
});
exports.getClassEventById = getClassEventById;
const updateClassEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classEventData = req.body;
    const classEventId = Number(req.params.id);
    const updatedClassevent = yield ClassEventService.updateClassEventById(classEventId, classEventData);
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedClassevent).end();
});
exports.updateClassEventById = updateClassEventById;
const deleteClassEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classEventId = Number(req.params.id);
    const deletedClassEvent = yield ClassEventService.deleteClassEventById(classEventId);
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedClassEvent).end();
});
exports.deleteClassEventById = deleteClassEventById;
const getListOfClassEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classEventsList = yield ClassEventService.getListOfClassEvents();
    res.status(http_status_codes_1.StatusCodes.OK).json(classEventsList).end();
});
exports.getListOfClassEvents = getListOfClassEvents;
const getClassEventByGoogleMeetCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const ClassEventByGoogleMeetCode = yield ClassEventService.getClassEventByGoogleMeetCode(code);
    res.status(http_status_codes_1.StatusCodes.OK).json(ClassEventByGoogleMeetCode).end();
});
exports.getClassEventByGoogleMeetCode = getClassEventByGoogleMeetCode;
const getResultsByClassEventId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classEventId = Number(req.params.classEventId);
    const resultsByClassEventId = yield ClassEventService.getResultsByClassEventId(classEventId);
    res.status(http_status_codes_1.StatusCodes.OK).json(resultsByClassEventId).end();
});
exports.getResultsByClassEventId = getResultsByClassEventId;
const createEventInternBadges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const createdEventInternBadges = yield ClassEventService.createEventInternBadges(data);
    res.status(http_status_codes_1.StatusCodes.OK).json(createdEventInternBadges).end();
});
exports.createEventInternBadges = createEventInternBadges;
