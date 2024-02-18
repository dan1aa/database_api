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
exports.deleteFeedbackOnFacilitatorById = exports.updateFeedbackOnFacilitatorById = exports.getFeedbackOnFacilitatorById = exports.getListOfFeedbacksOnFacilitator = exports.createFeedbacksOnFacilitator = void 0;
const db_server_1 = require("@utils/db.server");
const createFeedbacksOnFacilitator = (feedbacksOnFacilitator) => __awaiter(void 0, void 0, void 0, function* () {
    let invalidFeedbacksOnFacilitator = [];
    const promises = feedbacksOnFacilitator.map((feedbackOnFacilitator) => __awaiter(void 0, void 0, void 0, function* () {
        let { courseId, meetNumber, senderId, internId } = feedbackOnFacilitator, rest = __rest(feedbackOnFacilitator, ["courseId", "meetNumber", "senderId", "internId"]);
        const sender = yield db_server_1.db.intern.findUnique({ where: { explorerId: senderId } });
        const receiver = yield db_server_1.db.intern.findUnique({ where: { explorerId: internId } });
        if (sender && receiver) {
            const course = yield db_server_1.db.course.findUnique({ where: { courseCipher: courseId } });
            if (course) {
                const courseSQLId = course.id;
                const classEvent = yield db_server_1.db.classEvent.findUnique({
                    where: {
                        courseId_meetNumber: { courseId: courseSQLId, meetNumber }
                    }
                });
                if (classEvent) {
                    const senderId = sender.id;
                    const internId = receiver.id;
                    const classEventId = classEvent.id;
                    yield db_server_1.db.feedbackOnFacilitator.upsert({
                        where: {
                            senderId_internId_classEventId: { senderId, internId, classEventId }
                        },
                        create: Object.assign(Object.assign({}, rest), { senderId, internId, classEventId }),
                        update: Object.assign(Object.assign({}, rest), { senderId, internId, classEventId }),
                    });
                }
            }
        }
        else {
            invalidFeedbacksOnFacilitator.push(`(senderId: ${senderId}, internId: ${internId}, courseId: ${courseId}, meetNumber: ${meetNumber})`);
        }
    }));
    yield Promise.all(promises);
    let notAddedFeedbacksOnFacilitator = invalidFeedbacksOnFacilitator.length ? `Feedbacks on Facilitator with these ids were not added: ${invalidFeedbacksOnFacilitator.join(',')}` : 'All good';
    return { message: "Feedbacks on Facilitator created and updated successfully!", notAddedFeedbacksOnFacilitator };
});
exports.createFeedbacksOnFacilitator = createFeedbacksOnFacilitator;
const getListOfFeedbacksOnFacilitator = () => __awaiter(void 0, void 0, void 0, function* () {
    const feedbacksOnFacilitatorList = yield db_server_1.db.feedbackOnFacilitator.findMany({});
    return feedbacksOnFacilitatorList;
});
exports.getListOfFeedbacksOnFacilitator = getListOfFeedbacksOnFacilitator;
const getFeedbackOnFacilitatorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackOnFacilitator = yield db_server_1.db.feedbackOnFacilitator.findUnique({ where: { id } });
    return feedbackOnFacilitator;
});
exports.getFeedbackOnFacilitatorById = getFeedbackOnFacilitatorById;
const updateFeedbackOnFacilitatorById = (id, feedbacksOnFacilitator) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFeedbackOnFacilitator = yield db_server_1.db.feedbackOnFacilitator.update({ where: { id }, data: feedbacksOnFacilitator });
    return updatedFeedbackOnFacilitator;
});
exports.updateFeedbackOnFacilitatorById = updateFeedbackOnFacilitatorById;
const deleteFeedbackOnFacilitatorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedFeedbackOnFacilitator = yield db_server_1.db.feedbackOnFacilitator.delete({ where: { id } });
    return deletedFeedbackOnFacilitator;
});
exports.deleteFeedbackOnFacilitatorById = deleteFeedbackOnFacilitatorById;
