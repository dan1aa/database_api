import j2s from 'joi-to-swagger';
import { createEventFeedbacksSheme, updateEventFeedbackSheme } from '@request-schemas/event-feedback.request-shema';

const createEventFeedbacks = {
    tags: ['Event Feedbacks'],
    operationId: 'createEventFeedbacks',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(createEventFeedbacksSheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Event Feedbacks created and updated successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            classEventId: { type: 'number', example: 2 },
                            feedback: { type: 'string', example: "test feedback" }
                        }
                    }
                },
            },
        },
        '400': {
            description: 'Course with your course id not found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Event Feedback cannot be created with invalid course id'
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

const getEventFeedbackById = {
    tags: ['Event Feedbacks'],
    operationId: 'getEventFeedbackById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Event Feedback id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Event Feedback retrived successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            classEventId: { type: 'number', example: 2 },
                            feedback: { type: 'string', example: "test feedback" }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access Event Feedback with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Event Feedback with id 34 doesn`t exist'
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

const updateEventFeedbackById = {
    tags: ['Event Feedbacks'],
    operationId: 'updateEventFeedbackById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Event Feedback id',
            required: true,
            type: 'number',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(updateEventFeedbackSheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Event Feedback updated successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            classEventId: { type: 'number', example: 2 },
                            feedback: { type: 'string', example: "test feedback" }
                        }
                    }
                },
            },
        },
        '400': {
            description: 'You try to update unique field that does not exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Event Feedback with your id doesn`t exist'
                            }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access Event Feedback with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Event Feedback with id 34 doesn`t exist'
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

const deleteEventFeedbackById = {
    tags: ['Event Feedbacks'],
    operationId: 'deleteEventFeedbackById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Event Feedback id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Event Feedback deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            classEventId: { type: 'number', example: 2 },
                            feedback: { type: 'string', example: "test feedback" }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try to delete not existing Event Feedback',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Event Feedback with id 34 does not exist'
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

const getListOfEventFeedbacks = {
    tags: ['Event Feedbacks'],
    operationId: 'getListOfEventFeedbacks',
    responses: {
        '200': {
            description: 'Successful Retrieve list of Event Feedbacks',
            content: {
                'application/json': {
                    example: [
                        {
                            id: 1,
                            classEventId: 1,
                            feedback: "my feedback 1"
                        },
                        {
                            id: 2,
                            classEventId: 2,
                            feedback: "my feedback 2"
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
    '/api/event-feedbacks': {
        get: getListOfEventFeedbacks,
        post: createEventFeedbacks
    },
    '/api/class-events/:id': {
        get: getEventFeedbackById,
        put: updateEventFeedbackById,
        delete: deleteEventFeedbackById
    }
};

export default routes;