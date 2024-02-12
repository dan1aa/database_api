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
const db_server_1 = require("@utils/db.server");
;
const mergeInternData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = data.map(internData => {
        return db_server_1.db.intern.upsert({
            where: { explorerId: internData.explorerId },
            update: Object.assign({}, internData),
            create: Object.assign({}, internData)
        });
    });
    const mergingResult = yield Promise.all(promises);
    return mergingResult;
});
const mergeCourseData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = data.map(courseData => {
        return db_server_1.db.course.upsert({
            where: { courseCipher: courseData.courseCipher },
            update: Object.assign({}, courseData),
            create: Object.assign({}, courseData)
        });
    });
    const mergingResult = yield Promise.all(promises);
    return mergingResult;
});
const mergeInternCourseData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const promises = data.map(internCourseData => enrollInternsToCourse(internCourseData));
    const mergingResult = yield Promise.all(promises);
    return mergingResult;
});
const enrollInternsToCourse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseCipher, participants } = data;
    const recordsToCreate = [];
    const targetCourseData = yield db_server_1.db.course.findUnique({ where: { courseCipher } });
    if (!targetCourseData) {
        return;
    }
    for (const internRole in participants) {
        const processedInternsExplorerIds = participants[internRole];
        const classRoleId = getClassRoleDatabaseIdByNameFromSheets(internRole);
        const internsData = yield db_server_1.db.intern.findMany({
            where: {
                explorerId: {
                    in: processedInternsExplorerIds
                }
            }
        });
        const targetRecordsToCreate = internsData.map(intern => {
            return { courseId: targetCourseData.id, internId: intern.id, classRoleId };
        });
        recordsToCreate.push(...targetRecordsToCreate);
    }
    const enrollingResult = yield db_server_1.db.internCourseRole.createMany({ data: recordsToCreate, skipDuplicates: true });
    return enrollingResult;
});
const getClassRoleDatabaseIdByNameFromSheets = (roleName) => {
    if (roleName === 'o') {
        return 3;
    }
    return roleName === 'f' ? 1 : 2;
};
exports.default = {
    mergeInternData,
    mergeCourseData,
    mergeInternCourseData
};
