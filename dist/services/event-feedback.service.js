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
    for (const eventFeedback of eventFeedbacks) {
        yield db_server_1.db.eventFeedback.upsert({
            where: {
                classEventId: eventFeedback.classEventId
            },
            create: eventFeedback,
            update: eventFeedback
        });
    }
    return { message: "Event Feedbacks created and updated successfully!" };
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
