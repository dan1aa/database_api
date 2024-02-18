"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const intern_course_controller_1 = __importDefault(require("../controllers/intern-course.controller"));
const tryCatchMiddleware_middleware_1 = __importDefault(require("@middlewares/tryCatchMiddleware.middleware"));
const router = (0, express_1.default)();
router.post('/merge-intern-course', (0, tryCatchMiddleware_middleware_1.default)(intern_course_controller_1.default.mergeInternCourseData));
exports.default = router;
