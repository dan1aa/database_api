export const InternalServerError = {
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
    } 
}