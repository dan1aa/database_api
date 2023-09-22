const createCourseBody = {
    type: 'object',
    properties: {
        course_name: {
            type: 'string',
            example: 'iIWD326aa-1-b'
        },
        start_date: {
            type: 'string',
            example: '2023-11-12'
        },
        end_date: {
            type: 'string',
            example: '2023-10-12'
        }
    }
}

const createCourseSchema = {
    properties: {
        course_name: {
            type: "string"
        },
        start_date: {
            type: "string"
        },
        end_date: {
            type: "string"
        }
    },
    required: ["course_name", "start_date", "end_date"]
}

const getCoursesList = {
    tags: ['Courses'],
    summary: 'Get courses list',
    description: 'Get courses list',
    operationId: 'getCoursesList',
    parameters: [],
    responses: {
        '200': {
            description: 'List of courses',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                course_name: {
                                    type: 'string',
                                    example: 'iIWD326aa-1-b'
                                },
                                start_date: {
                                    type: 'string',
                                    example: '2023-11-12'
                                },
                                end_date: {
                                    type: 'string',
                                    example: '2023-10-12'
                                }
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal Server Error',
                            },
                        },
                    },
                },
            },
        },
    },
};

const getCourseById = {
    tags: ['Courses'],
    summary: 'Info about course by Id',
    description: 'Info about course by Id',
    operationId: 'getCourseById',
    parameters: [
        {
            name: 'Id',
            in: 'path',
            description: 'Id of course info about which you want to receive',
            type: 'number',
        }
    ],
    responses: {
        '200': {
            description: 'Info about course by Id',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                course_name: {
                                    type: 'string',
                                    example: 'iIWD326aa-1-b'
                                },
                                start_date: {
                                    type: 'string',
                                    example: '2023-11-12'
                                },
                                end_date: {
                                    type: 'string',
                                    example: '2023-10-12'
                                }
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal Server Error',
                            },
                        },
                    },
                },
            },
        },
    },
};

const createCourse = {
    tags: ['Courses'],
    summary: 'Create a new course in the system',
    description: 'Create a new course in the system',
    operationId: 'createCourse',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    ...createCourseSchema
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Course created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                example: '256',
                            },
                            course_name: {
                                type: 'string',
                                example: 'iIWD326aa-1-b'
                            },
                            start_date: {
                                type: 'string',
                                example: '2023-11-12'
                            },
                            end_date: {
                                type: 'string',
                                example: '2023-10-12'
                            }
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal Server Error',
                            },
                        },
                    },
                },
            },
        },
    },
};

const updateCourseById = {
    summary: 'Update course data by Id',
    tags: ['Courses'],
    description: 'Update course by Id',
    operationId: 'updateCourseById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Course Id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Course updates successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Course updated successfully!',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal Server Error',
                            },
                        },
                    },
                },
            },
        },
    },
};

const deleteCourseById = {
    tags: ['Courses'],
    summary: 'Delete course by ID',
    description: 'Delete course by ID',
    operationId: 'deleteCourseById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Course ID',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Course deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Course deleted successfully!',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal Server Error',
                            },
                        },
                    },
                },
            },
        },
    },
};

export { getCoursesList, getCourseById, createCourseBody, createCourse, updateCourseById, deleteCourseById };