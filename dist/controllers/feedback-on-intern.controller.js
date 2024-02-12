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
exports.deleteFeedbackOnInternById = exports.updateFeedbackOnInternById = exports.getFeedbackOnInternById = exports.getListOfFeedbacksOnIntern = exports.createFeedbacksOnIntern = void 0;
const FeedbackOnInternService = __importStar(require("@services/feedback-on-intern.service"));
const http_status_codes_1 = require("http-status-codes");
const createFeedbacksOnIntern = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const createdFeedbacksOnIntern = yield FeedbackOnInternService.createFeedbacksOnIntern(data);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(createdFeedbacksOnIntern).end();
});
exports.createFeedbacksOnIntern = createFeedbacksOnIntern;
const getListOfFeedbacksOnIntern = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbacksOnInternList = yield FeedbackOnInternService.getListOfFeedbacksOnIntern();
    res.status(http_status_codes_1.StatusCodes.OK).json(feedbacksOnInternList).end();
});
exports.getListOfFeedbacksOnIntern = getListOfFeedbacksOnIntern;
const getFeedbackOnInternById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const feedbackOnIntern = yield FeedbackOnInternService.getFeedbackOnInternById(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(feedbackOnIntern).end();
});
exports.getFeedbackOnInternById = getFeedbackOnInternById;
const updateFeedbackOnInternById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const data = req.body;
    const updatedFeedbackOnIntern = yield FeedbackOnInternService.updateFeedbackOnInternById(id, data);
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedFeedbackOnIntern).end();
});
exports.updateFeedbackOnInternById = updateFeedbackOnInternById;
const deleteFeedbackOnInternById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const deletedFeedbackOnIntern = yield FeedbackOnInternService.deleteFeedbackOnInternById(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedFeedbackOnIntern).end();
});
exports.deleteFeedbackOnInternById = deleteFeedbackOnInternById;
