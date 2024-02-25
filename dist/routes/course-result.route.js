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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CourseResultController = __importStar(require("@controllers/course-result.controller"));
const validateRequestId_middleware_1 = __importDefault(require("@middlewares/validateRequestId.middleware"));
const tryCatchMiddleware_middleware_1 = __importDefault(require("@middlewares/tryCatchMiddleware.middleware"));
const validateRequestBody_middleware_1 = __importDefault(require("@middlewares/validateRequestBody.middleware"));
const course_result_request_shema_1 = require("@request-schemas/course-result.request-shema");
const router = (0, express_1.Router)();
router.post('/course-results', (0, validateRequestBody_middleware_1.default)(course_result_request_shema_1.createCourseResultsScheme), (0, tryCatchMiddleware_middleware_1.default)(CourseResultController.createCourseResults));
router.get('/course-results/:id', validateRequestId_middleware_1.default, (0, tryCatchMiddleware_middleware_1.default)(CourseResultController.getCourseResultById));
router.put('/course-results/:id', validateRequestId_middleware_1.default, (0, validateRequestBody_middleware_1.default)(course_result_request_shema_1.updateCourseResultScheme), (0, tryCatchMiddleware_middleware_1.default)(CourseResultController.updateCourseResultById));
router.delete('/course-results/:id', validateRequestId_middleware_1.default, (0, tryCatchMiddleware_middleware_1.default)(CourseResultController.deleteCourseResultById));
router.get('/course-results', (0, tryCatchMiddleware_middleware_1.default)(CourseResultController.getListOfCourseResults));
router.get('/course-results/all-course-results/:explorerId', (0, tryCatchMiddleware_middleware_1.default)(CourseResultController.getAllCourseResultsByExplorerId));
exports.default = router;
