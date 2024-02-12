"use strict";
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
exports.getListOfCourseResults = exports.deleteCourseResultById = exports.getCourseResultById = exports.updateCourseResultById = exports.createCourseResults = void 0;
const db_server_1 = require("@utils/db.server");
const createCourseResults = (courseResults) => __awaiter(void 0, void 0, void 0, function* () {
    for (const courseResult of courseResults) {
        yield db_server_1.db.courseResult.upsert({
            where: {
                internId_courseId: {
                    internId: courseResult.internId,
                    courseId: courseResult.courseId
                }
            },
            create: courseResult,
            update: courseResult
        });
    }
    return { message: "Course Results created and updated successfully!" };
});
exports.createCourseResults = createCourseResults;
const updateCourseResultById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCourseResults = yield db_server_1.db.courseResult.update({ where: { id }, data: data });
    return updatedCourseResults;
});
exports.updateCourseResultById = updateCourseResultById;
const getCourseResultById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const courseResult = yield db_server_1.db.courseResult.findUnique({ where: { id } });
    return courseResult;
});
exports.getCourseResultById = getCourseResultById;
const deleteCourseResultById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCourseResult = yield db_server_1.db.courseResult.delete({ where: { id } });
    return deletedCourseResult;
});
exports.deleteCourseResultById = deleteCourseResultById;
const getListOfCourseResults = () => __awaiter(void 0, void 0, void 0, function* () {
    const courseResultsList = yield db_server_1.db.courseResult.findMany();
    return courseResultsList;
});
exports.getListOfCourseResults = getListOfCourseResults;
