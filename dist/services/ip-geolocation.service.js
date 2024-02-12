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
exports.getLocationByIpAddress = void 0;
const process_1 = require("process");
const getLocationByIpAddress = (ip) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ip)
        return undefined;
    try {
        const response = yield fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process_1.env.IP_GEOLOCATION_API_TOKEN}&ip=${Array.isArray(ip) ? ip[0] : ip}`);
        const locationData = yield response.json();
        return locationData;
    }
    catch (_a) {
        return undefined;
    }
});
exports.getLocationByIpAddress = getLocationByIpAddress;
