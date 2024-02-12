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
exports.deleteFeedbackOnInternById = exports.updateFeedbackOnInternById = exports.getFeedbackOnInternById = exports.getListOfFeedbacksOnIntern = exports.createFeedbacksOnIntern = void 0;
const db_server_1 = require("@utils/db.server");
const createFeedbacksOnIntern = (feedbacksOnIntern) => __awaiter(void 0, void 0, void 0, function* () {
    for (const feedbackOnIntern of feedbacksOnIntern) {
        yield db_server_1.db.feedbackOnIntern.upsert({
            where: {
                senderId_internId_classEventId: {
                    senderId: feedbackOnIntern.senderId,
                    internId: feedbackOnIntern.internId,
                    classEventId: feedbackOnIntern.classEventId,
                }
            },
            create: feedbackOnIntern,
            update: feedbackOnIntern
        });
    }
    return { message: 'Feedbacks on Intern created and updated successfully!' };
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
