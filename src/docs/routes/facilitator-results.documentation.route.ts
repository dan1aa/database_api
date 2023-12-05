import { createFacilitatorResultScheme, updateFacilitatorResultScheme } from "@request-schemas/facilitator-results.request-schema";
import j2s from 'joi-to-swagger';


const createFacilitatorResults = {
    tags: ['Facilitator Results'],
    operationId: 'createFacilitatorResults',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(createFacilitatorResultScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Facilitator Results created successfully!',
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

const getListOfFacilitatorResults = {
    tags: ['Facilitator Results'],
    operationId: 'getListOfFacilitatorResults',
    responses: {
        '200': {
            description: 'Successful Retrieve list of facilitator results',
            content: {
                'application/json': {
                    example: [
                        {
                            id: 1,
                            attendance: true,
                            techCheck: 'techcheck result',
                            participationActivity: "active" ,
                            internId: 1,
                            classEventId: 1
                        },
                        {
                            id: 2,
                            attendance: false,
                            techCheck: 'techcheck result',
                            participationActivity: "active" ,
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

const getFacilitatorResultById = {
    tags: ['Facilitator Results'],
    operationId: 'getFacilitatorResultById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Facilitator Result id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Facilitator Result retrived successfully!',
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
            description: 'You try access facilitator result with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Facilitator Result with id 34 doesn`t exist'
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

const updateFacilitatorResultById = {
    tags: ['Facilitator Results'],
    operationId: 'updateFacilitatorResultById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Facilitator Result id',
            required: true,
            type: 'number',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(updateFacilitatorResultScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Facilitator Result updated successfully!',
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
                                example: 'Facilitator Result with your id doesn`t exist'
                            }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access Facilitator Result with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Facilitator Result with id 34 doesn`t exist'
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

const deleteFacilitatorResultById = {
    tags: ['Facilitator Results'],
    operationId: 'deleteFacilitatorResultById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Facilitator Result id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Facilitator Result deleted successfully!',
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
            description: 'You try to delete not existing Facilitator Result',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Facilitator Result with id 34 doesn`t exist'
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
    '/api/facilitator-results': {
        post: createFacilitatorResults,
        get: getListOfFacilitatorResults
    },
    '/api/facilitator-results/:id': {
        get: getFacilitatorResultById,
        put: updateFacilitatorResultById,
        delete: deleteFacilitatorResultById
    }
};

export default routes;