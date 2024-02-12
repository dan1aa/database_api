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
exports.getCohortScheduleList = exports.deleteCohortScheduleById = exports.updateCohortScheduleById = exports.getCohortScheduleById = exports.createCohortSchedules = void 0;
const db_server_1 = require("@utils/db.server");
const createCohortSchedules = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.forEach(cohortSchedule => {
        if (cohortSchedule.eventDate)
            cohortSchedule.eventDate = new Date(cohortSchedule.eventDate);
    });
    yield db_server_1.db.cohortSchedule.createMany({ data });
    return { message: "Cohort schedules created successfully!" };
});
exports.createCohortSchedules = createCohortSchedules;
const getCohortScheduleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cohortSchedule = yield db_server_1.db.cohortSchedule.findUnique({ where: { id } });
    return cohortSchedule;
});
exports.getCohortScheduleById = getCohortScheduleById;
const updateCohortScheduleById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.eventDate && typeof data.eventDate === 'string')
        data.eventDate = new Date(data.eventDate);
    const updatedCohortSchedule = yield db_server_1.db.cohortSchedule.update({ where: { id }, data: data });
    return updatedCohortSchedule;
});
exports.updateCohortScheduleById = updateCohortScheduleById;
const deleteCohortScheduleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCohortSchedule = yield db_server_1.db.cohortSchedule.delete({ where: { id } });
    return deletedCohortSchedule;
});
exports.deleteCohortScheduleById = deleteCohortScheduleById;
const getCohortScheduleList = () => __awaiter(void 0, void 0, void 0, function* () {
    const cohortSchedulesList = yield db_server_1.db.cohortSchedule.findMany();
    return cohortSchedulesList;
});
exports.getCohortScheduleList = getCohortScheduleList;
