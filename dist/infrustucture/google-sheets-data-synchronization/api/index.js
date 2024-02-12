"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const intern_course_router_1 = __importDefault(require("./routes/intern-course.router"));
const router = (0, express_1.default)();
router.use('/intern-course', intern_course_router_1.default);
exports.default = router;
