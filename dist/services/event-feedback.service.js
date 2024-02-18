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
exports.deleteEventFeedbackById = exports.updateEventFeedbackById = exports.getEventFeedbackById = exports.getListOfEventFeedbacks = exports.createEventFeedbacks = void 0;
const db_server_1 = require("@utils/db.server");
const createEventFeedbacks = (eventFeedbacks) => __awaiter(void 0, void 0, void 0, function* () {
    let notFoundCourses = [];
    const promises = eventFeedbacks.map((eventFeedback) => __awaiter(void 0, void 0, void 0, function* () {
        let { meetNumber, courseId, feedback } = eventFeedback;
        const course = yield db_server_1.db.course.findUnique({ where: { courseCipher: courseId } });
        if (course) {
            const courseSQLId = course.id;
            const classEvent = yield db_server_1.db.classEvent.findUnique({ where: { courseId_meetNumber: { courseId: courseSQLId, meetNumber } } });
            if (classEvent) {
                const classEventSQLId = classEvent.id;
                yield db_server_1.db.eventFeedback.upsert({
                    where: { classEventId: classEventSQLId },
                    create: { feedback, classEventId: classEventSQLId },
                    update: { feedback, classEventId: classEventSQLId },
                });
            }
        }
        else {
            notFoundCourses.push(courseId);
        }
    }));
    yield Promise.all(promises);
    const coursesNotFound = notFoundCourses.length ? `Event feedbacks with these course ids: ${notFoundCourses.join(',')} were not added` : 'All good';
    return { message: "Event Feedbacks created and updated successfully!", coursesNotFound };
});
exports.createEventFeedbacks = createEventFeedbacks;
const getListOfEventFeedbacks = () => __awaiter(void 0, void 0, void 0, function* () {
    const eventFeedbacks = yield db_server_1.db.eventFeedback.findMany({});
    return eventFeedbacks;
});
exports.getListOfEventFeedbacks = getListOfEventFeedbacks;
const getEventFeedbackById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const eventFeedback = yield db_server_1.db.eventFeedback.findUnique({
        where: { id }
    });
    return eventFeedback;
});
exports.getEventFeedbackById = getEventFeedbackById;
const updateEventFeedbackById = (id, eventFeedback) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedEventFeedback = yield db_server_1.db.eventFeedback.update({
        where: { id },
        data: eventFeedback
    });
    return updatedEventFeedback;
});
exports.updateEventFeedbackById = updateEventFeedbackById;
const deleteEventFeedbackById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedEventFeedback = yield db_server_1.db.eventFeedback.delete({ where: { id } });
    return deletedEventFeedback;
});
exports.deleteEventFeedbackById = deleteEventFeedbackById;
