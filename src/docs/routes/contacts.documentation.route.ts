import j2s from 'joi-to-swagger';
import { createContactScheme, updateContactScheme, createContactArraySchema } from '@request-schemas/contact.request-shema';

const createContact = {
    tags: ['Contacts'],
    operationId: 'createContact',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(createContactScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Contact created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            firstName: { type: 'string', example: 'John' },
                            lastName: { type: 'string', example: 'Doe' },
                            email: { type: 'string', example: 'johndoe@example.com' },
                            age: { type: 'number', example: 25 },
                            country: { type: 'string', example: 'United States' },
                            timezone: { type: 'string', example: 'GMT-05:00' },
                            sourceOfReferral: { type: 'string', example: 'Social Media' },
                            eduQuestSelectedDateTime: { type: 'date-time', example: '2023-10-03T14:30:00Z' },
                            eduQuestDecision: { type: 'string', example: 'Accepted' }
                        }
                    }
                },
            },
        },
        '400': {
            description: 'You try to create existing contact with unique field',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Contact with email someMail@gmail.com already exist'
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

const getContactById = {
    tags: ['Contacts'],
    operationId: 'getContectById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Contact id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Contact retrived successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            firstName: { type: 'string', example: 'John' },
                            lastName: { type: 'string', example: 'Doe' },
                            email: { type: 'string', example: 'johndoe@example.com' },
                            age: { type: 'number', example: 25 },
                            country: { type: 'string', example: 'United States' },
                            timezone: { type: 'string', example: 'GMT-05:00' },
                            sourceOfReferral: { type: 'string', example: 'Social Media' },
                            eduQuestSelectedDateTime: { type: 'date-time', example: '2023-10-03T14:30:00Z' },
                            eduQuestDecision: { type: 'string', example: 'Accepted' }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access contact with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Contact with id 34 dosen`t exist'
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

const updateContactById = {
    tags: ['Contacts'],
    operationId: 'updateContactById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Contact id',
            required: true,
            type: 'number',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(updateContactScheme).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Contact updated successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            firstName: { type: 'string', example: 'John' },
                            lastName: { type: 'string', example: 'Doe' },
                            email: { type: 'string', example: 'johndoe@example.com' },
                            age: { type: 'number', example: 25 },
                            country: { type: 'string', example: 'United States' },
                            timezone: { type: 'string', example: 'GMT-05:00' },
                            sourceOfReferral: { type: 'string', example: 'Social Media' },
                            eduQuestSelectedDateTime: { type: 'date-time', example: '2023-10-03T14:30:00Z' },
                            eduQuestDecision: { type: 'string', example: 'Accepted' }
                        }
                    }
                },
            },
        },
        '400': {
            description: 'You try to update unique field that already exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Contact with email someMail@gmail.com already exist'
                            }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try access contact with not existing id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Contact with id 34 dosen`t exist'
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

const deleteContactById = {
    tags: ['Contacts'],
    operationId: 'deleteContactById',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Contact id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Contact deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            firstName: { type: 'string', example: 'John' },
                            lastName: { type: 'string', example: 'Doe' },
                            email: { type: 'string', example: 'johndoe@example.com' },
                            age: { type: 'number', example: 25 },
                            country: { type: 'string', example: 'United States' },
                            timezone: { type: 'string', example: 'GMT-05:00' },
                            sourceOfReferral: { type: 'string', example: 'Social Media' },
                            eduQuestSelectedDateTime: { type: 'date-time', example: '2023-10-03T14:30:00Z' },
                            eduQuestDecision: { type: 'string', example: 'Accepted' }
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try to delete not existing contact',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Contact with id 34 dosen`t exist'
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

const getListOfContacts = {
    tags: ['Contacts'],
    operationId: 'getListOfContacts',
    responses: {
        '200': {
            description: 'Successful Retrieve list of contacts',
            content: {
                'application/json': {
                    example: [
                        {
                            id: 1,
                            firstName: 'Alice',
                            lastName: 'Johnson',
                            email: 'alice@example.com',
                            age: 30,
                            country: 'Canada',
                            timezone: 'GMT-04:00',
                            sourceOfReferral: 'Website',
                            eduQuestSelectedDateTime: '2023-10-03T15:45:00Z',
                            eduQuestDecision: 'Pending',
                        },
                        {
                            id: 2,
                            firstName: 'Bob',
                            lastName: 'Smith',
                            email: 'bob@example.com',
                            age: 28,
                            country: 'United Kingdom',
                            timezone: 'GMT+00:00',
                            sourceOfReferral: 'Email',
                            eduQuestSelectedDateTime: '2023-10-03T14:15:00Z',
                            eduQuestDecision: 'Rejected',
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

const bulkingCreation = {
    tags: ['Contacts'],
    operationId: 'bulkingCreation',
    description: 'If you want create a lot of contact by one query use this endpoint',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(createContactArraySchema).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulking creation of contacts',
            content: {
                'application/json': {
                    example: {
                        createdContactsCount: 2,
                        errors: [{msg: `Contact with email testMail2 already exist`}],
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
    '/api/contacts': {
        get: getListOfContacts,
        post: createContact
    },
    '/api/contacts/:id': {
        get: getContactById,
        put: updateContactById,
        delete: deleteContactById,
    },
    '/contacts/bulking-creation': {
        post: bulkingCreation
    }
};

export default routes;