// import { createCourseSchema, getCourseDetailsListShema } from "./schemas/course.schema";
import { InternalServerError } from "./errors.documentation";

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
                                id: {
                                    type: 'number',
                                    example: 2
                                },
                                // ...createCourseSchema.properties
                            }
                        }
                    },
                },
            },
        },
        ...InternalServerError
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
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                example: 2
                            },
                            // ...createCourseSchema.properties
                        }
                    }
                },
            },
        },
        ...InternalServerError
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
                // schema: createCourseSchema,
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
                                type: 'number',
                                example: 2,
                            },
                            // ...createCourseSchema.properties
                        },
                    },
                },
            },
        },
        ...InternalServerError
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
            description: 'Course with id 2 updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Course with id 2 updated successfully!',
                            },
                        },
                    },
                },
            },
        },
        ...InternalServerError
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
            description: 'Course with id 2 deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Course with id 2 deleted successfully!',
                            },
                        },
                    },
                },
            },
        },
        ...InternalServerError
    },
};

const getCourseDetailsList = {
    tags: ['Courses'],
    summary: 'Get full info about courses by list of their name (not updated, will be soon)',
    description: 'Get full info about courses by list of their names',
    operationId: 'getCourseDetailsList',
    parameters: [
        {
            name: 'courseName',
            in: 'query',
            description: 'Course Name',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Full info about course',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        // ...getCourseDetailsListShema.properties,
                                        IWD336: {
                                            type: 'object',
                                            properties: {
                                                start_date: {
                                                    type: 'string',
                                                    example: ''
                                                },
                                                end_date: {
                                                    type: 'string',
                                                    example: ''
                                                },
                                                schedule: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string',
                                                        example: "Empty array"
                                                    }
                                                },
                                                participantsInfo: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string',
                                                        example: "Empty array"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                },
            },
        },
    },
    ...InternalServerError
}

const getCourseDetailsByName = {
    tags: ['Courses'],
    summary: 'Get full info about course by name (not updated, will be soon)',
    description: 'Get full info about course by name',
    operationId: 'getCourseDetailsByName',
    parameters: [
        {
            name: 'courseName',
            in: 'path',
            description: 'Course Name',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Full info about course',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        // ,
                    },
                },
            },
        },
        ...InternalServerError
    },
}

export { getCoursesList, getCourseById, createCourse, updateCourseById, deleteCourseById, getCourseDetailsList, getCourseDetailsByName };