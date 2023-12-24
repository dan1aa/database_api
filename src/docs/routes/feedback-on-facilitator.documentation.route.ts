import { createFeedbackOnFacilitatorScheme, updateFeedbackOnFacilitatorScheme } from "@request-schemas/feedback-on-facilitator.request-schema";
import j2s from 'joi-to-swagger';

const createFeedbackOnFacilitator = {
    tags: ['Feedback on Facilitator'],
    operationId: 'createFeedbackOnFacilitator',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(createFeedbackOnFacilitatorScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Feedback on Facilitator created successfully!',
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

const getListOfFeedbacksOnFacilitator = {
    tags: ['Feedback on Facilitator'],
    operationId: 'getListOfFeedbacksOnFacilitator',
    responses: {
        '200': {
            description: 'Successful Retrieve list of feedbacks on facilitator',
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

const getFeedbackOnFacilitatorById = {
    tags: ['Feedback on Facilitator'],
    operationId: 'getFeedbackOnFacilitatorById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Feedback on Facilitator id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Feedback on Facilitator retrived successfully!',
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
            description: 'You try access feedback on facilitator with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Feedback on Facilitator with id 34 doesn`t exist'
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

const updateFeedbackOnFacilitatorById = {
    tags: ['Feedback on Facilitator'],
    operationId: 'updateFeedbackOnFacilitatorById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Feedback on Facilitator id',
            required: true,
            type: 'number',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(updateFeedbackOnFacilitatorScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Feedback on Facilitator updated successfully!',
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
                                example: 'Feedback on Facilitator with your id doesn`t exist'
                            }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access Feedback on Facilitator with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Feedback on Facilitator with id 34 doesn`t exist'
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

const deleteFeedbackOnFacilitatorById = {
    tags: ['Feedback on Facilitator'],
    operationId: 'deleteFeedbackOnFacilitatorById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Feedback on Facilitator Result id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Feedback on Facilitator deleted successfully!',
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
            description: 'You try to delete not existing Feedback on Facilitator',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Feedback on Facilitator with id 34 doesn`t exist'
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
    '/api/feedbacks-on-facilitator': {
        post: createFeedbackOnFacilitator,
        get: getListOfFeedbacksOnFacilitator
    },
    '/api/feedbacks-on-facilitator/:id': {
        get: getFeedbackOnFacilitatorById,
        put: updateFeedbackOnFacilitatorById,
        delete: deleteFeedbackOnFacilitatorById
    }
};

export default routes;