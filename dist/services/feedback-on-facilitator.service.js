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
exports.deleteFeedbackOnFacilitatorById = exports.updateFeedbackOnFacilitatorById = exports.createFeedbacksOnFacilitator = exports.getFeedbackOnFacilitatorById = exports.getListOfFeedbacksOnFacilitator = void 0;
const db_server_1 = require("@utils/db.server");
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
const createFeedbacksOnFacilitator = (feedbacksOnFacilitator) => __awaiter(void 0, void 0, void 0, function* () {
    for (const feedbackOnFacilitator of feedbacksOnFacilitator) {
        yield db_server_1.db.feedbackOnFacilitator.upsert({
            where: {
                senderId_internId_classEventId: {
                    senderId: feedbackOnFacilitator.senderId,
                    internId: feedbackOnFacilitator.internId,
                    classEventId: feedbackOnFacilitator.classEventId
                }
            },
            create: feedbackOnFacilitator,
            update: feedbackOnFacilitator
        });
    }
    return { message: "Feedbacks on Facilitator created and updated successfully!" };
});
exports.createFeedbacksOnFacilitator = createFeedbacksOnFacilitator;
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
