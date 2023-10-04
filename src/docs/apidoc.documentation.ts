import { createIntern, deleteIntern, updateInternById, getInternsList, getInternById } from "./interns.documentation";
import { getCoursesList, getCourseById, createCourse, updateCourseById, deleteCourseById, getCourseDetailsList, getCourseDetailsByName } from "./courses.documentation";
import { modifyCourses, modifyInternCourses, modifyInterns } from "./googleSheets.documentation";

import InternsRouterDocumentation from './routes/interns.documentation.route';
import ContactsRouterDocumentation from './routes/contacts.documentation.route';

import { modifyCoursesBody, modifyInternsBody, modifyInternCoursesBody } from "./schemas/googleSheets.schema";

const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Nobel REST API - Documentation',
    },
    servers: [],
    tags: [
        { name: 'Contacts'},
        { name: 'Interns',},
        { name: 'Courses'}, 

    ],
    paths: {
        ...InternsRouterDocumentation,
        '/api/courses': {
            get: getCoursesList,
            post: createCourse
        },
        '/api/courses/{id}': {
            get: getCourseById,
            put: updateCourseById,
            delete: deleteCourseById
        },
        '/api/course-details': {
            get: getCourseDetailsList
        },
        '/api/googleSheets/course': {
            put: modifyCourses
        },
        '/api/googleSheets/intern': {
            put: modifyInterns
        },
        '/api/googleSheets/intern_course': {
            put: modifyInternCourses
        },
        '/api/course-details/{courseName}': {
            get: getCourseDetailsByName
        },
        ...ContactsRouterDocumentation
    },
    schemas: {
        // createInternSchema,
        // createCourseSchema,
        modifyCoursesBody,
        modifyInternsBody,
        modifyInternCoursesBody,
        // getCourseDetailsListShema
    },

};

export { apiDocumentation };