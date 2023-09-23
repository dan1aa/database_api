import { modifyCoursesScheme, modifyInternsScheme, modifyInternCoursesScheme, modifyCoursesBody, modifyInternsBody, modifyInternCoursesBody } from "./schemas/googleSheets.schema"
import { InternalServerError } from "./errors.documentation"

const modifyCourses = {
    tags: ['Google Sheets'],
    summary: 'Create or update courses from insert array, delete courses from delete array',
    description: 'Create or update courses from insert array, delete courses from delete array',
    operationId: 'modifyCourses',
    requestBody: {
        content: {
            'application/json': {
                schema: modifyCoursesScheme,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Returns updated sql table with all courses',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    example: '2'
                                },
                                ...modifyCoursesBody.properties
                            },
                        },
                    },
                },
            },
        },
        ...InternalServerError
    },
}



const modifyInterns = {
    tags: ['Google Sheets'],
    summary: 'Create or update interns from insert array, delete interns from delete array',
    description: 'Create or update interns from insert array, delete interns from delete array',
    operationId: 'modifyInterns',
    requestBody: {
        content: {
            'application/json': {
                schema: modifyInternsScheme,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Returns updated sql table with all interns',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    example: '2'
                                },
                                ...modifyInternsBody.properties
                            },
                        },
                    },
                },
            },
        },
        ...InternalServerError
    },
}



const modifyInternCourses = {
    tags: ['Google Sheets'],
    summary: 'Create or update intern_course table from insert array, delete data from table intern_course which is in delete array',
    description: 'Create or update intern_course table from insert array, delete data from table intern_course which is in delete array',
    operationId: 'modifyInternCourses',
    requestBody: {
        content: {
            'application/json': {
                schema: modifyInternCoursesScheme,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Returns updated sql table with all intern_course data',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: modifyInternCoursesBody
                    },
                },
            },
        },
        ...InternalServerError
    },
}

export { modifyCourses, modifyInterns, modifyInternCourses }