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
exports.deleteFeedbackOnInternById = exports.updateFeedbackOnInternById = exports.getFeedbackOnInternById = exports.getListOfFeedbacksOnIntern = exports.createFeedbacksOnIntern = void 0;
const db_server_1 = require("@utils/db.server");
const createFeedbacksOnIntern = (feedbacksOnIntern) => __awaiter(void 0, void 0, void 0, function* () {
    let invalidFeedbacksOnIntern = [];
    const promises = feedbacksOnIntern.map((feedbackOnIntern) => __awaiter(void 0, void 0, void 0, function* () {
        const { courseId, meetNumber, internId, senderId } = feedbackOnIntern, rest = __rest(feedbackOnIntern, ["courseId", "meetNumber", "internId", "senderId"]);
        const sender = yield db_server_1.db.intern.findUnique({ where: { explorerId: senderId } });
        const receiver = yield db_server_1.db.intern.findUnique({ where: { explorerId: internId } });
        if (sender && receiver) {
            const course = yield db_server_1.db.course.findUnique({ where: {
                    courseCipher: courseId
                } });
            if (course) {
                const senderId = sender.id;
                const internId = receiver.id;
                const courseSQLId = course.id;
                const classEvent = yield db_server_1.db.classEvent.findUnique({
                    where: {
                        courseId_meetNumber: {
                            courseId: courseSQLId,
                            meetNumber
                        }
                    }
                });
                if (classEvent) {
                    const classEventId = classEvent.id;
                    yield db_server_1.db.feedbackOnIntern.upsert({
                        where: {
                            senderId_internId_classEventId: {
                                senderId, internId, classEventId
                            }
                        },
                        create: Object.assign(Object.assign({}, rest), { internId, senderId, classEventId }),
                        update: Object.assign(Object.assign({}, rest), { internId, senderId, classEventId }),
                    });
                }
            }
        }
        else {
            invalidFeedbacksOnIntern.push(`(senderId: ${senderId}, internId: ${internId}, courseId: ${courseId}, meetNumber: ${meetNumber})`);
        }
    }));
    yield Promise.all(promises);
    let notAddedFeedbacksOnIntern = invalidFeedbacksOnIntern.length ? `Feedbacks on Intern with these ids were not added: ${invalidFeedbacksOnIntern.join(',')}` : 'All good';
    return { message: "Feedbacks on Intern were created and updated successfully!", notAddedFeedbacksOnIntern };
});
exports.createFeedbacksOnIntern = createFeedbacksOnIntern;
const getListOfFeedbacksOnIntern = () => __awaiter(void 0, void 0, void 0, function* () {
    const feedbacksOnInternList = yield db_server_1.db.feedbackOnIntern.findMany();
    return feedbacksOnInternList;
});
exports.getListOfFeedbacksOnIntern = getListOfFeedbacksOnIntern;
const getFeedbackOnInternById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackOnIntern = yield db_server_1.db.feedbackOnIntern.findUnique({ where: { id } });
    return feedbackOnIntern;
});
exports.getFeedbackOnInternById = getFeedbackOnInternById;
const updateFeedbackOnInternById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFeedbackOnIntern = yield db_server_1.db.feedbackOnIntern.update({ where: { id }, data });
    return updatedFeedbackOnIntern;
});
exports.updateFeedbackOnInternById = updateFeedbackOnInternById;
const deleteFeedbackOnInternById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedFeedbackOnIntern = yield db_server_1.db.feedbackOnIntern.delete({ where: { id } });
    return deletedFeedbackOnIntern;
});
exports.deleteFeedbackOnInternById = deleteFeedbackOnInternById;
