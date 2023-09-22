import { createIntern, createInternBody, deleteIntern, updateInternById, getInternsList } from "./interns.documentation";
import { getCoursesList, getCourseById, createCourseBody, createCourse, updateCourseById, deleteCourseById } from "./courses.documentation";

const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Nober REST API - Documentation',
    },
    servers: [],
    tags: [
        {
            name: 'Interns',
        },
        {
            name: 'Courses'
        }
    ],
    paths: {
        '/api/interns': {
            get: getInternsList,
            post: createIntern,
        },
        '/api/interns/{id}': {
            get: getInternsList,
            put: updateInternById,
            delete: deleteIntern
        },
        '/api/courses': {
            get: getCoursesList,
            post: createCourse
        },
        '/api/courses/{id}': {
            get: getCourseById,
            put: updateCourseById,
            delete: deleteCourseById
        }
    },
    schemas: {
        createInternBody,
        createCourseBody
    },

};

export { apiDocumentation };