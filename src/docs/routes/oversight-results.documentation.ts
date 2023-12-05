import { createOversightResultScheme, updateOversightResultScheme } from "@request-schemas/oversight-results.schema";
import j2s from 'joi-to-swagger';


const createOversightResults = {
    tags: ['Oversight Results'],
    operationId: 'createOversightResults',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(createOversightResultScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Oversight Results created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: "number", example: 1 },
                            attendance: { type: "boolean", example: true },
                            techCheck: { type: "string", example: "good" },
                            english: { type: "string", example: "middle" },
                            isEncouraging: { type: "boolean", example: false },
                            isOpenAsked: { type: "boolean", example: true },
                            naturalCommunications: { type: "string", example: "good" },
                            isPrepared: { type: "boolean", example: true },
                            isCheckedUnderstanding: { type: "boolean", example: true },
                            isFacilitatorBrief: { type: "boolean", example: false },
                            publicSpeakingSkills: { type: "string", example: "cool" },
                            isPunctual: { type: "boolean", example: true },
                            isOnTimeAttendanceFeedback: { type: "boolean", example: false },
                            isOptimalScreenPresentation: { type: "boolean", example: true },
                            internId: { type: "number", example: 1 },
                            classEventId: { type: "number", example: 1 }
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

const getListOfOversightResults = {
    tags: ['Oversight Results'],
    operationId: 'getListOfOversightResults',
    responses: {
        '200': {
            description: 'Successful Retrieve list of oversight results',
            content: {
                'application/json': {
                    example: [
                        {
                            id: 1,
                            attendance: true,
                            techCheck: 'techcheck result',
                            english: "english level",
                            isEncouraging: true,
                            isOpenAsked: true,
                            naturalCommunications: "good",
                            isPrepared: false,
                            isCheckedUnderstanding: true,
                            isFacilitatorBrief: false,
                            publicSpeakingSkills: "cool",
                            isPunctual: true,
                            isOnTimeAttendanceFeedback: false,
                            isOptimalScreenPresentation: true,
                            internId: 1,
                            classEventId: 2
                        },
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

const getOversightResultById = {
    tags: ['Oversight Results'],
    operationId: 'getOversightResultById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Oversight Result id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Oversight Result retrived successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: "number", example: 1 },
                            attendance: { type: "boolean", example: true },
                            techCheck: { type: "string", example: "good" },
                            english: { type: "string", example: "middle" },
                            isEncouraging: { type: "boolean", example: false },
                            isOpenAsked: { type: "boolean", example: true },
                            naturalCommunications: { type: "string", example: "good" },
                            isPrepared: { type: "boolean", example: true },
                            isCheckedUnderstanding: { type: "boolean", example: true },
                            isFacilitatorBrief: { type: "boolean", example: false },
                            publicSpeakingSkills: { type: "string", example: "cool" },
                            isPunctual: { type: "boolean", example: true },
                            isOnTimeAttendanceFeedback: { type: "boolean", example: false },
                            isOptimalScreenPresentation: { type: "boolean", example: true },
                            internId: { type: "number", example: 1 },
                            classEventId: { type: "number", example: 1 }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access oversight result with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Oversight Result with id 34 doesn`t exist'
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

const updateOversightResultById = {
    tags: ['Oversight Results'],
    operationId: 'updateOversightResultById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Oversight Result id',
            required: true,
            type: 'number',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(updateOversightResultScheme).swagger,
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
                            id: { type: "number", example: 1 },
                            attendance: { type: "boolean", example: true },
                            techCheck: { type: "string", example: "good" },
                            english: { type: "string", example: "middle" },
                            isEncouraging: { type: "boolean", example: false },
                            isOpenAsked: { type: "boolean", example: true },
                            naturalCommunications: { type: "string", example: "good" },
                            isPrepared: { type: "boolean", example: true },
                            isCheckedUnderstanding: { type: "boolean", example: true },
                            isFacilitatorBrief: { type: "boolean", example: false },
                            publicSpeakingSkills: { type: "string", example: "cool" },
                            isPunctual: { type: "boolean", example: true },
                            isOnTimeAttendanceFeedback: { type: "boolean", example: false },
                            isOptimalScreenPresentation: { type: "boolean", example: true },
                            internId: { type: "number", example: 1 },
                            classEventId: { type: "number", example: 1 }
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
                                example: 'Oversight Result with your id doesn`t exist'
                            }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access Oversight Result with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Oversight Result with id 34 doesn`t exist'
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

const deleteOversightResultById = {
    tags: ['Oversight Results'],
    operationId: 'deleteOversightResultById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Oversight Result id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Oversight Result deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: "number", example: 1 },
                            attendance: { type: "boolean", example: true },
                            techCheck: { type: "string", example: "good" },
                            english: { type: "string", example: "middle" },
                            isEncouraging: { type: "boolean", example: false },
                            isOpenAsked: { type: "boolean", example: true },
                            naturalCommunications: { type: "string", example: "good" },
                            isPrepared: { type: "boolean", example: true },
                            isCheckedUnderstanding: { type: "boolean", example: true },
                            isFacilitatorBrief: { type: "boolean", example: false },
                            publicSpeakingSkills: { type: "string", example: "cool" },
                            isPunctual: { type: "boolean", example: true },
                            isOnTimeAttendanceFeedback: { type: "boolean", example: false },
                            isOptimalScreenPresentation: { type: "boolean", example: true },
                            internId: { type: "number", example: 1 },
                            classEventId: { type: "number", example: 1 }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try to delete not existing Oversight Result',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Oversight Result with id 34 doesn`t exist'
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
    '/api/oversight-results': {
        post: createOversightResults,
        get: getListOfOversightResults
    },
    '/api/oversight-results/:id': {
        get: getOversightResultById,
        put: updateOversightResultById,
        delete: deleteOversightResultById
    }
};

export default routes;