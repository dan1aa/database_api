import j2s from 'joi-to-swagger';
import { createClassEventsScheme, updateClassEventScheme } from '@request-schemas/class-event.request-shema';
import { createEventInternBadgesSheme } from '@request-schemas/event-intern-badges.request-shema';

const createClassEvents = {
    tags: ['Class Events'],
    operationId: 'createClassEvent',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(createClassEventsScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Class Events created and updatded successfully! This message is a test for github webhooks!!!!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            meetNumber: { type: 'number', example: 1 },
                            eventDate: { type: 'string', example: "2023-11-12" },
                            googleMeetLink: { type: 'string', example: "https://meet.google.com/xxx-xxxx-xxx" },
                            courseId: { type: 'number', example: 1 },
                            classEventTypeId: { type: 'number', example: 1 }
                        }
                    }
                },
            },
        },
        '400': {
            description: 'You try to create existing class event with unique field',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Class Event with your unique field(s) already exists'
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

const getClassEventById = {
    tags: ['Class Events'],
    operationId: 'getClassEventById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Class Event id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Class Event retrived successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            meetNumber: { type: 'number', example: 1 },
                            eventDate: { type: 'string', example: "2023-11-12" },
                            googleMeetLink: { type: 'string', example: "https://meet.google.com/xxx-xxxx-xxx" },
                            courseId: { type: 'number', example: 1 },
                            classEventTypeId: { type: 'number', example: 1 }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access class event with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Class event with id 34 doesn`t exist'
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

const updateClassEventById = {
    tags: ['Class Events'],
    operationId: 'updateClassEventById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Class Event id',
            required: true,
            type: 'number',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(updateClassEventScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Class Event updated successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            meetNumber: { type: 'number', example: 1 },
                            eventDate: { type: 'string', example: "2023-11-12" },
                            googleMeetLink: { type: 'string', example: "https://meet.google.com/xxx-xxxx-xxx" },
                            courseId: { type: 'number', example: 1 },
                            classEventTypeId: { type: 'number', example: 1 }
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
                                example: 'Class Event with your id doesn`t exist'
                            }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access class event with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Class Event with id 34 doesn`t exist'
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

const deleteClassEventById = {
    tags: ['Class Events'],
    operationId: 'deleteClassEventById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Class Event id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Class Event deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            meetNumber: { type: 'number', example: 1 },
                            eventDate: { type: 'string', example: "2023-11-12" },
                            googleMeetLink: { type: 'string', example: "https://meet.google.com/xxx-xxxx-xxx" },
                            courseId: { type: 'number', example: 1 },
                            classEventTypeId: { type: 'number', example: 1 }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try to delete not existing class event',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Class Event with id 34 does not exist'
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

const getListOfClassEvents = {
    tags: ['Class Events'],
    operationId: 'getListOfClassEvents',
    responses: {
        '200': {
            description: 'Successful Retrieve list of Class Events',
            content: {
                'application/json': {
                    example: [
                        {
                            id: 1,
                            meetNumber: 1,
                            eventDate: "2023-11-12",
                            googleMeetLink: "https://meet.google.com/xxx-xxxx-xxx",
                            courseId: 1,
                            classEventTypeId: 1
                        },
                        {
                            id: 2,
                            meetNumber: 2,
                            eventDate: "2023-10-12",
                            googleMeetLink: "https://meet.google.com/xxx-xxxx-xxx",
                            courseId: 2,
                            classEventTypeId: 2
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

const getClassEventByLinkCode = {
    tags: ['Class Events'],
    operationId: 'getClassEventByLinkCode',
    parameters: [
        {
            name: 'code',
            in: 'path',
            description: 'Class Event Google meet code',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Class Event retrived successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            meetNumber: { type: 'number', example: 1 },
                            eventDate: { type: 'string', example: "2023-11-12" },
                            googleMeetLink: { type: 'string', example: "https://meet.google.com/xxx-xxxx-xxx" },
                            courseId: { type: 'number', example: 1 },
                            classEventTypeId: { type: 'number', example: 1 }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access class event with not existing google meet code',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Class event with google meet code xxx-xxxx-xxx doesn`t exist'
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

const createEventInternBadges = {
    tags: ['Class Events'],
    operationId: 'createEventInternBadges',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(createEventInternBadgesSheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'EventInternBadges created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            classEventId: { type: 'number', example: 2 },
                            internId: { type: 'number', example: 3 },
                            badgeId: { type: 'number', example: 4 },
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
    '/api/class-events': {
        get: getListOfClassEvents,
        post: createClassEvents
    },
    '/api/class-events/{{id}}': {
        get: getClassEventById,
        put: updateClassEventById,
        delete: deleteClassEventById
    },
    '/api/class-events/link/:code': {
        get: getClassEventByLinkCode
    },
    '/api/event-intern-badges': {
        post: createEventInternBadges
    }
};

export default routes;