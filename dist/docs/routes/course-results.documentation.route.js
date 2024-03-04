"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_to_swagger_1 = __importDefault(require("joi-to-swagger"));
const course_result_request_shema_1 = require("@request-schemas/course-result.request-shema");
const createCourseResults = {
    tags: ['Course Results'],
    operationId: 'createCourseResults',
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(course_result_request_shema_1.createCourseResultsScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Course Results created and updated successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            courseId: { type: 'number', example: 14 },
                            internId: { type: 'number', example: 14 },
                            masteryResult: { type: 'string', example: 'Try again' },
                            englishLevel: { type: 'string', example: 'Amazing' },
                        }
                    }
                },
            },
        },
        '400': {
            description: 'You try to create course result with invalid internId or courseId',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Record with your internId doesn`t exist in Intern table or record with your courseId doesn`t exist in Course table'
                            }
                        }
                    }
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
                                example: 'Internal server error',
                            },
                        },
                    },
                },
            },
        }
    },
};
const getCourseResultById = {
    tags: ['Course Results'],
    operationId: 'getCourseResultById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Course-result id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Course Result retrived successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            internId: { type: 'number', example: 14 },
                            courseId: { type: 'number', example: 14 },
                            masteryResult: { type: 'string', example: 'Try again' },
                            englishLevel: { type: 'string', example: 'Amazing' },
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access to not existing course Result record',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Course Result with id {id} doesn`t exist'
                            }
                        }
                    }
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
                                example: 'Internal server error',
                            },
                        },
                    },
                },
            },
        }
    },
};
const updateCourseResultById = {
    tags: ['Course Results'],
    operationId: 'updateCourseResultById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Course Result id',
            required: true,
            type: 'number',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(course_result_request_shema_1.updateCourseResultScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Course Result updated successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            internId: { type: 'number', example: 14 },
                            courseId: { type: 'number', example: 10 },
                            masteryResult: { type: 'string', example: 'Try again' },
                            englishLevel: { type: 'string', example: 'Amazing' },
                        }
                    }
                },
            },
        },
        '400': {
            description: 'You try update field internCourseId to value that dose`t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Record in table Intern-Course with id ${internCourseId} doesn`t exist'
                            }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access to not existing course-result record',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Course Result with id {id} doesn`t exist'
                            }
                        }
                    }
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
                                example: 'Internal server error',
                            },
                        },
                    },
                },
            },
        }
    },
};
const deleteCourseResultById = {
    tags: ['Course Results'],
    operationId: 'deleteCourseResultById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Course Result id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Course Result deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            internId: { type: 'number', example: 14 },
                            courseId: { type: 'number', example: 11 },
                            masteryResult: { type: 'string', example: 'Try again' },
                            englishLevel: { type: 'string', example: 'Amazing' },
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try to delete not existing Course Result record',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Course Result with id ${id} doesn`t exist'
                            }
                        }
                    }
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
                                example: 'Internal server error',
                            },
                        },
                    },
                },
            },
        }
    },
};
const getListOfCourseResults = {
    tags: ['Course Results'],
    operationId: 'getListOfCourseResults',
    responses: {
        '200': {
            description: 'Successful Retrieve list of Course Results',
            content: {
                'application/json': {
                    example: [
                        {
                            id: { type: 'number', example: 42 },
                            internId: { type: 'number', example: 14 },
                            courseId: { type: 'number', example: 14 },
                            masteryResult: { type: 'string', example: 'Try again' },
                            englishLevel: { type: 'string', example: 'Amazing' },
                        },
                        {
                            id: { type: 'number', example: 42 },
                            internId: { type: 'number', example: 14 },
                            courseId: { type: 'number', example: 12 },
                            masteryResult: { type: 'string', example: 'Try again' },
                            englishLevel: { type: 'string', example: 'Not bad' },
                        }
                    ]
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
                                example: 'Internal server error',
                            },
                        },
                    },
                },
            },
        }
    },
};
const routes = {
    '/api/course-results': {
        get: getListOfCourseResults,
        post: createCourseResults,
    },
    '/api/course-results/:id': {
        get: getCourseResultById,
        put: updateCourseResultById,
        delete: deleteCourseResultById
    }
};
exports.default = routes;