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
exports.createFeedbacksOnFacilitator = exports.deleteFeedbackOnFacilitatorById = exports.updateFeedbackOnFacilitatorById = exports.getFeedbackOnFacilitatorById = exports.getListOfFeedbacksOnFacilitator = void 0;
const FeedbackOnFacilitatorController = __importStar(require("@services/feedback-on-facilitator.service"));
const http_status_codes_1 = require("http-status-codes");
const getListOfFeedbacksOnFacilitator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbacksOnFacilitatorList = yield FeedbackOnFacilitatorController.getListOfFeedbacksOnFacilitator();
    res.status(http_status_codes_1.StatusCodes.OK).json(feedbacksOnFacilitatorList).end();
});
exports.getListOfFeedbacksOnFacilitator = getListOfFeedbacksOnFacilitator;
const getFeedbackOnFacilitatorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const feedbackOnFacilitator = yield FeedbackOnFacilitatorController.getFeedbackOnFacilitatorById(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(feedbackOnFacilitator).end();
});
exports.getFeedbackOnFacilitatorById = getFeedbackOnFacilitatorById;
const updateFeedbackOnFacilitatorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const data = req.body;
    const updatedFeedbackOnFacilitator = yield FeedbackOnFacilitatorController.updateFeedbackOnFacilitatorById(id, data);
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedFeedbackOnFacilitator).end();
});
exports.updateFeedbackOnFacilitatorById = updateFeedbackOnFacilitatorById;
const deleteFeedbackOnFacilitatorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const deletedFeedbackOnFacilitator = yield FeedbackOnFacilitatorController.deleteFeedbackOnFacilitatorById(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedFeedbackOnFacilitator).end();
});
exports.deleteFeedbackOnFacilitatorById = deleteFeedbackOnFacilitatorById;
const createFeedbacksOnFacilitator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const createdFeedbacksOnFacilitator = yield FeedbackOnFacilitatorController.createFeedbacksOnFacilitator(data);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(createdFeedbacksOnFacilitator).end();
});
exports.createFeedbacksOnFacilitator = createFeedbacksOnFacilitator;
