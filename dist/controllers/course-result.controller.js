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
exports.getAllCourseResultsByExplorerId = exports.getListOfCourseResults = exports.deleteCourseResultById = exports.getCourseResultById = exports.updateCourseResultById = exports.createCourseResults = void 0;
const http_status_codes_1 = require("http-status-codes");
const CourseResultService = __importStar(require("@services/course-result.service"));
const createCourseResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const createdCourseResults = yield CourseResultService.createCourseResults(data);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(createdCourseResults).end();
});
exports.createCourseResults = createCourseResults;
const updateCourseResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseResultData = req.body;
    const courseResultId = Number(req.params.id);
    const updatedCourseResult = yield CourseResultService.updateCourseResultById(courseResultId, courseResultData);
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedCourseResult).end();
});
exports.updateCourseResultById = updateCourseResultById;
const getCourseResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseResultId = Number(req.params.id);
    const courseResult = yield CourseResultService.getCourseResultById(courseResultId);
    res.status(http_status_codes_1.StatusCodes.OK).json(courseResult).end();
});
exports.getCourseResultById = getCourseResultById;
const deleteCourseResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseResultId = Number(req.params.id);
    const deletedCourseResult = yield CourseResultService.deleteCourseResultById(courseResultId);
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedCourseResult).end();
});
exports.deleteCourseResultById = deleteCourseResultById;
const getListOfCourseResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseResultsList = yield CourseResultService.getListOfCourseResults();
    res.status(http_status_codes_1.StatusCodes.OK).json(courseResultsList).end();
});
exports.getListOfCourseResults = getListOfCourseResults;
const getAllCourseResultsByExplorerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { explorerId } = req.params;
    const courseResults = yield CourseResultService.getAllCourseResultsByExplorerId(explorerId);
    res.status(http_status_codes_1.StatusCodes.OK).json(courseResults).end();
});
exports.getAllCourseResultsByExplorerId = getAllCourseResultsByExplorerId;
