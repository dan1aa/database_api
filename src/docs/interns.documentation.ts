const createInternBody = {
    type: 'object',
    properties: {
        first_name: {
            type: 'string',
            example: 'John',
        },
        last_name: {
            type: 'string',
            example: 'Snow',
        },
        email: {
            type: 'string',
            example: 'john.snow@email.com',
        },
        cohort: {
            type: 'string',
            example: 'SEP 16 WE 23',
        },
        explorer_id: {
            type: 'string',
            example: 'explorerE8Jr5',
        },
        discord_id: {
            type: 'string',
            example: '605636683f6e29c81c8b2db0',
        },
    },
};

const createInternScheme = {
    properties: {
        first_name: {
            type: 'string',
        },
        last_name: {
            type: 'string',
        },
        email: {
            type: 'string',
            format: 'email',
        },
        cohort: {
            type: 'string',
            description: 'Short date annotation when intern was selected',
        },
        explorer_id: {
            type: 'string',
            description: 'Credetials of intern in teacheble platform',
        },
        discord_id: {
            type: 'string',
        },
    },
    required: ['first_name', 'last_name', 'email', 'cohort', 'explorer_id'],
}

const createIntern = {
    tags: ['Interns'],
    description: 'Create a new intern in the system',
    operationId: 'createIntern',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    ...createInternScheme
                },
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
                                type: 'string',
                                example: '256',
                            },
                            first_name: {
                                type: 'string',
                                example: 'John',
                            },
                            last_name: {
                                type: 'string',
                                example: 'Snow',
                            },
                            email: {
                                type: 'string',
                                example: 'john.snow@email.com',
                            },
                            cohort: {
                                type: 'string',
                                example: 'SEP 16 WE 23',
                            },
                            explorer_id: {
                                type: 'string',
                                example: 'explorerE8Jr5',
                            },
                            discord_id: {
                                type: 'string',
                                example: '605636683f6e29c81c8b2db0',
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

const deleteIntern = {
    tags: ['Interns'],
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

const getInternById = {
    tags: ['Interns'],
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

const getInternsList = {
    tags: ['Interns'],
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
            description: 'Intern deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                first_name: {
                                    type: 'string',
                                    example: 'John',
                                },
                                last_name: {
                                    type: 'string',
                                    example: 'Snow',
                                },
                                email: {
                                    type: 'string',
                                    example: 'john.snow@email.com',
                                },
                                cohort: {
                                    type: 'string',
                                    example: 'SEP 16 WE 23',
                                },
                                explorer_id: {
                                    type: 'string',
                                    example: 'explorerE8Jr5',
                                },
                                discord_id: {
                                    type: 'string',
                                    example: '605636683f6e29c81c8b2db0',
                                },
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

const updateInternById = {
    summary: 'Update intern data by ID',
    tags: ['Interns'],
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
            description: 'Intern deleted successfully!',
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



export { createIntern, deleteIntern, updateInternById, getInternById, getInternsList, createInternBody };