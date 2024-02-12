"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventFeedbackController = __importStar(require("@controllers/event-feedback.controller"));
const tryCatchMiddleware_middleware_1 = __importDefault(require("@middlewares/tryCatchMiddleware.middleware"));
const validateRequestBody_middleware_1 = __importDefault(require("@middlewares/validateRequestBody.middleware"));
const EventFeedbackModels = __importStar(require("../request-schemas/event-feedback.request-shema"));
const validateRequestId_middleware_1 = __importDefault(require("@middlewares/validateRequestId.middleware"));
const router = (0, express_1.Router)();
router.get('/event-feedbacks', (0, tryCatchMiddleware_middleware_1.default)(EventFeedbackController.getListOfEventFeedbacks));
router.get('/event-feedbacks/:id', validateRequestId_middleware_1.default, (0, tryCatchMiddleware_middleware_1.default)(EventFeedbackController.getEventFeedbackById));
router.post('/event-feedbacks', (0, validateRequestBody_middleware_1.default)(EventFeedbackModels.createEventFeedbacksSheme), (0, tryCatchMiddleware_middleware_1.default)(EventFeedbackController.createEventFeedbacks));
router.put('/event-feedbacks/:id', validateRequestId_middleware_1.default, (0, validateRequestBody_middleware_1.default)(EventFeedbackModels.updateEventFeedbackSheme), (0, tryCatchMiddleware_middleware_1.default)(EventFeedbackController.updateEventFeedbackById));
router.delete('/event-feedbacks/:id', validateRequestId_middleware_1.default, (0, tryCatchMiddleware_middleware_1.default)(EventFeedbackController.deletedEventFeedbackById));
exports.default = router;
