import { createIntern, createInternBody, deleteIntern, updateInternById, getInternsList } from "./interns.documentation";

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
    ],
    paths: {
        'api/interns': {
            get: getInternsList,
            post: createIntern,
        },
        'api/interns/{id}': {
            get: getInternsList,
            put: updateInternById,
            delete: deleteIntern
        }
    },
    schemas: {
        createInternBody,
    },

};

export { apiDocumentation };