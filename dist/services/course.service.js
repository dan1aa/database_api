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
exports.getCourseResultsByCourseId = exports.getCourseDetailsByCipher = exports.enrollInternsInCourseById = exports.deleteCourseById = exports.updateCourseById = exports.getCourseById = exports.getCourses = exports.createCourses = void 0;
const db_server_1 = require("@utils/db.server");
const createCourses = (courses) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = courses.map(course => {
        course.startDate = new Date(course.startDate);
        course.endDate = new Date(course.endDate);
        return db_server_1.db.course.upsert({
            where: { courseCipher: course.courseCipher },
            update: Object.assign({}, course),
            create: Object.assign({}, course)
        });
    });
    yield Promise.all(promises);
    return { message: "Courses created and updated successfully!" };
});
exports.createCourses = createCourses;
const getCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const coursesList = yield db_server_1.db.course.findMany();
    return coursesList;
});
exports.getCourses = getCourses;
const getCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_server_1.db.course.findUnique({
        where: {
            id
        }
    });
    return course;
});
exports.getCourseById = getCourseById;
const updateCourseById = (id, course) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = course;
    if (startDate)
        course.startDate = new Date(startDate);
    if (endDate)
        course.endDate = new Date(endDate);
    const updatedCourse = yield db_server_1.db.course.update({
        where: {
            id
        },
        data: course
    });
    return updatedCourse;
});
exports.updateCourseById = updateCourseById;
const deleteCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCourse = yield db_server_1.db.course.delete({
        where: {
            id
        }
    });
    return deletedCourse;
});
exports.deleteCourseById = deleteCourseById;
const enrollInternsInCourseById = (courseId, participantsData) => __awaiter(void 0, void 0, void 0, function* () {
    for (const participantData of participantsData) {
        const { internId, classRoleId } = participantData;
        yield db_server_1.db.internCourseRole.create({ data: { internId, courseId, classRoleId } });
    }
    return { message: "InternCourseRole created and updated successfully!" };
});
exports.enrollInternsInCourseById = enrollInternsInCourseById;
const getCourseDetailsByCipher = (courseCipher) => __awaiter(void 0, void 0, void 0, function* () {
    const targetCourseData = yield db_server_1.db.course.findUnique({ where: { courseCipher } });
    if (!targetCourseData)
        return null;
    const courseSchedule = yield getCourseScheduleByCourseId(targetCourseData.id);
    const courseParticipants = yield getCourseParticipantsByCourseId(targetCourseData.id);
    const result = Object.assign(Object.assign({}, targetCourseData), { participants: courseParticipants, schedule: courseSchedule });
    return result;
});
exports.getCourseDetailsByCipher = getCourseDetailsByCipher;
const getCourseScheduleByCourseId = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const courseSchedule = yield db_server_1.db.classEvent.findMany({
        where: { courseId }
    });
    return courseSchedule;
});
const getCourseParticipantsByCourseId = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const courseParticipants = yield db_server_1.db.internCourseRole.findMany({
        where: {
            courseId
        },
        include: {
            intern: true,
            classRole: true
        }
    });
    if (!courseParticipants)
        return null;
    const groupedInternsByRole = courseParticipants.reduce((result, participant) => {
        const { intern, classRole } = participant;
        if (!result[classRole.name]) {
            result[classRole.name] = [];
        }
        result[classRole.name].push(intern);
        return result;
    }, {});
    return groupedInternsByRole;
});
const getCourseResultsByCourseId = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const courseResults = yield db_server_1.db.courseResult.findMany({
        where: {
            courseId,
        }
    });
    return courseResults;
});
exports.getCourseResultsByCourseId = getCourseResultsByCourseId;
