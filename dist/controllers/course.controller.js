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
exports.getCourseResultsByCourseId = exports.getCourseDetailsByCipher = exports.enrollInternsInCourseById = exports.deleteCourseById = exports.updateCourseById = exports.getCourseById = exports.getCourses = exports.createCourses = void 0;
const http_status_codes_1 = require("http-status-codes");
const CourseService = __importStar(require("@services/course.service"));
const createCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const cratedCourses = yield CourseService.createCourses(data);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(cratedCourses).end();
});
exports.createCourses = createCourses;
const getCourses = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coursesList = yield CourseService.getCourses();
    res.status(http_status_codes_1.StatusCodes.OK).json(coursesList).end();
});
exports.getCourses = getCourses;
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const course = yield CourseService.getCourseById(+id);
    res.status(http_status_codes_1.StatusCodes.OK).json(course).end();
});
exports.getCourseById = getCourseById;
const updateCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const updatedCourse = yield CourseService.updateCourseById(+id, data);
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedCourse).end();
});
exports.updateCourseById = updateCourseById;
const deleteCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const deletedCourse = yield CourseService.deleteCourseById(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedCourse).end();
});
exports.deleteCourseById = deleteCourseById;
const enrollInternsInCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = Number(req.params.id);
    const participantsData = req.body.data;
    yield CourseService.enrollInternsInCourseById(courseId, participantsData);
    res.status(http_status_codes_1.StatusCodes.OK).end();
});
exports.enrollInternsInCourseById = enrollInternsInCourseById;
const getCourseDetailsByCipher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseCipher = req.params.courseCipher;
    const courseDetails = yield CourseService.getCourseDetailsByCipher(courseCipher);
    res.status(http_status_codes_1.StatusCodes.OK).json(courseDetails).end();
});
exports.getCourseDetailsByCipher = getCourseDetailsByCipher;
const getCourseResultsByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = Number(req.params.courseId);
    const courseResults = yield CourseService.getCourseResultsByCourseId(courseId);
    res.status(http_status_codes_1.StatusCodes.OK).json(courseResults).end();
});
exports.getCourseResultsByCourseId = getCourseResultsByCourseId;
