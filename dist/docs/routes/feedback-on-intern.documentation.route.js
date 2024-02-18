"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_on_intern_request_schema_1 = require("@request-schemas/feedback-on-intern.request-schema");
const joi_to_swagger_1 = __importDefault(require("joi-to-swagger"));
const createFeedbacksOnIntern = {
    tags: ['Feedback on Intern'],
    operationId: 'createFeedbacksOnIntern',
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(feedback_on_intern_request_schema_1.createFeedbacksOnInternScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Feedbacks on Intern created and updated successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            attendance: { type: 'boolean', example: true },
                            techCheck: { type: 'string', example: 'techcheck result' },
                            participationActivity: { type: 'string', example: "active" },
                            internId: { type: 'number', example: 1 },
                            classEventId: { type: 'number', example: 1 }
                        }
                    }
                },
            },
        },
        '400': {
            description: 'You`re trying to create feedback on intern with not existing ids (senderId, internId, courseId & meetNumber)',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Feedback on intern with these ids were not added: (senderId: wrongSenderId, internId: wrongInternId, courseId: wrongCourseId, meetNumber: wrongMeetNuber)',
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
                                example: 'Internal server error',
                            },
                        },
                    },
                },
            },
        }
    },
};
const getListOfFeedbacksOnIntern = {
    tags: ['Feedback on Intern'],
    operationId: 'getListOfFeedbacksOnIntern',
    responses: {
        '200': {
            description: 'Successful Retrieve list of Feedbacks on Intern',
            content: {
                'application/json': {
                    example: [
                        {
                            id: 1,
                            attendance: true,
                            techCheck: 'techcheck result',
                            participationActivity: "active",
                            internId: 1,
                            classEventId: 1
                        },
                        {
                            id: 2,
                            attendance: false,
                            techCheck: 'techcheck result',
                            participationActivity: "active",
                            internId: 2,
                            classEventId: 2
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
const getFeedbackOnInternById = {
    tags: ['Feedback on Intern'],
    operationId: 'getFeedbackOnInternById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Feedback on Intern id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Feedback on Intern retrived successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            attendance: { type: 'boolean', example: true },
                            techCheck: { type: 'string', example: 'techcheck result' },
                            participationActivity: { type: 'string', example: "active" },
                            internId: { type: 'number', example: 1 },
                            classEventId: { type: 'number', example: 1 }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access Feedback on Intern with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Feedback on Intern with id 34 doesn`t exist'
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
const updateFeedbackOnInternById = {
    tags: ['Feedback on Intern'],
    operationId: 'updateFeedbackOnInternById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Feedback on Intern id',
            required: true,
            type: 'number',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(feedback_on_intern_request_schema_1.updateFeedbackOnInternScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Feedback on Intern updated successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            attendance: { type: 'boolean', example: true },
                            techCheck: { type: 'string', example: 'techcheck result' },
                            participationActivity: { type: 'string', example: "active" },
                            internId: { type: 'number', example: 1 },
                            classEventId: { type: 'number', example: 1 }
                        }
                    }
                },
            },
        },
        '400': {
            description: 'You try to update unique field that isn`t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Feedback on Intern with your id doesn`t exist'
                            }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access Feedback on Intern with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Feedback on Intern with id 34 doesn`t exist'
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
const deleteFeedbackOnInternById = {
    tags: ['Feedback on Intern'],
    operationId: 'deleteFeedbackOnInternById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Feedback on Intern id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Feedback on Intern deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            attendance: { type: 'boolean', example: true },
                            techCheck: { type: 'string', example: 'techcheck result' },
                            participationActivity: { type: 'string', example: "active" },
                            internId: { type: 'number', example: 1 },
                            classEventId: { type: 'number', example: 1 }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try to delete not existing Feedback on Intern',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Feedback on Intern with id 34 doesn`t exist'
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
const routes = {
    '/api/feedbacks-on-intern': {
        post: createFeedbacksOnIntern,
        get: getListOfFeedbacksOnIntern
    },
    '/api/feedbacks-on-intern/:id': {
        get: getFeedbackOnInternById,
        put: updateFeedbackOnInternById,
        delete: deleteFeedbackOnInternById
    }
};
exports.default = routes;
