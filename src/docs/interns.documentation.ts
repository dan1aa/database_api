import { swaggerCreateInternScheme, swaggerUpdateInternScheme } from './schemas/intern.schema';

import { InternalServerError } from './errors.documentation'

const createIntern = {
    tags: ['Interns'],
    summary: 'Create a new intern in the system',
    description: 'Create a new intern in the system',
    operationId: 'createIntern',
    requestBody: {
        content: {
            'application/json': {
                schema: swaggerCreateInternScheme,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Intern created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                example: 2
                            },
                            // ...createInternSchema.properties
                        }
                    }
                },
            },
        },
        ...InternalServerError
    },
};

const deleteIntern = {
    tags: ['Interns'],
    summary: 'Delete intern by ID',
    description: 'Delete intern by ID',
    operationId: 'deleteInternById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Intern ID',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Intern deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Intern deleted successfully!',
                            },
                        },
                    },
                },
            },
        },
        ...InternalServerError
    },
};

const getInternById = {
    tags: ['Interns'],
    summary: 'Get intern by ID',
    description: 'Get intern by ID',
    operationId: 'getInternById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Intern ID',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Get intern by ID from db',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                example: 2
                            },
                            // ...createInternSchema.properties
                        }
                    }
                },
            },
        },
        ...InternalServerError
    },
};

const getInternsList = {
    tags: ['Interns'],
    summary: 'Get interns list',
    description: 'Get interns list',
    operationId: 'getInternsList',
    parameters: [
        {
            name: 'cohort',
            in: 'path',
            description: 'Сipher of the cohort by which filtering should occur',
            type: 'string',
        },
        {
            name: 'course_id',
            in: 'path',
            description: 'Name of the course by which filtering should occur',
            required: false,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Get list of interns from db',
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
                                // ...createInternSchema.properties
                            }
                        }
                    },
                },
            },
        },
        ...InternalServerError
    },
};

const updateInternById = {
    tags: ['Interns'],
    summary: 'Update intern data by ID',
    description: 'Update intern by ID',
    operationId: 'updateInternById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Intern ID',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Intern updated successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Intern updated successfully!',
                            },
                        },
                    },
                },
            },
        },
        ...InternalServerError
    },
};



export { createIntern, deleteIntern, updateInternById, getInternById, getInternsList };