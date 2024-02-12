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
const FeedbackOnFacilitatorController = __importStar(require("@controllers/feedback-on-facilitator.controller"));
const validateRequestId_middleware_1 = __importDefault(require("@middlewares/validateRequestId.middleware"));
const tryCatchMiddleware_middleware_1 = __importDefault(require("@middlewares/tryCatchMiddleware.middleware"));
const validateRequestBody_middleware_1 = __importDefault(require("@middlewares/validateRequestBody.middleware"));
const FeedbackOnFacilitatorModels = __importStar(require("@request-schemas/feedback-on-facilitator.request-schema"));
const router = (0, express_1.Router)();
router.post('/feedbacks-on-facilitator', (0, validateRequestBody_middleware_1.default)(FeedbackOnFacilitatorModels.createFeedbacksOnFacilitatorScheme), (0, tryCatchMiddleware_middleware_1.default)(FeedbackOnFacilitatorController.createFeedbacksOnFacilitator));
router.get('/feedbacks-on-facilitator/:id', validateRequestId_middleware_1.default, (0, tryCatchMiddleware_middleware_1.default)(FeedbackOnFacilitatorController.getFeedbackOnFacilitatorById));
router.put('/feedbacks-on-facilitator/:id', validateRequestId_middleware_1.default, (0, validateRequestBody_middleware_1.default)(FeedbackOnFacilitatorModels.updateFeedbackOnFacilitatorScheme), (0, tryCatchMiddleware_middleware_1.default)(FeedbackOnFacilitatorController.updateFeedbackOnFacilitatorById));
router.delete('/feedbacks-on-facilitator/:id', validateRequestId_middleware_1.default, (0, tryCatchMiddleware_middleware_1.default)(FeedbackOnFacilitatorController.deleteFeedbackOnFacilitatorById));
router.get('/feedbacks-on-facilitator', (0, tryCatchMiddleware_middleware_1.default)(FeedbackOnFacilitatorController.getListOfFeedbacksOnFacilitator));
exports.default = router;
