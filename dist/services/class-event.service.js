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
exports.createEventInternBadges = exports.getResultsByClassEventId = exports.getClassEventByGoogleMeetCode = exports.getListOfClassEvents = exports.deleteClassEventById = exports.updateClassEventById = exports.getClassEventById = exports.createClassEvents = void 0;
const db_server_1 = require("@utils/db.server");
const createClassEvents = (classEvents) => __awaiter(void 0, void 0, void 0, function* () {
    let invalidCourseIds = [];
    for (let classEvent of classEvents) {
        classEvent.eventDate = new Date(classEvent.eventDate);
        const { courseId, meetNumber, googleMeetLink, eventDate } = classEvent;
        const courseCipher = courseId;
        const course = yield db_server_1.db.course.findUnique({ where: { courseCipher } });
        if (course) {
            const sqlCourseId = course === null || course === void 0 ? void 0 : course.id;
            yield db_server_1.db.classEvent.upsert({
                where: {
                    courseId_meetNumber: {
                        courseId: sqlCourseId,
                        meetNumber: meetNumber
                    }
                },
                create: { courseId: sqlCourseId, meetNumber, googleMeetLink, eventDate },
                update: { courseId: sqlCourseId, meetNumber, googleMeetLink, eventDate }
            });
        }
        else {
            invalidCourseIds.push(courseId);
        }
    }
    const message = !invalidCourseIds.length
        ? `Class Events created and updated successfully!`
        : `Class Events created and updated successfully! Course with course ciphers ${invalidCourseIds.join(', ')} were not added, we can't find courses with these course ciphers.`;
    return { message };
});
exports.createClassEvents = createClassEvents;
const getClassEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const classEvent = yield db_server_1.db.classEvent.findUnique({ where: { id } });
    return classEvent;
});
exports.getClassEventById = getClassEventById;
const updateClassEventById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.eventDate)
        data.eventDate = new Date(data.eventDate);
    const updatedClassEvent = yield db_server_1.db.classEvent.update({ where: { id }, data });
    return updatedClassEvent;
});
exports.updateClassEventById = updateClassEventById;
const deleteClassEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedClassEvent = yield db_server_1.db.classEvent.delete({ where: { id } });
    return deletedClassEvent;
});
exports.deleteClassEventById = deleteClassEventById;
const getListOfClassEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const classEventsList = yield db_server_1.db.classEvent.findMany();
    return classEventsList;
});
exports.getListOfClassEvents = getListOfClassEvents;
const getClassEventByGoogleMeetCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const classEvent = yield db_server_1.db.classEvent.findFirst({
        where: {
            googleMeetLink: `https://meet.google.com/${code}`
        }
    });
    return classEvent;
});
exports.getClassEventByGoogleMeetCode = getClassEventByGoogleMeetCode;
const getResultsByClassEventId = (classEventId) => __awaiter(void 0, void 0, void 0, function* () {
    const classEvent = yield db_server_1.db.classEvent.findUnique({ where: { id: classEventId } });
    if (!classEvent)
        return { message: `Class event with id ${classEventId} not found` };
    const feedbackOnIntern = yield db_server_1.db.feedbackOnIntern.findMany({
        where: {
            classEventId
        }
    });
    const feedbackOnFacilitator = yield db_server_1.db.feedbackOnFacilitator.findMany({
        where: {
            classEventId
        }
    });
    return { feedbackOnFacilitator, feedbackOnIntern };
});
exports.getResultsByClassEventId = getResultsByClassEventId;
const createEventInternBadges = (eventInternBadges) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.db.eventInternBadge.createMany({
        data: eventInternBadges
    });
    return { message: "EventInternBadges created successfully!" };
});
exports.createEventInternBadges = createEventInternBadges;
