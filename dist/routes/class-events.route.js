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
const ClassEventController = __importStar(require("@controllers/class-event.controller"));
const validateRequestId_middleware_1 = __importDefault(require("@middlewares/validateRequestId.middleware"));
const tryCatchMiddleware_middleware_1 = __importDefault(require("@middlewares/tryCatchMiddleware.middleware"));
const validateRequestBody_middleware_1 = __importDefault(require("@middlewares/validateRequestBody.middleware"));
const class_event_request_shema_1 = require("@request-schemas/class-event.request-shema");
const event_intern_badges_request_shema_1 = require("@request-schemas/event-intern-badges.request-shema");
const router = (0, express_1.Router)();
router.get('/class-events', (0, tryCatchMiddleware_middleware_1.default)(ClassEventController.getListOfClassEvents));
router.get('/class-events/:id', validateRequestId_middleware_1.default, (0, tryCatchMiddleware_middleware_1.default)(ClassEventController.getClassEventById));
router.post('/class-events', (0, validateRequestBody_middleware_1.default)(class_event_request_shema_1.createClassEventsScheme), (0, tryCatchMiddleware_middleware_1.default)(ClassEventController.createClassEvents));
router.put('/class-events/:id', validateRequestId_middleware_1.default, (0, validateRequestBody_middleware_1.default)(class_event_request_shema_1.updateClassEventScheme), (0, tryCatchMiddleware_middleware_1.default)(ClassEventController.updateClassEventById));
router.delete('/class-events/:id', validateRequestId_middleware_1.default, (0, tryCatchMiddleware_middleware_1.default)(ClassEventController.deleteClassEventById));
router.get('/class-events/link/:code', (0, tryCatchMiddleware_middleware_1.default)(ClassEventController.getClassEventByGoogleMeetCode));
router.get('/class-events/:classEventId/event-results', (0, tryCatchMiddleware_middleware_1.default)(ClassEventController.getResultsByClassEventId));
router.post('/event-intern-badges', (0, validateRequestBody_middleware_1.default)(event_intern_badges_request_shema_1.createEventInternBadgesSheme), (0, tryCatchMiddleware_middleware_1.default)(ClassEventController.createEventInternBadges));
exports.default = router;
