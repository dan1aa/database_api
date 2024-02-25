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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCourseResultsByExplorerId = exports.getListOfCourseResults = exports.deleteCourseResultById = exports.getCourseResultById = exports.updateCourseResultById = exports.createCourseResults = void 0;
const db_server_1 = require("@utils/db.server");
const createCourseResults = (courseResults) => __awaiter(void 0, void 0, void 0, function* () {
    let invalidCourseResults = [];
    const promises = courseResults.map((courseResult) => __awaiter(void 0, void 0, void 0, function* () {
        const { courseId, internId } = courseResult, rest = __rest(courseResult, ["courseId", "internId"]);
        const course = yield db_server_1.db.course.findUnique({ where: { courseCipher: courseId } });
        const intern = yield db_server_1.db.intern.findUnique({ where: { explorerId: internId } });
        if (course && intern) {
            const courseSQLId = course.id;
            const internSQLId = intern.id;
            yield db_server_1.db.courseResult.upsert({
                where: {
                    internId_courseId: {
                        internId: internSQLId,
                        courseId: courseSQLId
                    }
                },
                create: Object.assign({ internId: internSQLId, courseId: courseSQLId }, rest),
                update: Object.assign({ internId: internSQLId, courseId: courseSQLId }, rest)
            });
        }
        else {
            invalidCourseResults.push(`(courseId: ${courseId}, internId: ${internId})`);
        }
    }));
    yield Promise.all(promises);
    const courseResultsNotAdded = invalidCourseResults.length ? `Course results with these ids were not added: ${invalidCourseResults.join(',')}` : 'All good';
    return { message: "Course Results created and updated successfully!", courseResultsNotAdded };
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
const getAllCourseResultsByExplorerId = (explorerId) => __awaiter(void 0, void 0, void 0, function* () {
    const intern = yield db_server_1.db.intern.findUnique({
        where: { explorerId }
    });
    if (intern) {
        const { id } = intern;
        const courseResults = yield db_server_1.db.courseResult.findMany({
            where: { internId: id },
            include: {
                course: true
            }
        });
        return courseResults;
    }
    return { message: `Intern with explorer id ${explorerId} not found!` };
});
exports.getAllCourseResultsByExplorerId = getAllCourseResultsByExplorerId;
